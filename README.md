# MOVIE RECOMMENDATION SYSTEM
[Screenshots](https://github.com/MovieRecommenderSystem/MovieRecommenderSystem/tree/main/Screenshots "Screenshots")
## How to Run on http://localhost:3000 with server on : http://localhost:9000
### Step 1: Clone the repository using:
```git clone "https://github.com/MovieRecommenderSystem/MovieRecommenderSystem.git"```
### Step 2: Change current directory to parent of the downloaded repository
### Step 3: Change current directory to /Frontend using:
```cd Frontend```
### Step 4: Install required node modules using: 
```npm i```
### Step 5: Run React frontend using: 
```npm start```
### Step 6: On another instance of terminal start mongod service using:
```sudo service mongod start```
### Step 7: Change current directory to /Backend/restApi
### Step 8: Run GoLang server using: 
```go run api.go```
### Step 9: FINISH

## Note: 
Since we have udef youtube,imdb,tmdb api's their api key will be stored in the form of envoiroment varible.In order to run the above code
One should request an API key on tmdb and goolge cloud platform(youtube_api) respectively.

## Tech Stack Used 

### Frontend: 
1. React.js
2. React-Reveal
3. react-redux
4. react-router-dom

### Backend:
1. Golang
2. Youtube Api
3. Imdb Api
4. Tmdb Api
5. mongoDB 
6. Bcrypt 
7. Different external packages

### ML Model:
1. Python
2. pandas
3. numpy
4. nltk
5. scipy
6. scikit learn
7. Different data visualisation libraries(matplotlib.pyplot, seaborn) 
