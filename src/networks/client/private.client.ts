import { envConst } from "@/shared/constants";
import axios from "axios";
import { localStorageManager } from "taeo-utils";

const { server, server_port } = envConst;
// const baseUrl = server + server_port + "/api/v1";

const baseUrl =
  import.meta.env.MODE === "production"
    ? `${import.meta.env.VITE_PROD_API_URL}/api/v1`
    : `${server}${server_port}/api/v1`;

console.log("Current mode:", import.meta.env.MODE);
console.log("Base URL:", baseUrl);

const privateClient = axios.create({
  baseURL: baseUrl,
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
