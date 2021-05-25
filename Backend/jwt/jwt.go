package jwt

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"time"
)

// Secret key to sign jwt token

var jwt_key = []byte("secret")

var db = make(map[string]string)

type Cred struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}


// func main() {
// 	r := mux.NewRouter()

// 	db["user1"] = "pass1"
// 	db["user2"] = "pass2"
// 	r.HandleFunc("/login", login).Methods("POST", "OPTIONS")
// 	r.HandleFunc("/home", Home).Methods("GET", "OPTIONS")

// 	log.Fatal(http.ListenAndServe(":8080", r))

// }

func login(w http.ResponseWriter, r *http.Request ) {
	var c Cred
	// json.NewDecoder(r.Body).Decode(&c)

	// expectedPass, ok := db[c.Username]

	// if expectedPass != c.Password || !ok {
	// 	w.WriteHeader(http.StatusUnauthorized)
	// 	return
	// }
	expiryTime := time.Now().Add(time.Minute * 5)

	claims := &Claims{
		Username: c.Username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expiryTime.Unix(),
		},
	}

	// Generating jwt token on the basis of claims

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwt_key)

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

func Home(w http.ResponseWriter, r *http.Request) {
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

	tkn,err :=jwt.ParseWithClaims(tokenStr,claims,func(t *jwt.Token)(interface{},error){
		return jwt_key,nil
	})

	if err!=nil{
		if err ==jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if !tkn.Valid{
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	 json.NewEncoder(w).Encode("hello u are authorized")

}

func CheckAuthorization(*http.Cookie){}