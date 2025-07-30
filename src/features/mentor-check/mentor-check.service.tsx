import { privateClient } from "@/networks/client";


export const checkMentorRegistered = async (): Promise<boolean> => {
  try {
    const res = await privateClient.get("/mento-info/exist") as { isRegistered: boolean };
    return res.isRegistered;

  } catch (err) {
    console.error("멘토 등록 여부 확인 실패:", err);
    return false;
  }
};