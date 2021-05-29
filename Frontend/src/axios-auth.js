import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9000",
});

instance.interceptors.request.use(
  (config) => {
    console.log(localStorage.getItem("userData"));
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      let accessToken = userData.token;
      console.log(accessToken);
      if (accessToken) {
        config.headers = Object.assign(
          {
            "x-access-token": `${accessToken}`,
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
