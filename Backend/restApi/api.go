package main

//nodemon in golang
//nodemon --exec go run . --ext go

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"path/filepath"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	db "pranav.com/db"

	//"go.mongodb.org/mongo-driver/mongo/options"
	//"go.mongodb.org/mongo-driver/mongo/readpref"
	"golang.org/x/crypto/bcrypt"
	//"net/smtp"
	"pranav.com/db_tables"
	"pranav.com/external_api"
	"pranav.com/insert_operations"

	//"strings"

	//"github.com/codegangsta/gin"
	//"github.com/cespare/reflex"
	"os"

	"pranav.com/recommend"
	"pranav.com/yt"

	//"pranav.com/jwt"
	"time"

	"github.com/dgrijalva/jwt-go"
	//"path"
)

var cred db_tables.SignInData
var check db_tables.CheckExistance
var usrPass db_tables.CheckUsernameEmail
var ClientVar *mongo.Client
var jwt_key = []byte("secret")

type spaHandler struct {
	staticPath string
	indexPath  string
}

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

func main() {

	// Connecting with database
	ClientVar = db.DatabaseConnection()
	port := os.Getenv("PORT")
	defaultPort := "9000"

	//collection_n := ClientVar.Database("popkorn_db").Collection("Recommended_Movies")

	//fmt.Println(cl)
	r := mux.NewRouter()

	//checking about the uniqueness of email and username
	r.HandleFunc("/api/checkUsernameAndEmail", userPassExistance).Methods("POST", "OPTIONS")

	//Handling signup with email route (SendUserData and InsertCollection functions)
	r.HandleFunc("/api/signup", insert_operations.SendUserData).Methods("POST", "OPTIONS")

	//Checking up signin page
	r.HandleFunc("/api/signin", signInResult).Methods("POST", "OPTIONS")

	//Taking genres and languages in db (should be secured)
	r.HandleFunc("/api/preferences", insert_operations.SavePreferences).Methods("POST", "OPTIONS")

	//Search a Movie/web-series query (using imdb api) (secured)
	r.HandleFunc("/api/search", external_api.SearchMovieOrShow).Methods("POST", "OPTIONS")

	//Send a poster Url (secured)
	r.HandleFunc("/api/getPoster", external_api.GetPosterUrl).Methods("POST", "OPTIONS")

	//Sending Movie SearchDetails (secured)
	r.HandleFunc("/api/details", external_api.SendDetails).Methods("POST", "OPTIONS")

	//Send Embedded Trailer embeddedLink (secured)
	r.HandleFunc("/api/trailer", yt.SendTrailer).Methods("POST", "OPTIONS")

	//Get Genres and Language for simple recommendations (secured)
	r.HandleFunc("/api/simpleRecommender", recommend.SimpleRecommender).Methods("POST", "OPTIONS")

	//Content Based Recommendations (secured)
	r.HandleFunc("/api/ContentRecommender", recommend.ContentRecommender).Methods("POST", "OPTIONS")

	//CheckKey

	

	//Setting logout Route
	r.HandleFunc("/api/logout", logout).Methods("GET", "OPTIONS")

	// r.PathPrefix("/").Handler(http.FileServer(http.Dir("../../Frontend/build/")))

	spa := spaHandler{staticPath: "../../Frontend/build/", indexPath: "index.html"}

	r.PathPrefix("/").Handler(spa)

	//r.HandleFunc("/",HandleRoutes).Methods("GET", "OPTIONS")

	if !(port == "") {
		log.Fatal(http.ListenAndServe(":"+port, r))
	} else {
		log.Fatal(http.ListenAndServe(":"+defaultPort, r))
	}

}
func (h spaHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// get the absolute path to prevent directory traversal
	path, err := filepath.Abs(r.URL.Path)
	if err != nil {
		// if we failed to get the absolute path respond with a 400 bad request
		// and stop
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// newPath:=""
	// if len(path)>=4{
	// newPath=path[0:4]
	// }
	// fmt.Println(newPath)

	// prepend the path with the path to the static directory
	path = filepath.Join(h.staticPath, path)
	//fmt.Println(path)

	// check whether a file exists at the given path
	_, err = os.Stat(path)
	if os.IsNotExist(err) {
		// file does not exist, serve index.html
		//fmt.Println("File does noy exists")
		http.ServeFile(w, r, filepath.Join(h.staticPath, h.indexPath))
		return
	} else if err != nil {
		// if we got an error (that wasn't that the file doesn't exist) stating the
		// file, return a 500 internal server error and stop
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// otherwise, use http.FileServer to serve the static dir
	http.FileServer(http.Dir(h.staticPath)).ServeHTTP(w, r)

}
func HandleRoutes(w http.ResponseWriter, r *http.Request) {
	// fmt.Println("alalal")
	// const FSPATH = "../../Frontend/build/"
	// fs := http.FileServer(http.Dir(FSPATH))
	// fmt.Println(r.URL.Path)
	// if r.URL.Path != "/" {
	// 	fmt.Println("lala")
	// 	fmt.Println(r.URL.Path)
	// 	fullPath := FSPATH + strings.TrimPrefix(path.Clean(r.URL.Path), "/")
	// 	_, err := os.Stat(fullPath)
	// 	if err != nil {
	// 		if !os.IsNotExist(err) {
	// 			panic(err)
	// 		}
	// 		// Requested file does not exist so we return the default (resolves to index.html)
	// 		r.URL.Path = "/"
	// 	}
	// }else{
	// 	fmt.Println("pranav!")
	// 	fmt.Println(r.URL.Path)
	// }
	// fs.ServeHTTP(w, r)
	// fmt.Println(r.URL.Path)
}

func userPassExistance(w http.ResponseWriter, r *http.Request) {

	//Setting header to content type will tell client to expect data in json format
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")


	json.NewDecoder(r.Body).Decode(&usrPass)

	//checkExistance(usrPass)
	if (db_tables.CheckUsernameEmail{}) != usrPass {
		fmt.Println("in if conditions!")
		fmt.Println(usrPass)
		checkExistance(usrPass)
		fmt.Println(check)
		json.NewEncoder(w).Encode(check)

	}

}

//checking whether an email and password are unique
func checkExistance(usrpass db_tables.CheckUsernameEmail) {

	//fmt.Println(usrpass)
	collection := ClientVar.Database("popkorn_db").Collection("SignUpEmail")

	filter := bson.D{{"email", usrpass.Email}}

	var result db_tables.NewUser

	//fmt.Println("lassan")
	err := collection.FindOne(context.TODO(), filter).Decode(&result)
	fmt.Println(err)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	if (db_tables.NewUser{}) == result {
		check.RegisteredEmail = false
		fmt.Println("user does not exists")

	} else {
		check.RegisteredEmail = true
		check.UniqueUsername = true
		return
	}
	fmt.Println("In next")
	if !check.RegisteredEmail {

		filter2 := bson.D{{"username", usrpass.Username}}
		var result_new db_tables.NewUser

		err := collection.FindOne(context.TODO(), filter2).Decode(&result_new)
		// if err != nil {
		// 	log.Fatal(err)
		// }
		fmt.Println(err)
		if (db_tables.NewUser{}) == result_new {
			check.UniqueUsername = true
		} else {
			check.UniqueUsername = false
		}

	}

}

func signInResult(w http.ResponseWriter, r *http.Request) {

	//Setting header to content type will tell client to expect data in json format
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Add("Access-Control-Allow-Headers", "x-access-token")


	json.NewDecoder(r.Body).Decode(&cred)

	if (db_tables.SignInData{}) == cred {
		fmt.Println("Reject")

	} else {
		answer := signInValidation(cred)
		if answer.Status {
			expiryTime := time.Now().Add(time.Hour * 5)

			claims := &Claims{
				Username: answer.Username,
				StandardClaims: jwt.StandardClaims{
					ExpiresAt: expiryTime.Unix(),
				},
			}

			// Generating jwt token on the basis of claims

			token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

			tokenString, err := token.SignedString(jwt_key)
			answer.Token = tokenString
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				return
			}

			//Set Cookies

			http.SetCookie(w, &http.Cookie{
				Name:    "token",
				Value:   tokenString,
				Expires: expiryTime,
			})
		}
		
		json.NewEncoder(w).Encode(answer)
	}

}

func signInValidation(data db_tables.SignInData) db_tables.AfterSignIn {
	fmt.Println(data)
	collection := ClientVar.Database("popkorn_db").Collection("SignUpEmail")

	filter := bson.D{{"email", data.Email}}

	var result db_tables.NewUser
	var statusSoFar bool

	err := collection.FindOne(context.TODO(), filter).Decode(&result)
	fmt.Println(err)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	var v db_tables.AfterSignIn
	if (db_tables.NewUser{}) == result {
		statusSoFar = false
	} else {

		hash := []byte(result.Password)
		pword := []byte(data.Password)
		err_new := bcrypt.CompareHashAndPassword(hash, pword)
		if err_new != nil {
			statusSoFar = false
			v.Status = statusSoFar
			v.Username = "NO_USER_EXISTS"
		} else {

			statusSoFar = true
			v.Status = statusSoFar
			v.Username = result.Username

		}
	}

	return v

}

func logout(w http.ResponseWriter,r *http.Request) {

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Headers", "x-access-token")
	// cookie, err := r.Cookie("token")
	// if err != nil {
	// 	w.WriteHeader(http.StatusBadRequest)
	// 	return
	// }

		//Delete cookies by setting expiry time to present time

		http.SetCookie(w, &http.Cookie{
			Name:    "token",
			Value:   "",
			Expires: time.Unix(0, 0),
		})



}
