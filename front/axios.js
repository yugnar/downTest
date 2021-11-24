import axios from "axios";

const baseURL = "http://localhost:3000/";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err.response)
);

export default api;
