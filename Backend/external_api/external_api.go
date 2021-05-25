package external_api

import (
	"encoding/json"
	"fmt"
	"github.com/StalkR/imdb"
	"github.com/cyruzin/golang-tmdb"
	"github.com/dgrijalva/jwt-go"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"
	"pranav.com/db_tables"
	//"time"
)

var result db_tables.SearchResult

var details db_tables.SearchDetails

var length int

var jwt_key = []byte("secret")

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

func goDotEnvVariable(key string) string {

	// load .env file
	err := godotenv.Load("../.env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	return os.Getenv(key)
}

func SearchMovieOrShow(w http.ResponseWriter, r *http.Request) {
	//Setting header to content type will tell client to expect data in json format
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var query db_tables.Query
	json.NewDecoder(r.Body).Decode(&query)
	//fmt.Println(query)
	if len(query.Query) > 0 {
		answer := SearchQuery(query)
		//fmt.Println(answer)
		cookie, err := r.Cookie("token")
		if err != nil {
			if err == http.ErrNoCookie {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		tokenStr := cookie.Value
		claims := &Claims{}

		tkn, err := jwt.ParseWithClaims(tokenStr, claims, func(t *jwt.Token) (interface{}, error) {
			return jwt_key, nil
		})

		if err != nil {
			if err == jwt.ErrSignatureInvalid {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		if !tkn.Valid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
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
	//fmt.Println(id)
	if id.Tmdbid > 0 {
		cookie, err := r.Cookie("token")
		if err != nil {
			if err == http.ErrNoCookie {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		tokenStr := cookie.Value
		claims := &Claims{}

		tkn, err := jwt.ParseWithClaims(tokenStr, claims, func(t *jwt.Token) (interface{}, error) {
			return jwt_key, nil
		})

		if err != nil {
			if err == jwt.ErrSignatureInvalid {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		if !tkn.Valid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		answer := getPoster(id)
		//fmt.Println(answer)
		
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
	fmt.Println(det)
	if det.Tmdbid > 0 {
		cookie, err := r.Cookie("token")
		if err != nil {
			if err == http.ErrNoCookie {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		tokenStr := cookie.Value
		claims := &Claims{}

		tkn, err := jwt.ParseWithClaims(tokenStr, claims, func(t *jwt.Token) (interface{}, error) {
			return jwt_key, nil
		})

		if err != nil {
			if err == jwt.ErrSignatureInvalid {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		if !tkn.Valid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
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
	tmdb_key := goDotEnvVariable("TMDB_KEY")
	tmdbClient, err := tmdb.Init(tmdb_key)
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
			temp.Title = res[i].Title
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
	tmdb_key := goDotEnvVariable("TMDB_KEY")
	tmdbClient, err := tmdb.Init(tmdb_key)
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
	//link := "https://image.tmdb.org/t/p/w500"
	link := "https://www.themoviedb.org/t/p/w300_and_h450_bestv2"
	a := title.PosterPath
	//fmt.Println(tmdb.GetImageURL(movie.BackdropPath, tmdb.W500))
	//fmt.Println(link + a)
	// b:=link+a
	//a:=movie.Results[0].ReleaseDate
	//fmt.Println(a)
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
			temp2 = append(temp2, Movie_everyting.Directors[i].FullName)
		}
		DetailsPage.Directors = temp2

	}
	return DetailsPage
}

func getImdbId(i int) string {
	tmdb_key := goDotEnvVariable("TMDB_KEY")
	tmdbClient, err := tmdb.Init(tmdb_key)
	if err != nil {
		fmt.Println(err)
	}
	options := map[string]string{
		// "language": "dn",
		// "append_to_response": "credits,images",
		// //"external_api":"imdB",
	}
	title, _ := tmdbClient.GetMovieDetails(i, options)

	return title.IMDbID
}
