package insert_operations

import(
	"net/http"
	"encoding/json"
	"pranav.com/db_tables"
	"fmt"
	"golang.org/x/crypto/bcrypt"
	db "pranav.com/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"context"
	"log"
	
)

var user db_tables.NewUser
var ClientVar *mongo.Client
var pref db_tables.Preferences

func SendUserData(w http.ResponseWriter, r *http.Request) {
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
	ClientVar=db.ClientVar
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


func SavePreferences(w http.ResponseWriter, r *http.Request) {

	//Setting header to content type will tell client to expect data in json format
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	json.NewDecoder(r.Body).Decode(&pref)

	//Logic for rejecting empty requests
	if len(pref.Username) == 0{
		fmt.Println("reject")
	}else{
	status_pref := storePreferences(pref)

	json.NewEncoder(w).Encode(status_pref)
	}

}

//Storing user preferences in database

func storePreferences(preferences db_tables.Preferences) bool {

	fmt.Println(preferences)
	collection := ClientVar.Database("popkorn_db").Collection("UserPreferences")

	status_pref := false

	insertResult, err := collection.InsertOne(context.TODO(), preferences)
	if err != nil {
		log.Fatal(err)
	} else {
		status_pref = true
	}

	fmt.Println("Inserted one documents for preferences: ", insertResult.InsertedID)
	return status_pref

}


