package db_se_project

import (
	"context"
	"fmt"
	"log"
	//"time"

	//"time"
	//"go.mongodb.org/mongo-driver/bson"
	//"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	//"go.mongodb.org/mongo-driver/mongo/readpref"
	//"go.mongodb.org/mongo-driver/bson"
	//"pranav.com/db_tables"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
)

var ClientVar *mongo.Client
func DatabaseConnection() *mongo.Client {
	fmt.Println("Starting the server")

	// Set client options
clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

// Connect to MongoDB
client, err := mongo.Connect(context.TODO(), clientOptions)
ClientVar=client

if err != nil {
    log.Fatal(err)
}

// Check the connection
err = client.Ping(context.TODO(), nil)

if err != nil {
    log.Fatal(err)
}

fmt.Println("Connected to MongoDB!")
	return client

}

