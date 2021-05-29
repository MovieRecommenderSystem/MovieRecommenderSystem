package recommend

import (
	"fmt"
	//"github.com/gorilla/mux"
	"bytes"
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	db "pranav.com/db"
	"pranav.com/db_tables"
)

var ClientVar *mongo.Client

var jwt_key = []byte("secret")

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

//var output db_tables.SimpleRecommender
func SimpleRecommender(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Add("Access-Control-Allow-Headers", "x-access-token")
	var usr db_tables.UsernameForRecommendation
	json.NewDecoder(r.Body).Decode(&usr)

	//fmt.Println(usr.Username)

	// cookie, err := r.Cookie("token")
	// if err != nil {
	// 	if err == http.ErrNoCookie {
	// 		w.WriteHeader(http.StatusUnauthorized)
	// 		return
	// 	}
	// 	w.WriteHeader(http.StatusBadRequest)
	// 	return
	// }
	// tokenStr := cookie.Value
	claims := &Claims{}
	tokenStr := r.Header.Get("x-access-token")
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
	ClientVar = db.ClientVar
	collection := ClientVar.Database("popkorn_db").Collection("UserPreferences")
	filter := bson.D{{"username", usr.Username}}

	var result db_tables.Preferences

	//fmt.Println("lassan")
	err_new := collection.FindOne(context.TODO(), filter).Decode(&result)
	fmt.Println(err)
	if err_new != nil {
		log.Fatal(err)
	}
	if len(result.Username) == 0 {
		fmt.Println("user does not exists")
		json.NewEncoder(w).Encode(-1)

	} else {
		//var output db_tables.SimpleRecommender
		output := GetRecommendations(result)
		json.NewEncoder(w).Encode(output)
	}

}
func ContentRecommender(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Add("Access-Control-Allow-Headers", "x-access-token")
	fmt.Println("Hello!")
	var id db_tables.RecieveContentBased
	var output db_tables.ContentBased
	json.NewDecoder(r.Body).Decode(&id)

	// cookie, err := r.Cookie("token")
	// if err != nil {
	// 	if err == http.ErrNoCookie {
	// 		w.WriteHeader(http.StatusUnauthorized)
	// 		return
	// 	}
	// 	w.WriteHeader(http.StatusBadRequest)
	// 	return
	// }
	// tokenStr := cookie.Value
	claims := &Claims{}
	tokenStr := r.Header.Get("x-access-token")
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
	output = ContentBased(id)
	json.NewEncoder(w).Encode(output)
}
func GetRecommendations(s db_tables.Preferences) db_tables.SimpleRecommender {

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
	fmt.Println(res)
	return res

}

func ContentBased(id db_tables.RecieveContentBased) db_tables.ContentBased {
	value := map[string]int{"TMDB": id.TMDB}
	json_data, err := json.Marshal(value)
	if err != nil {
		fmt.Println("Error while Marshalling")
	}
	var res db_tables.ContentBased
	resp, err2 := http.Post("https://popkorn-recommender.herokuapp.com/apiRecommender/content", "application/json",
		bytes.NewBuffer(json_data))

	if err2 != nil {
		fmt.Println("Error in Posting")
	}
	json.NewDecoder(resp.Body).Decode(&res)
	fmt.Println(res)
	return res

}
