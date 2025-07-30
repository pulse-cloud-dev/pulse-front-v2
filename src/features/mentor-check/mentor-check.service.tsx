import { privateClient } from "@/networks/client";




interface MentorCheckResponse {
  body: boolean;
  message: string;
}

export const checkMentorRegistered = async (): Promise<boolean> => {
  try {
    const res: MentorCheckResponse = await privateClient.get("/mento-info/exist");
    console.log("[멘토 등록 여부 응답]", res);

    return res.body;
    
  } catch (err) {
    console.error("멘토 등록 여부 확인 실패:", err);
    return false;
  }

};

