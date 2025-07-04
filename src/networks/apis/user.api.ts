import { privateClient, publicClient } from "@/networks/client";
import { SignInRequestDTO, SignInResponseDTO, UserDTO, OauthResponseDTO, ResetPasswordrequestDTO, JoinSocialResponseDTO, SimplifiedUserlResponseDTO, SignUpRequestDTO } from "@/contracts";
import { plainToClass } from "class-transformer";
import axios from "axios";

const userApiRouter = {
  login: "/members/login",
  logOut: "/logout",
  joinSocial: "/members/join/",
  registerUser: "/members/join",
  findidbyoauth: (social: "NAVER" | "KAKAO") => `/members/find-id/${social}`,
  getuserinfo: "/social/naver/join-info",
  resetpassword: "/members/reset-password",
  nicknameCheck: "/members/duplicate",
  emailCheck: "members/duplicate/email",
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

//소셜 로그인 인증
const joinSocial = async (domain: string): Promise<{ body: string; message: string }> => {
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
const registerUser = async (userData: SignUpRequestDTO) => {
  try {
    return await publicClient.post(userApiRouter.registerUser, userData);
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

const getUser = async (): Promise<string> => {
  try {
    const { data } = await axios.get("/api/v1/members/find-id/NAVER");
    window.location.href = data.body; // 네이버 로그인 URL로 이동
    return data.body;
  } catch (error) {
    console.error("네이버 로그인 URL 요청 실패:", error);
    return "";
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
  const { data } = await axios.get("http://13.209.104.215:8080/api/v1/social/naver/find-email", {
    params: { code },
  });
  console.log(data.body);
  return data.body;
};

//비밀번호 수정
const resetUserPassword = async (userData: { email: string; password: string }) => {
  try {
    const response = await axios.post("/api/v1/members/password-reset", userData);
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

//닉네임 확인
const nicknameCheck = async (nickname: string): Promise<any> => {
  try {
    return await publicClient.get(`${userApiRouter.nicknameCheck}/${encodeURIComponent(nickname)}`);
  } catch (error: any) {
    if (error.response) {
      // 서버에서 응답이 왔지만 오류 상태 코드
      throw error.response.data;
    } else {
      // 네트워크 오류 또는 다른 문제(에러메세지 커스텀 Ex 괌리자문의)
      throw new Error("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  }
};

//이메일로 회원
const emailCheck = async (email: string): Promise<any> => {
  try {
    console.log(email);
    return await publicClient.post(`${userApiRouter.emailCheck}`);
  } catch (error: any) {
    if (error.response) {
      // 서버에서 응답이 왔지만 오류 상태 코드

      console.error("닉네임 중복 확인 실패:", error.response.data);
    } else {
      // 네트워크 오류 또는 다른 문제
      console.error("네트워크 또는 기타 오류:", error.message);
    }
    throw error.response.data; // 상위에서 try-catch 가능하게
  }
};

export const userApis = {
  loginUser,
  logOutUser,
  joinSocial,
  registerUser,
  updateUser,
  // getUserByOauth,
  deleteUser,
  resetUserPassword,
  nicknameCheck,
  getSocialUser,
  emailCheck,
  getNaverLoginUrl,
  getEmailByOauthCode,
};
