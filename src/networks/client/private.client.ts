import { envConst } from "@/shared/constants";
import axios from "axios";
import { localStorageManager } from "taeo-utils";

const { server, server_port } = envConst;

const baseUrl = import.meta.env.MODE === "production" ? "/api/v1" : server + server_port + "/api/v1";
//백엔드와 프로덕션환경에 대해 이야기 해보아야함
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
    return Promise.reject(error);
  }
);

export default privateClient;
