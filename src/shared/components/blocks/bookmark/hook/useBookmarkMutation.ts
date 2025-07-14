import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadBookmark } from "@/networks/apis/bookmark.api";
import type { BookmarkRequest } from "@/networks/apis/bookmark.api";

export const useBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: BookmarkRequest) => uploadBookmark(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["mentoringDetail", variables.mentoring_id],
      });
    },
    onError: (error) => {
      console.error("북마크 실패:", error);
    },
  });
};
