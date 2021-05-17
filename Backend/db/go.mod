module db

go 1.16

require (
	go.mongodb.org/mongo-driver v1.5.1
	pranav.com/db_tables v0.0.0-00010101000000-000000000000
)

replace pranav.com/db_tables => ../db_tables
