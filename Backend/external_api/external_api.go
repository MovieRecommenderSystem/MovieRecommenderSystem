package external_api

import (
	"encoding/json"
	"github.com/StalkR/imdb"
	//"log"
	"fmt"
	"net/http"
	"pranav.com/db_tables"
)

//var result db_tables.SearchResult

var query db_tables.Query
var id db_tables.ImdbID
var details db_tables.SearchDetails

var length int

func SearchMovieOrShow(w http.ResponseWriter, r *http.Request) {
	//Setting header to content type will tell client to expect data in json format
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	json.NewDecoder(r.Body).Decode(&query)
	fmt.Println(query)
	if len(query.Query) > 0 {
		answer := SearchQuery()
		fmt.Println(answer)
		json.NewEncoder(w).Encode(answer)
	}

}

func GetPosterUrl(w http.ResponseWriter, r *http.Request) {
	//Setting header to content type will tell client to expect data in json format
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	json.NewDecoder(r.Body).Decode(&id)
	fmt.Println(id)
	if len(id.Imdbid) > 0 {
		answer := getPoster(id)
		fmt.Println(answer)
		json.NewEncoder(w).Encode(answer)
	}

}

func SearchQuery() db_tables.SearchResult {

	client := http.DefaultClient
	var result db_tables.SearchResult
	res, err := imdb.SearchTitle(client, query.Query)
	if err != nil {
		fmt.Errorf("Error while fetching details from Api")
	}
	length = len(res)
	for i := 0; i < 10; i++ {

		if i < length {
			var temp db_tables.SearchDetails
			temp.Imdb_id = res[i].ID
			temp.Title = res[i].Name
			temp.Year = res[i].Year
			// Movie_everyting,err:=imdb.NewTitle(client,res[i].ID)
			// if err!=nil{
			// 	fmt.Println("Error while fetcing movie details")
			// }
			// fmt.Println(Movie_everyting.Poster.URL)
			// everything,_:=imdb.NewMedia(client,res[i].ID)
			// fmt.Println(everything.ContentURL)

			// var genre_array []string
			// genre_array=append(genre_array,Movie_everyting.Genres[0],Movie_everyting.Genres[1],Movie_everyting.Genres[1])
			// temp.Genre=genre_array
			// temp.PosterURL=Movie_everyting.Poster.URL
			result.Results = append(result.Results, temp)
		}
	}
	return result
}

func getPoster(id db_tables.ImdbID) db_tables.Poster {

	client := http.DefaultClient
	var poster db_tables.Poster
	Movie_everyting, err := imdb.NewTitle(client, id.Imdbid)
	if err != nil {
		fmt.Println("Error while fetcing movie details")
	}else{
		poster.PosterUrl= Movie_everyting.Poster.ContentURL
	}
	return poster

}
