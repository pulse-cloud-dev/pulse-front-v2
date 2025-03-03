import $axios from "axios";

import { envConst } from "@/shared/constants";

const baseUrl =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_PROD_API_URL // EC2 서버 주소 직접 사용
    : `${envConst.server}${envConst.server_port}/api/v1`;

console.log("Public client - Current mode:", import.meta.env.MODE);
console.log("Public client - Base URL:", baseUrl);

const publicClient = $axios.create({ baseURL: baseUrl });
// const publicClient = $axios.create({ baseURL });

publicClient.interceptors.request.use(async (config) => {
  const headers = {
    "Content-type": "application/json;charset=UTF-8",
  };
  return {
    ...config,
    ...headers,
  };
});

publicClient.interceptors.response.use(
  (response) => {
    // 응답이 성공적으로 처리된 경우
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default publicClient;
