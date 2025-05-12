import { useMutation } from "@tanstack/react-query";

import { userApis } from "@/networks";
import { JoinSocialRequestDTO } from "@/contracts";

const usejoinSocial = () => {
  const mutation = useMutation({
      mutationFn: (social:JoinSocialRequestDTO) => userApis.joinSocial(social.domain),
  })

  const requestJoinSocial = (social:JoinSocialRequestDTO, onNext:()=> void) => {
    mutation.mutate(social,{
      onSuccess: () => {
        onNext();
      },
      onError: (error) => {
        console.error("소셜 가입 실패", error);
      }
    })};

    return { mutation, requestJoinSocial };
  }

export const signUpService = {
  usejoinSocial
};
