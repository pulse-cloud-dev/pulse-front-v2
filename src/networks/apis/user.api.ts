import { privateClient, publicClient } from "@/networks/client";
import { SignInRequestDTO, SignInResponseDTO, UserDTO, OauthResponseDTO, ResetPasswordrequestDTO } from "@/contracts";
import axios from "axios";

const userApiRouter = {
  login: "/members/login",
  logOut: "/logout",
  joinSocial: "/members/join/",
  registerUser: "/members/join/",
  oauth: (social: "NAVER" | "KAKAO") => `/members/find-id/${social}`,
  resetpassword: "/members/reset-password",
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

//소셜 로그인 인증
// const joinSocial = async (domain:string) : Promise<{ body: string }>=> {
const joinSocial = async (domain: string): Promise<{ body: string; message: string }> => {
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
const registerUser = async (userData: { name: string; email: string; password: string }) => {
  try {
    const response = await publicClient.post(userApiRouter.registerUser, userData);
    return response.data;
  }
  catch (error: any){
    // 에러 처리: 서버에서 응답 실패 시 예외 처리
    if (error.response) {
      // 서버에서 반환된 오류 처리
      console.error("registerUser failed:", error.response.data);
    } else {
      // 네트워크 오류 등 기타 오류 처리
      console.error("Network or other error:", error.message);
    }
    throw error.response; // 에러를 다시 던져서 상위 컴포넌트에서 처리할 수 있게 함
  }
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

//소셜 로그인(네이버)
const getUserByOauth = async (): Promise<OauthResponseDTO> => {
  try {
    return await publicClient.get(userApiRouter.oauth("NAVER"));
  } catch (error: any) {
    // 에러 처리: 서버에서 응답 실패 시 예외 처리
    if (error.response) {
      // 서버에서 반환된 오류 처리
      console.error("oauth failed:", error.response.data);
    } else {
      // 네트워크 오류 등 기타 오류 처리
      console.error("Network or other error:", error.message);
    }
    throw error.response; // 에러를 다시 던져서 상위 컴포넌트에서 처리할 수 있게 함
  }
};

// 네이버 로그인 URL 받아오기
const getNaverLoginUrl = async (): Promise<string> => {
  try {
    const { data } = await axios.get("/api/v1/members/find-id/NAVER");
    return data.body; // URL 문자열
  } catch (error) {
    console.error("네이버 로그인 URL 요청 실패:", error);
    throw error;
  }
};

const getEmailByOauthCode = async (code: string): Promise<{ email: string; name: string }> => {
  const { data } = await axios.get(
    "http://13.209.104.215:8080/api/v1/social/naver/find-email",
    {
      params: { code },
    }
  );
  console.log(data.body);
  return data.body;
};

//비밀번호 수정
const resetUserPassword = async ({ member_id, new_password }: ResetPasswordrequestDTO): Promise<any> => {
  try {
    const response = await publicClient.post(userApiRouter.resetpassword, { member_id, new_password });
    return response.data;
  } catch (error: any) {
    // 에러 처리: 서버에서 응답 실패 시 예외 처리
    if (error.response) {
      // 서버에서 반환된 오류 처리
      console.error("비밀번호 수정 failed:", error.response.data);
    } else {
      // 네트워크 오류 등 기타 오류 처리
      console.error("Network or other error:", error.message);
    }
    throw error.response; // 에러를 다시 던져서 상위 컴포넌트에서 처리할 수 있게 함
  }
};

export const userApis = {
  loginUser,
  logOutUser,
  joinSocial,
  registerUser,
  getUser,
  updateUser,
  getUserByOauth,
  deleteUser,
  resetUserPassword,
  getNaverLoginUrl,
  getEmailByOauthCode
};
