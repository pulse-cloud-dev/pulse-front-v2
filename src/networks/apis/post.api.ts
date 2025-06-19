import { MentoringPostRequestDTO } from "@/contracts/request/post/post.request.dto";
import { privateClient } from "../client";
/**
 * 멘토링 등록 API 호출 함수
 * @param payload - 멘토링 등록 요청 데이터
 * @returns ResultData<ResultCodes>
 */
export const postMentoring = async (payload: MentoringPostRequestDTO): Promise<{ body: "SUCCESS"; message: string }> => {
  try {
    const response = await privateClient.post("/api/v1/mentoring/post", payload);
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
