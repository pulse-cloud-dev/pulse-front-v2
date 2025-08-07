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

// ⚠️ 응답에서 토큰 만료 감지 및 자동 재시도
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

    if (isTokenExpired && !originalRequest._retry) {
      originalRequest._retry = true;

      const newToken = await refreshAccessToken();
      if (newToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return privateClient(originalRequest); // 재요청
      } else {
        console.warn("토큰 갱신 실패. 로그아웃 처리 필요");
        // location.href = "/login"; 또는 로그아웃 로직 실행
      }
    }

    return Promise.reject(error);
  }
);

export default privateClient;

// import { envConst } from "@/shared/constants";
// import axios from "axios";
// import { localStorageManager } from "taeo-utils";

// const { server, server_port } = envConst;

// const baseUrl = import.meta.env.MODE === "production" ? "/api" : server + server_port + "/api/v1";
// //백엔드와 프로덕션환경에 대해 이야기 해보아야함
// const privateClient = axios.create({
//   baseURL: baseUrl,
// });

// privateClient.interceptors.request.use(
//   async (config: any) => {
//     return {
//       ...config,
//       headers: {
//         "Content-type": "application/json;charset=UTF-8",
//         Authorization: Bearer ${JSON.parse(localStorage.getItem("pulse") || "{}").token},
//       },
//     };
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// privateClient.interceptors.response.use(
//   (response) => {
//     if (response && response.data) {
//       console.info("응답을 받았습니다.");
//       return response.data;
//     }
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default privateClient;