import { envConst } from "@/shared/constants";
import axios from "axios";
import { routerConfig } from "@/app/configs";

const { server, server_port } = envConst;

const baseUrl = import.meta.env.MODE === "production" ? "/api" : server + server_port + "/api/v1";

const privateClient = axios.create({
  baseURL: baseUrl,
});

// 동시 419 대비: 재발급 Promise를 한 번만 유지/공유
let refreshPromise: Promise<string | null> | null = null;

/** 로컬스토리지에서 토큰 꺼내기 */
const getAccessToken = (): string | null => {
  try {
    const pulse = JSON.parse(localStorage.getItem("pulse") || "{}");
    return pulse?.token ?? null;
  } catch {
    return null;
  }
};

const getRefreshToken = (): string | null => {
  try {
    const pulse = JSON.parse(localStorage.getItem("pulse") || "{}");
    return pulse?.refreshToken ?? null;
  } catch {
    return null;
  }
};

/** 토큰 재발급 */
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return null;

    const res = await axios.post(`${baseUrl}/auth/refresh`, { refreshToken });
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

/** 요청 인터셉터: 로컬스토리지 토큰을 Authorization 헤더에 자동 첨부 */
privateClient.interceptors.request.use(
  async (config: any) => {
    const token = getAccessToken();
    return {
      ...config,
      headers: {
        ...(config.headers || {}),
        "Content-Type": "application/json;charset=UTF-8",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };
  },
  (error) => Promise.reject(error)
);

/** 응답 인터셉터: JSON/문자열 응답 처리 + 만료 시 단일 재발급 */
privateClient.interceptors.response.use(
  (response) => {
    const contentType = response.headers?.["content-type"];
    const isJson =
      contentType?.includes("application/json") && typeof response.data === "object";

    // JSON이면 payload만, 아니면 그대로 반환(문자열/JWT 등)
    return isJson ? response.data : response.data;
  },
  async (error) => {
    const originalRequest: any = error.config || {};
    const isTokenExpired = error?.response?.status === 419;

    // 재발급 엔드포인트 자신은 재시도 로직 제외 (무한 루프 방지)
    const isRefreshCall =
      typeof originalRequest.url === "string" &&
      originalRequest.url.includes("/auth/refresh");

    if (isTokenExpired && !originalRequest._retry && !isRefreshCall) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = refreshAccessToken().finally(() => {
            refreshPromise = null; 
          });
        }
        const newToken = await refreshPromise;

        if (newToken) {
          // 실패했던 원 요청에 새 토큰 주입
          originalRequest.headers = {
            ...(originalRequest.headers || {}),
            Authorization: `Bearer ${newToken}`,
          };
          // 이후 요청들도 자동으로 새 토큰 사용
          privateClient.defaults.headers.common.Authorization = `Bearer ${newToken}`;

          return privateClient(originalRequest); // 재요청
        }
      } catch {
        // 재발급 실패
      }

      console.warn("토큰 갱신 실패. 로그아웃 처리 필요");
      localStorage.removeItem("pulse");
      alert("토큰 갱신 실패. 로그아웃됩니다.");
      routerConfig.navigate("/auth/signIn", { replace: true });
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default privateClient;

