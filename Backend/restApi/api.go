package main

//nodemon in golang
//nodemon --exec go run . --ext go

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

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

	//"github.com/codegangsta/gin"
	//"github.com/cespare/reflex"
	"pranav.com/yt"
)

var cred db_tables.SignInData
var check db_tables.CheckExistance
var usrPass db_tables.CheckUsernameEmail
var ClientVar *mongo.Client




func main() {

	// Connecting with database
	ClientVar = db.DatabaseConnection()

	//collection_n := ClientVar.Database("popkorn_db").Collection("Recommended_Movies")


	//fmt.Println(cl)
	r := mux.NewRouter()

	//checking about the uniqueness of email and username
	r.HandleFunc("/api/checkUsernameAndEmail", userPassExistance).Methods("POST", "OPTIONS")

	//Handling signup with email route (SendUserData and InsertCollection functions)
	r.HandleFunc("/api/signup", insert_operations.SendUserData).Methods("POST", "OPTIONS")

	//Checking up signin page
	r.HandleFunc("/api/signin", signInResult).Methods("POST", "OPTIONS")

	//Taking genres and languages in db
	r.HandleFunc("/api/preferences", insert_operations.SavePreferences).Methods("POST", "OPTIONS")

	//Search a Movie/web-series query (using imdb api)
	r.HandleFunc("/api/search", external_api.SearchMovieOrShow).Methods("POST", "OPTIONS")

	//Send a poster Url
	r.HandleFunc("/api/getPoster", external_api.GetPosterUrl).Methods("POST", "OPTIONS")

	//Sending Movie SearchDetails
	r.HandleFunc("/api/details", external_api.SendDetails).Methods("POST", "OPTIONS")

	//Send Embedded Trailer embeddedLink
	r.HandleFunc("/api/trailer", yt.SendTrailer).Methods("POST", "OPTIONS")

	log.Fatal(http.ListenAndServe(":9000", r))


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

	json.NewDecoder(r.Body).Decode(&cred)

	if (db_tables.SignInData{}) == cred {
		fmt.Println("Reject")

	} else {
		var status bool = false
		status = signInValidation(cred)
		json.NewEncoder(w).Encode(status)
	}

}

func signInValidation(data db_tables.SignInData) bool {
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
	if (db_tables.NewUser{}) == result {
		statusSoFar = false
	} else {

		hash := []byte(result.Password)
		pword := []byte(data.Password)
		err_new := bcrypt.CompareHashAndPassword(hash, pword)
		if err_new != nil {
			statusSoFar = false
		} else {
			statusSoFar = true
		}
	}
	return statusSoFar

}
