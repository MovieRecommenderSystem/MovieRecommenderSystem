module pranav.com/restApi

go 1.16

replace pranav.com/db => ../db

replace pranav.com/db_tables => ../db_tables

replace pranav.com/external_api => ../external_api

replace pranav.com/insert_operations => ../insert_operations

replace pranav.com/recommend => ../recommend

replace pranav.com/yt => ../yt

require (
	github.com/dgrijalva/jwt-go v3.2.0+incompatible
	github.com/gorilla/mux v1.8.0
	go.mongodb.org/mongo-driver v1.5.2
	golang.org/x/crypto v0.0.0-20210513164829-c07d793c2f9a
	pranav.com/db v0.0.0-00010101000000-000000000000
	pranav.com/db_tables v0.0.0-00010101000000-000000000000
	pranav.com/external_api v0.0.0-00010101000000-000000000000
	pranav.com/insert_operations v0.0.0-00010101000000-000000000000
	pranav.com/jwt v0.0.0-00010101000000-000000000000
	pranav.com/recommend v0.0.0-00010101000000-000000000000
	pranav.com/yt v0.0.0-00010101000000-000000000000
)

replace pranav.com/jwt => ../jwt
