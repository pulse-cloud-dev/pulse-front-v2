import type { UserSignInApi } from "@/network/types";
import { privateClient, publicClient } from "@/network/client";
import { UserDTO } from "@/contracts";

const userApiRouter = {
  login: "/login",
  logOut: "/logout",
};
// 로그인 요청
const loginUser = async ({ name, password, token }: UserSignInApi) => {
  try {
    // POST 요청: 사용자 로그인
    const response = await publicClient.post(userApiRouter.login, {
      name,
      password,
      mfa_token: token, // 다중 인증 토큰 (MFA)
    });
    return response; // 성공 시 응답 반환
  } catch (error: any) {
    // 에러 처리: 서버에서 응답 실패 시 예외 처리
    if (error.response) {
      // 서버에서 반환된 오류 처리
      console.error("Login failed:", error.response.data);
    } else {
      // 네트워크 오류 등 기타 오류 처리
      console.error("Network or other error:", error.message);
    }
    throw error; // 에러를 다시 던져서 상위 컴포넌트에서 처리할 수 있게 함
  }
};

const logOutUser = async (id: Id) => {
  return await privateClient.post(userApiRouter.logOut, { id });
};

// 회원가입 요청
const registerUser = async (userData: { name: string; email: string; password: string }) => {
  const response = await publicClient.post("/register", userData);
  return response.data;
};

// 유저 정보 가져오기
const getUser = async (): Promise<UserDTO> => {
  const response = await publicClient.get("/user");
  return response.data;
};

// 유저 정보 업데이트
const updateUser = async (userData: Partial<UserDTO>): Promise<UserDTO> => {
  const response = await publicClient.put("/user", userData);
  return response.data;
};

// 회원 탈퇴
const deleteUser = async (): Promise<void> => {
  await publicClient.delete("/user");
};

export const userApis = {
  loginUser,
  logOutUser,
  registerUser,
  getUser,
  updateUser,
  deleteUser,
};
