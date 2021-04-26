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

//Data coming for verification while signing in!

type SignInData struct{
	Username string `json:"username,omitempty" bson:"username,omitempty"`
	Password string `json:"password,omitempty" bson:"password,omitempty"`
}
