import $axios from "axios";

import { envConst } from "@/shared/constants";
//api endpoint 수정 백엔드와 이야기 필요..
const baseUrl = import.meta.env.MODE === "production" ? `/api/${envConst.version}` : `/api/${envConst.version}`;

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
