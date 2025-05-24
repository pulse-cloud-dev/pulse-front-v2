import { privateClient, publicClient } from "@/networks/client";
import { SignInRequestDTO, JoinSocialRequestDTO, SignInResponseDTO, UserDTO, OauthResponseDTO, ResetPasswordrequestDTO, JoinSocialResponseDTO, SimplifiedUserlResponseDTO } from "@/contracts";
import { plainToClass } from "class-transformer";
const userApiRouter = {
  login: "/members/login",
  logOut: "/logout",
  joinSocial: "/members/join/",
  registerUser: "/members/join/",
  findidbyoauth: (social: "NAVER" | "KAKAO") => `/members/find-id/${social}`,
  getuserinfo: "/social/naver/join-info",
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
//로그아웃
const logOutUser = async (id: Id) => {
  return await privateClient.post(userApiRouter.logOut, { id });
};

//소셜 로그인(네이버) 회원가입용
const joinSocial = async (domain: JoinSocialRequestDTO): Promise<JoinSocialResponseDTO> => {
  try {
    const endPoint = userApiRouter.joinSocial + domain;
    return await publicClient.get(endPoint);
  } catch (error: any) {
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
};

// 회원가입 요청
const registerUser = async (userData: { name: string; email: string; password: string }) => {
  try {
    const response = await publicClient.post(userApiRouter.registerUser, userData);
    return response.data;
  } catch (error: any) {
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

// 유저 정보 업데이트
const updateUser = async (userData: Partial<UserDTO>): Promise<UserDTO> => {
  const response = await publicClient.put("/user", userData);
  return response.data;
};

// 회원 탈퇴
const deleteUser = async (): Promise<void> => {
  await publicClient.delete("/user");
};

//소셜 로그인(네이버) 아이디 비번 찾기용
const getUserByOauth = async (): Promise<OauthResponseDTO> => {
  try {
    return await publicClient.get(userApiRouter.findidbyoauth("NAVER"));
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
// oauthcode로 회원 데이터 얻어오기 회원가입용
const getSocialUser = async (code: string): Promise<SimplifiedUserlResponseDTO> => {
  try {
    return await publicClient.get(userApiRouter.getuserinfo, { params: { code } }).then((response: any) =>
      plainToClass(SimplifiedUserlResponseDTO, response.body, {
        excludeExtraneousValues: true,
      })
    );
  } catch (error: any) {
    if (error.response) {
      console.error("oauth failed:", error.response.data);
    } else {
      console.error("Network or other error:", error.message);
    }
    throw error.response;
  }
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
  updateUser,
  getUserByOauth,
  deleteUser,
  resetUserPassword,
  getSocialUser,
};
