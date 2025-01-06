import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userApis } from "@/networks";
import { SignInRequestDTO } from "@/contracts";

const useSignIn = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (signInRequestPayload: SignInRequestDTO) => userApis.loginUser(signInRequestPayload),
    onSuccess: (a) => {
      // 데이터 업데이트가 성공하면 쿼리 캐시를 무효화하여 최신 데이터를 가져옴
      queryClient.invalidateQueries({
        queryKey: ["USER", "SIGNIN"],
      });
    },
    onError: (error) => {
      console.error("Error in SignIn :", error);
    },
  });

  const requestSignIn = (signInRequestPayload: SignInRequestDTO) => {
    mutation.mutate(signInRequestPayload);
  };

  return { mutation, requestSignIn };
};
export const signInService = {
  useSignIn,
};
