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
	Username string `json:"username" bson:"username"`
	Language []string `json:"selectedLanguages,omitempty" bson:"language"`
	Genre    []string `json:"selectedGenres,omitempty" bson:"genre"`
}

//Returning at max 10 relevant search results to the username

type SearchResult struct {
	Results []string `json:"results,omitempty" bson:"results"`

}


