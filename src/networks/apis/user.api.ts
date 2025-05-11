import { privateClient, publicClient } from "@/networks/client";
import { SignInRequestDTO, SignInResponseDTO, UserDTO } from "@/contracts";
import axios from "axios";

const userApiRouter = {
  login: "/members/login",
  logOut: "/logout",
};
// 로그인 요청
const loginUser = async ({ email, password }: SignInRequestDTO): Promise<SignInResponseDTO> => {
  try {
    return await publicClient.post(userApiRouter.login, { email, password });
  } catch (error: any) {
    // 에러 처리: 서버에서 응답 실패 시 예외 처리
    if (error.response) {
      // 서버에서 반환된 오류 처리
      console.error("Login failed:", error.response.data);
    } else {
      // 네트워크 오류 등 기타 오류 처리
      console.error("Network or other error:", error.message);
    }
    throw error.response; // 에러를 다시 던져서 상위 컴포넌트에서 처리할 수 있게 함
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

const getUser = async () : Promise<string> => {
  try {
    const { data } = await axios.get("/api/v1/members/find-id/NAVER");
    // window.location.href = data.body; // 네이버 로그인 URL로 이동
    return data.body;
  } catch (error) {
    console.error("네이버 로그인 URL 요청 실패:", error);
     return "";
  }
};

// 유저 정보 가져오기
// const getUser = async (): Promise<UserDTO> => {
//   const response = await publicClient.get("/user");
//   return response.data;
// };

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
