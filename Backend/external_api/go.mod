module pranav.com/external_api

go 1.16

replace pranav.com/db_tables => ../db_tables

require (
	github.com/StalkR/imdb v1.0.6
	github.com/cyruzin/golang-tmdb v1.3.3
	github.com/dgrijalva/jwt-go v3.2.0+incompatible
	github.com/joho/godotenv v1.3.0
	pranav.com/db_tables v0.0.0-00010101000000-000000000000
)
