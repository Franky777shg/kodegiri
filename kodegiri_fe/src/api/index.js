import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:2000",
});

axiosInstance.interceptors.request.use((req) => {
  const auth_token = localStorage.getItem("auth_token");

  if (auth_token) {
    req.headers.Authorization = `Bearer ${auth_token}`;
  }

  return req;
});

axiosInstance.interceptors.response.use(
  (success) => {
    return success;
  },
  (error) => {
    console.log(error);
    if (error.response.status === 401) localStorage.removeItem("auth_token");

    return Promise.reject(error);
  }
);

export { axiosInstance };
