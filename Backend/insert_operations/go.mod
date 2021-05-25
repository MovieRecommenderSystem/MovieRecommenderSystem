module pranav.com/insert_operations

go 1.16

replace pranav.com/db => ../db

replace pranav.com/db_tables => ../db_tables

require (
	github.com/dgrijalva/jwt-go v3.2.0+incompatible
	go.mongodb.org/mongo-driver v1.5.1
	golang.org/x/crypto v0.0.0-20210421170649-83a5a9bb288b
	pranav.com/db v0.0.0-00010101000000-000000000000
	pranav.com/db_tables v0.0.0-00010101000000-000000000000
)

replace pranav.com/recommend => ../recommend
