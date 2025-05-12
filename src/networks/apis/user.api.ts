import { privateClient, publicClient } from "@/networks/client";
import { SignInRequestDTO, SignInResponseDTO, SignUpRequestDTO, UserDTO } from "@/contracts";

const userApiRouter = {
  login: "/members/login",
  logOut: "/logout",
  joinSocial: "/members/join/"
};

// 로그인 요청
const loginUser = async ({
  email,
  password,
}: SignInRequestDTO): Promise<SignInResponseDTO> => {
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

//소셜 로그인 인증
const joinSocial = async (domain:string) => {
  try {
    const endPoint = userApiRouter.joinSocial + domain;
    return await publicClient.get(endPoint);
  }
  catch (error: any){
    // 에러 처리: 서버에서 응답 실패 시 예외 처리
    if (error.response) {
      // 서버에서 반환된 오류 처리
      console.error("Social Certification failed:", error.response.data);
    } else {
      // 네트워크 오류 등 기타 오류 처리
      console.error("Network or other error:", error.message);
    }
    throw error.response; // 에러를 다시 던져서 상위 컴포넌트에서 처리할 수 있게 함
  }
}

// 회원가입 요청
const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
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
  joinSocial,
  registerUser,
  getUser,
  updateUser,
  deleteUser,
};
