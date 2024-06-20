import axios from "axios";

const API = axios.create({
  baseURL : "https://moviesapi.codingfront.dev/api/v1"
})
API.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log(error)
    if (error.response.status === 404) {
      window.location.replace('/404')
    } else {return}
    return Promise.reject(error);
});
export default API