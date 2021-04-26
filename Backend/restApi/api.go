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
var ClientVar *mongo.Client

func main() {

	// Connecting with database
	ClientVar = db.DatabaseConnection()
	//fmt.Println(cl)
	r := mux.NewRouter()

	r.HandleFunc("/api/signup", sendUserData).Methods("POST", "OPTIONS")

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

func InsertCollection(user db_tables.NewUser) bool {
	status := false
	fmt.Println("In Insert collection")
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
