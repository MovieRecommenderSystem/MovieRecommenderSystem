package yt

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"

	//"github.com/gorilla/mux"
	"google.golang.org/api/googleapi/transport"
	"google.golang.org/api/youtube/v3"
	"pranav.com/db_tables"
)
var queryy db_tables.Query

var a db_tables.YtUrlLink
func SendTrailer(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	//var query db_tables.Query
	json.NewDecoder(r.Body).Decode(&queryy)
	fmt.Println(query)
	if len(queryy.Query) > 0 {
		YtUrl()
		a.EmbeddedLink=url
		json.NewEncoder(w).Encode(a)
	}
	
}


var trialerStr string = " trailer"
var movieName string =	queryy.Query
var queryStr string =trialerStr+movieName
var (
	query      = flag.String("query", queryStr, "Search term")
	maxResults = flag.Int64("max-results", 1, "Max YouTube results")
)

const developerKey = "AIzaSyBzdeGiIlTfVND2vItd0AsSDOfcMXgsRmw"

var url string


func YtUrl() {
	flag.Parse()

	client := &http.Client{
		Transport: &transport.APIKey{Key: developerKey},
	}

	service, err := youtube.New(client)
	if err != nil {
		log.Fatalf("Error creating new YouTube client: %v", err)
	}

	// Make the API call to YouTube.
	//made changes here== from service.Search.List("id,snippet") to service.Search.List([]string{"id,snippet"})
	call := service.Search.List([]string{"id,snippet"}).
		Q(*query).
		MaxResults(*maxResults)
	response, _ := call.Do()
	//handleError(err, "")

	// Group video, channel, and playlist results in separate lists.
	videos := make(map[string]string)
	channels := make(map[string]string)
	playlists := make(map[string]string)

	// Iterate through each item and add it to the correct list.
	for _, item := range response.Items {
		switch item.Id.Kind {
		case "youtube#video":
			videos[item.Id.VideoId] = item.Snippet.Title
		case "youtube#channel":
			channels[item.Id.ChannelId] = item.Snippet.Title
		case "youtube#playlist":
			playlists[item.Id.PlaylistId] = item.Snippet.Title
		}
	}

	//printIDs("Videos", videos)
	//printIDs("Channels", channels)
	printIDs("Playlists", playlists)

	trailerUrlStructure := "https://www.youtube.com/embed/"
	url = trailerUrlStructure + GetID(videos)

}

// Print the ID and title of each result in a list as well as a name that
// identifies the list. For example, print the word section name "Videos"
// above a list of video search results, followed by the video ID and title
// of each matching video.
func printIDs(sectionName string, matches map[string]string) {
	fmt.Printf("%v:\n", sectionName)
	for id, title := range matches {
		fmt.Printf("[%v] %v\n", id, title)

	}
	fmt.Printf("\n\n")

}

func GetID(matches map[string]string) string {
	str := ""
	for id, _ := range matches {
		str = id
	}
	fmt.Printf("\n\n")
	return str
}
