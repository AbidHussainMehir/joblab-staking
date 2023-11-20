import { setIsLogged } from "@/redux/features/user/userSlice";
import { store } from "@/redux/store";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const instance = axios.create({
  baseURL: "https://api.joblab.ai",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    const accessToken = cookies.get("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      store.dispatch(setIsLogged(false));
    }
    return Promise.reject(error);
  }
);

export default instance;
