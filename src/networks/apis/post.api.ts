import { MentoringPostRequestDTO } from "@/contracts/request/post/post.request.dto";
import { privateClient } from "../client";
import { checkMentorRegistered } from "@/features/mentor-check/mentor-check.service";
/**
 * 멘토링 등록 API 호출 함수
 * @param payload - 멘토링 등록 요청 데이터
 * @returns ResultData<ResultCodes>
 */



export const postMentoring = async (payload: MentoringPostRequestDTO): Promise<{ body: "SUCCESS"; message: string }> => {
  
  // 1. 사전 확인
  const isMentor = await checkMentorRegistered();
  if (!isMentor) {
    throw {
      status: 403,
      body: "MENTO_NOT_REGISTERED_USER",
      message: "멘토로 등록되지 않은 사용자입니다. 글을 등록할 수 없습니다.",
    };
  }

  // 2. 글 등록 시도
  try {
    const response = await privateClient.post("/mentoring/post", payload);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Mentoring registration failed:", error.response.data);
    } else {
      console.error("Network or other error:", error.message);
    }
    throw error.response;
  }
};
