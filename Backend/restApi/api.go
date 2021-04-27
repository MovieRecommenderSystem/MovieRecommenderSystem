package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"net/http"
	db "pranav.com/db"
	//"go.mongodb.org/mongo-driver/mongo/options"
	//"go.mongodb.org/mongo-driver/mongo/readpref"
	"golang.org/x/crypto/bcrypt"
	//"net/smtp"
	"pranav.com/db_tables"
)

var user db_tables.NewUser

var cred db_tables.SignInData
var check db_tables.CheckExistance
var usrPass db_tables.CheckUsernameEmail
var ClientVar *mongo.Client

func main() {

	// Connecting with database
	ClientVar = db.DatabaseConnection()
	//fmt.Println(cl)
	r := mux.NewRouter()

	//checking about the uniqueness of email and username
	r.HandleFunc("/api/checkUsernameAndEmail", userPassExistance).Methods("POST", "OPTIONS")

	//Handling signup with email route
	r.HandleFunc("/api/signup", sendUserData).Methods("POST", "OPTIONS")

	r.HandleFunc("/api/signin", signInResult).Methods("POST", "OPTIONS")
	log.Fatal(http.ListenAndServe(":9000", r))

}

func sendUserData(w http.ResponseWriter, r *http.Request) {
	//Setting header to content type will tell client to expect data in json format
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	json.NewDecoder(r.Body).Decode(&user)

	//We have to not store empty structure in database,hence if the request sends
	//empty struct,reject it!!
	if (db_tables.NewUser{}) == user {
		fmt.Println("rejected empty user")
	} else {
		fmt.Println(user)
		// InsertionStatus := InsertCollection(user)
		// fmt.Println(InsertionStatus)
		// fmt.Println(cl)
		HashedPword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 13)
		if err != nil {
			fmt.Println("Error while hashing")
		} else {
			user.Password = string(HashedPword)

		}
		insertResult := InsertCollection(user)

		json.NewEncoder(w).Encode(insertResult)
	}

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

func InsertCollection(user db_tables.NewUser) bool {
	status := false
	//fmt.Println("In Insert collection")
	///api/checkUsernameAndEmail
	databases, err := ClientVar.ListDatabaseNames(context.TODO(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(databases)

	collection := ClientVar.Database("popkorn_db").Collection("SignUpEmail")

	insertResult, err := collection.InsertOne(context.TODO(), user)
	if err != nil {
		log.Fatal(err)
	} else {
		status = true
	}

	fmt.Println("Inserted one documents: ", insertResult.InsertedID)
	return status

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
