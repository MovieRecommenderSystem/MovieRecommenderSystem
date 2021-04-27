module pranav.com/restApi

go 1.16

replace pranav.com/db => ../db

require (
	github.com/cespare/reflex v0.3.0
	github.com/gorilla/mux v1.8.0
	go.mongodb.org/mongo-driver v1.5.1
	golang.org/x/crypto v0.0.0-20200302210943-78000ba7a073
	pranav.com/db v0.0.0-00010101000000-000000000000
	pranav.com/db_tables v0.0.0-00010101000000-000000000000
)

replace pranav.com/db_tables => ../db_tables
