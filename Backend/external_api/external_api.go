package external_api

import (
	"encoding/json"
	"github.com/StalkR/imdb"
	//"log"
	"fmt"
	"github.com/cyruzin/golang-tmdb"
	"net/http"
	"pranav.com/db_tables"
	"os"
)

var result db_tables.SearchResult

var details db_tables.SearchDetails

var length int

const developerKey = os.Getenv(key_api_yt)

func SearchMovieOrShow(w http.ResponseWriter, r *http.Request) {
	//Setting header to content type will tell client to expect data in json format
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var query db_tables.Query
	json.NewDecoder(r.Body).Decode(&query)
	fmt.Println(query)
	if len(query.Query) > 0 {
		answer := SearchQuery(query)
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
	var id db_tables.TmdbID
	json.NewDecoder(r.Body).Decode(&id)
	fmt.Println(id)
	if id.Tmdbid > 0 {
		answer := getPoster(id)
		fmt.Println(answer)
		json.NewEncoder(w).Encode(answer)
	}

}

func SendDetails(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var det db_tables.TmdbID
	json.NewDecoder(r.Body).Decode(&det)
	if det.Tmdbid > 0 {
		answer := getDetail(det)
		fmt.Println(answer)
		json.NewEncoder(w).Encode(answer)
	}

}

func SearchQuery(query db_tables.Query) db_tables.SearchResult {

	// client := http.DefaultClient
	// var result db_tables.SearchResult
	// res, err := imdb.SearchTitle(client, query.Query)
	// if err != nil {
	// 	fmt.Errorf("Error while fetching details from Api")
	// }
	var result db_tables.SearchResult
	tmdbClient, err := tmdb.Init(os.Getenv(key))
	if err != nil {
		fmt.Println(err)
	}
	options := map[string]string{
		//"language":           "dn",
		//"append_to_response": "credits,images",
		//"external_api":"imdB",
	}

	//"tt0848228"
	movie, _ := tmdbClient.GetSearchMovies(query.Query, options)
	//link:="https://image.tmdb.org/t/p/w500"
	res := movie.Results

	length = len(res)
	for i := 0; i < 10; i++ {

		if i < length {

			var temp db_tables.SearchDetails
			temp.Tmdb_id = movie.Results[i].ID
			temp.Title = res[i].OriginalTitle
			temp.Year = res[i].ReleaseDate
			result.Results = append(result.Results, temp)
		} else {
			break
		}
	}
	return result
}

func getPoster(id db_tables.TmdbID) db_tables.Poster {

	var poster db_tables.Poster
	tmdbClient, err := tmdb.Init(os.Getenv(key))
	if err != nil {
		fmt.Println(err)
	}
	options := map[string]string{
		// "language": "dn",
		// "append_to_response": "credits,images",
		// //"external_api":"imdB",
	}

	//"tt0848228"
	//movie,_:=tmdbClient.GetSearchMovies("avengers",options)

	//17965
	title, _ := tmdbClient.GetMovieDetails(id.Tmdbid, options)
	link := "https://image.tmdb.org/t/p/w500"
	a := title.BackdropPath
	//fmt.Println(tmdb.GetImageURL(movie.BackdropPath, tmdb.W500))
	fmt.Println(link + a)
	// b:=link+a
	//a:=movie.Results[0].ReleaseDate
	fmt.Println(a)
	poster.PosterUrl = link + a
	return poster

}

func getDetail(det db_tables.TmdbID) db_tables.DetailsPage {
	a := getImdbId(det.Tmdbid)
	var DetailsPage db_tables.DetailsPage
	client := http.DefaultClient
	Movie_everyting, err := imdb.NewTitle(client, a)
	if err != nil {
		fmt.Println("error in getDetails")

	} else {
		DetailsPage.Name = Movie_everyting.Name
		DetailsPage.ID = Movie_everyting.ID
		DetailsPage.Type = Movie_everyting.Type
		DetailsPage.Year = Movie_everyting.Year
		DetailsPage.Rating = Movie_everyting.Rating
		DetailsPage.Duration = Movie_everyting.Duration

		DetailsPage.Genres = Movie_everyting.Genres
		DetailsPage.Languages = Movie_everyting.Languages
		DetailsPage.Description = Movie_everyting.Description
		DetailsPage.Poster = Movie_everyting.Poster.ContentURL
		var temp []string
		for i := 0; i < len(Movie_everyting.Actors); i++ {
			temp = append(temp, Movie_everyting.Actors[i].FullName)
		}
		DetailsPage.Actors = temp
		var temp2 []string
		for i := 0; i < len(Movie_everyting.Directors); i++ {
			temp2 = append(temp2, Movie_everyting.Actors[i].FullName)
		}
		DetailsPage.Directors = temp2

	}
	return DetailsPage
}

func getImdbId(i int) string {
	tmdbClient, err := tmdb.Init(os.Getenv(key))  //API KEY
	if err != nil {
		fmt.Println(err)
	}
	options := map[string]string{
		// "language": "dn",
		// "append_to_response": "credits,images",
		// //"external_api":"imdB",
	}
	title,_:=tmdbClient.GetMovieDetails(i,options)

	return title.IMDbID
}
