import { envConst } from "@/shared/constants";
import axios from "axios";

const { server, server_port } = envConst;

const baseUrl = import.meta.env.MODE === "production" ? "/api" : server + server_port + "/api/v1";

const privateClient = axios.create({
  baseURL: baseUrl,
});

// 토큰 가져오기
const getAccessToken = (): string | null => {
  try {
    const pulse = JSON.parse(localStorage.getItem("pulse") || "{}");
    return pulse?.token ?? null;
  } catch (e) {
    return null;
  }
};

const getRefreshToken = (): string | null => {
  try {
    const pulse = JSON.parse(localStorage.getItem("pulse") || "{}");
    return pulse?.refreshToken ?? null;
  } catch (e) {
    return null;
  }
};


// 토큰 재발급 요청
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return null;

    const res = await axios.post(`${baseUrl}/auth/refresh`, {
      refreshToken,
    });

    const newAccessToken = res.data?.accessToken;
    const newRefreshToken = res.data?.refreshToken;

    if (newAccessToken) {
      localStorage.setItem(
        "pulse",
        JSON.stringify({
          token: newAccessToken,
          refreshToken: newRefreshToken ?? refreshToken,
        })
      );
      return newAccessToken;
    }

    return null;
  } catch (err) {
    console.error("토큰 재발급 실패:", err);
    return null;
  }
};

// 요청 시 토큰 자동 추가

privateClient.interceptors.request.use(
  
  async (config: any) => {

    const token = getAccessToken();
    
    return {
      ...config,
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };
  },
  (error) => Promise.reject(error)
);

// 응답에서 토큰 만료 감지 및 자동 재시도
privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
    
  },
  async (error) => {
    const originalRequest = error.config;

    const isTokenExpired =
      error.response?.status === 417 &&
      error.response?.data?.body === "TOKEN_EXPIRED";

    // 재시도 플래그로 무한 루프 방지
    if (isTokenExpired && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        if (newToken) {
          originalRequest.headers = {
            ...(originalRequest.headers || {}),
            Authorization: `Bearer ${newToken}`,
          };
          return privateClient(originalRequest); //재요청
        }
      } catch (e) {
        // 갱신 호출 자체 실패 시 아래로 떨어져 로그아웃
      }

      console.warn("토큰 갱신 실패. 로그아웃 처리 필요");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      alert("토큰 갱신 실패. 로그아웃됩니다.");
      location.href="/auth/signIn";
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default privateClient;

