import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9000",
});
instance.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
instance.interceptors.request.use(
  (config) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      let accessToken = userData.token;
      console.log(accessToken);
      if (accessToken) {
        config.headers = Object.assign(
          {
            "x-access-token": accessToken,
          },
          config.headers
        );
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;





//Failure from frontend
// fetch("http://localhost:9000/api/trailer", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "content-type": "application/json;charset=UTF-8",
//     "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEyMyIsImV4cCI6MTYyMjMyNDEwMX0.vPitgi1D30doHUEvRDAC35s_Mw0mxJkMqhDFyzRx3_g"
//   },
//   "referrer": "http://localhost:3000/",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "{\"query\":\"Avengers: Endgame\"}",
//   "method": "POST",
//   "mode": "cors"
// });

// Success from frontend
// fetch("http://localhost:9000/api/trailer", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
//     "content-type": "application/json;charset=UTF-8",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-site",
//     "sec-gpc": "1",
//     "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEyMyIsImV4cCI6MTYyMjMyNDEwMX0.vPitgi1D30doHUEvRDAC35s_Mw0mxJkMqhDFyzRx3_g"
//   },
//   "referrer": "http://localhost:3000/",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "{\"query\":\"Avengers: Endgame\"}",
//   "method": "POST",
//   "mode": "cors"
// });


// Failure from backend
// fetch("http://localhost:9000/api/trailer", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-site"
//   },
//   "referrer": "http://localhost:3000/",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "OPTIONS",
//   "mode": "cors"
// });




// Success from backend
// fetch("http://localhost:9000/api/trailer", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-site"
//   },
//   "referrer": "http://localhost:3000/",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "OPTIONS",
//   "mode": "cors"
// });