module pranav.com/yt

go 1.16

replace pranav.com/db => ../db

replace pranav.com/db_tables => ../db_tables

require (
	github.com/dgrijalva/jwt-go v3.2.0+incompatible
	github.com/joho/godotenv v1.3.0
	google.golang.org/api v0.45.0
	pranav.com/db_tables v0.0.0-00010101000000-000000000000
)
