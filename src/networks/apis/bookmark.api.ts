import { publicClient } from "@/networks/client";

export interface BookmarkRequest {
  mentoring_id: string;
  is_bookmark: boolean;
}


export const UploadBookmark = async (payload: BookmarkRequest): Promise<void> => {
  try {
    await publicClient.post("/mentoring-bookmarks/upload", payload);
  } catch (error) {
    console.error("멘토링 북마크 업로드 실패:", error);
    throw error;
  }
};