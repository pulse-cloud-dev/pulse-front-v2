import { postMentoring } from "@/networks";
import { MentoringPostRequestDTO } from "@/contracts/request/post/post.request.dto";
import { useMutation } from "@tanstack/react-query";

export const usePostMentoring = () => {
  const mutation = useMutation({
    mutationFn: (payload: MentoringPostRequestDTO) => postMentoring(payload),

    onSuccess: (data) => {
      if (data.body === "SUCCESS") {
        console.log("멘토링 등록 성공:", data.message);
      } else {
        console.warn("멘토링 등록 실패:", data.message);
      }
    },

    onError: (error) => {
      console.error("API 호출 중 에러 발생:", error);
    },
  });

  const requestPostMentoring = (payload: MentoringPostRequestDTO) => {
    mutation.mutate(payload);
  };

  return { mutation, requestPostMentoring };
};
