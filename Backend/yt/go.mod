module pranav.com/yt

go 1.16

replace pranav.com/db => ../db

replace pranav.com/db_tables => ../db_tables

require (
	google.golang.org/api v0.45.0
	pranav.com/db_tables v0.0.0-00010101000000-000000000000
)
