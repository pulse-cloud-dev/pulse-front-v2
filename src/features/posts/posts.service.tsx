import { postMentoring } from "@/networks";
import { MentoringPostRequestDTO } from "@/contracts/request/post/post.request.dto";
import { useMutation } from "@tanstack/react-query";

export const usePostMentoring = (openPostModal: { openModal: () => void }, failPostModal: { openModal: () => void }) => {
  const mutation = useMutation({
    mutationFn: (payload: MentoringPostRequestDTO) => postMentoring(payload),

    onSuccess: (data) => {
      if (data.body === "SUCCESS") {
        console.log("멘토링 등록 성공:", data.message);
        openPostModal.openModal(); // 성공 시 모달 열기 테스트!!!
      } else {
        console.warn("멘토링 등록 실패:", data.message);
        failPostModal.openModal(); // 실패 시 모달 열기
      }
    },

    onError: (error) => {
      console.error("API 호출 중 에러 발생:", error);
      failPostModal.openModal(); // 에러 발생 시 실패 모달 열기
    },
  });

  const requestPostMentoring = (payload: MentoringPostRequestDTO) => {
    mutation.mutate(payload);
  };

  return { mutation, requestPostMentoring };
};
