import axios from "axios";
import { localStorageManager } from "taeo-utils";

const basePath = process.env.VITE_ENV_BASE_URL;

const privateClient = axios.create({
  baseURL: basePath,
});

privateClient.interceptors.request.use(
  async (config: any) => {
    return {
      ...config,
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${localStorageManager.get("test")}`,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      console.info("응답을 받았습니다.");
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error.response.data;

    // return Promise.reject(error);
  }
);

export default privateClient;
