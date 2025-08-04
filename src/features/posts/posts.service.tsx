import { postMentoring } from "@/networks";
import { MentoringPostRequestDTO } from "@/contracts/request/post/post.request.dto";
import { useMutation } from "@tanstack/react-query";

export const usePostMentoring = (openPostModal: { openModal: () => void }, failPostModal: { openModal: () => void }) => {
  const mutation = useMutation({
    mutationFn: (payload: MentoringPostRequestDTO) => postMentoring(payload),

    onSuccess: () => {
      openPostModal.openModal();
    },

    onError: (error) => {
      console.error("API 호출 중 에러 발생:", error);
      failPostModal.openModal();
    },
  });

  const requestPostMentoring = (payload: MentoringPostRequestDTO) => {
    mutation.mutate(payload);
  };

  return { mutation, requestPostMentoring };
};
