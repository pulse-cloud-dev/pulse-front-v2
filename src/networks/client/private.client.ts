import { envConst } from "@/shared/constants";
import axios from "axios";
import { localStorageManager } from "taeo-utils";

const { server, server_port } = envConst;

const baseUrl =
  import.meta.env.MODE === "production" ? "/api" : server + server_port + "/api/v1";

const privateClient = axios.create({
  baseURL: baseUrl,
});

// 토큰 안전하게 추출
// getToken 수정
const getToken = (): string | null => {
  const raw = localStorage.getItem("pulse");
  return raw ?? null; //  JSON.parse 제거
};


// 요청 시 헤더에 토큰 자동 부착
privateClient.interceptors.request.use(
  async (config: any) => {
    const token = getToken();
    console.log("[Interceptor] 토큰 확인:", token);

    return {
      ...config,
      withCredentials: true,
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 타입이 문자열(JWT 등)일 경우도 처리
privateClient.interceptors.response.use(
  (response) => {
    const contentType = response.headers["content-type"];

    const isJson =
      typeof response.data === "object" &&
      contentType?.includes("application/json");

    if (isJson) {
      console.info("응답을 받았습니다.");
      return response.data;
    }

    console.warn("응답이 JSON이 아닙니다.");
    return response.data;  
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default privateClient;
