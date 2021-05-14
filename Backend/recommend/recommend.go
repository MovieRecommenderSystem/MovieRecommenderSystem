package recommend

import (
	"fmt"
	//"github.com/gorilla/mux"
	"bytes"
	"context"
	"encoding/json"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"net/http"
	db "pranav.com/db"
	"pranav.com/db_tables"
)

var ClientVar *mongo.Client

//var output db_tables.SimpleRecommender
func SimpleRecommender(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var usr db_tables.UsernameForRecommendation
	json.NewDecoder(r.Body).Decode(&usr)
	fmt.Println(usr.Username)
	ClientVar = db.ClientVar
	collection := ClientVar.Database("popkorn_db").Collection("UserPreferences")
	filter := bson.D{{"username", usr.Username}}

	var result db_tables.Preferences

	//fmt.Println("lassan")
	err := collection.FindOne(context.TODO(), filter).Decode(&result)
	fmt.Println(err)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	if len(result.Username) == 0 {
		fmt.Println("user does not exists")
		json.NewEncoder(w).Encode(-1)

	} else {
		//var output db_tables.SimpleRecommender
		output:=GetRecommendations(result)
		json.NewEncoder(w).Encode(output)
	}

}

func GetRecommendations(s db_tables.Preferences) db_tables.SimpleRecommender{

	values := map[string][]string{"GENRE": s.Genre, "LANG": s.Language}
	json_data, err := json.Marshal(values)

	if err != nil {
		log.Fatal(err)
	}

	var res db_tables.SimpleRecommender
	resp, err := http.Post("http://localhost:7000/apiRecommender/simple", "application/json",
		bytes.NewBuffer(json_data))

	if err != nil {
		log.Fatal(err)
	}
	json.NewDecoder(resp.Body).Decode(&res)
	//fmt.Println("nowww")
	return res

}
