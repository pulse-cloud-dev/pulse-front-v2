import { useMutation } from "@tanstack/react-query";
import { userApis } from "@/networks";
import { JoinSocialRequestDTO, SignUpRequestDTO } from "@/contracts";
//소셜인증(step2)
export const useJoinSocial = () => {
  const mutation = useMutation({
    mutationFn: (domain: JoinSocialRequestDTO): Promise<{ body: string; message: string }> => userApis.joinSocial(domain),
    onSuccess: (response: { body: string; message: string }) => {
      const url = response?.body;
      window.open(url);
    },
    onError: (error) => {
      console.error("Join social failed:", error);
    },
  });
  const requestJoinSocial = (domain: JoinSocialRequestDTO) => {
    mutation.mutate(domain);
  };

  return { requestJoinSocial };
};

// useSocialUserInfo 훅 수정
export const useSocialUserInfo = ({ onSuccess, onError }: { onSuccess?: (data: any) => void; onError?: (error: any) => void }) => {
  const mutation = useMutation({
    mutationFn: (code: string): Promise<{ name: string; email: string; phonenumber: string }> => userApis.getSocialUser(code),
    onSuccess: (data) => {
      onSuccess?.(data); // data 넘기기
    },
    onError: (error) => {
      onError?.(error); // error 넘기기
    },
  });

  return mutation;
};

//회원가입(step3)
export const useSignUp = () => {
  const mutation = useMutation({
    mutationFn: (userData: SignUpRequestDTO) => userApis.registerUser(userData),
    onSuccess: (a) => {},
    onError: (error) => {
      console.error("Error in SignUp :", error);
    },
  });

  const requestSignUp = (userData: SignUpRequestDTO) => {
    mutation.mutate(userData);
  };

  return { requestSignUp };
};
