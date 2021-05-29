package db_tables

//Data send by new user
type NewUser struct {
	Username string `json:"username,omitempty" bson:"username,omitempty"`
	Email    string `json:"email,omitempty" bson:"email,omitempty"`
	Password string `json:"password,omitempty" bson:"password,omitempty"`
	Phone_No string `json:"phone,omitempty" bson:"phone_no,omitempty"`
	DOB      string `json:"dob,omitempty" bson:"dob,omitempty"`
	Gender   string `json:"gender,omitempty" bson:"gender,omitempty"`
}

type JWTToken struct {
	Token string `json:"token,omitempty"`
}

//Data coming for verification while signing in
type SignInData struct {
	Email    string `json:"email,omitempty" bson:"username,omitempty"`
	Password string `json:"password,omitempty" bson:"password,omitempty"`
}

// Struct which checks whether an email already exists or not.

type CheckExistance struct {
	UniqueUsername  bool `json:"uniqueUsername" bson:"uniqueUsername"`
	RegisteredEmail bool `json:"registeredEmail" bson:"registeredEmail"`
}

//Check whether thr stored email and username exists or not

type CheckUsernameEmail struct {
	Username string `json:"username,omitempty" bson:"username,omitempty"`
	Email    string `json:"email,omitempty" bson:"email,omitempty"`
}

//Storing user preferences

type Preferences struct {
	Username string   `json:"username" bson:"username"`
	Language []string `json:"selectedLanguages,omitempty" bson:"language"`
	Genre    []string `json:"selectedGenres,omitempty" bson:"genre"`
}

//Returning at max 10 relevant search results to the username

type SearchResult struct {
	Results []SearchDetails `json:"results,omitempty" bson:"results"`
}
type SearchDetails struct {
	Title string `json:"title" `
	Tmdb_id int64 `json:"tmdb_id" `
	Year    string    `json:"year" `
}

type Query struct {
	Query string `json:"query" bson:"query"`
}

type TmdbID struct {
	Tmdbid int	 `json:"tmdbID"`
}

type Poster struct {
	PosterUrl string `json:"poster" bson:"poster"`
}

//detailed movie page
type DetailsPage struct {
	ID          string   `json: "imdbId,omitempty"`
	Name        string   `json: name",omitempty"`
	Type        string   `json:"type,omitempty"`
	Year        int      `json:"year,omitempty"`
	Rating      string   `json:"rating,omitempty"`
	Duration    string   `json:"duration,omitempty"`
	Actors      []string `json:actors",omitempty"`
	Genres      []string `json:genres",omitempty"`
	Languages   []string `json:languages",omitempty"`
	Description string   `json:"description,omitempty"`
	Directors   []string   `json:"director,omitempty"`
	Poster      string   `json:"poster,omitempty"`
	
}

type YtUrlLink struct {
	EmbeddedLink string `json:"embeddedLink"`
}

type SimpleRecommender struct {
	ID []int `json:"result_id"`
	Name []string `json:"result_name"`
	Year []string `json:"year"`
}

type UsernameForRecommendation struct{
Username string `json:"username"`
}

type AfterSignIn struct {
	Status bool `json:"status"`
	Username string `json:"username"`
	Token string `json:"token,omitempty"`
}

type RecieveContentBased struct {
	TMDB int `json:"TMDB"`
}

type ContentBased struct {
	Response []int `json:"response"`
	Name []string `json:"name"`
}