import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../stores/useAuthStore";

const baseURL = [import.meta.env.VITE_BACKEND_URL, "/api"]
  .filter(Boolean)
  .join("");

const axiosClient = axios.create({
  baseURL,
});

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;

    if (token) {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      } else if (!(config.headers instanceof AxiosHeaders)) {
        config.headers = new AxiosHeaders(config.headers);
      }

      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
