import { useMutation } from "@tanstack/react-query";
import { userApis } from "@/networks";
import { JoinSocialRequestDTO, SignUpRequestDTO, SimplifiedUserlResponseDTO } from "@/contracts";
import { useQueryClient } from "@tanstack/react-query";
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

// 소셜 인증후 code전송하여 데이터 불러오기
export const useSocialUserInfo = ({ onSuccess, onError }: { onSuccess?: () => void; onError?: (error: any) => void }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (code: string): Promise<SimplifiedUserlResponseDTO> => userApis.getSocialUser(code),
    onSuccess: (data) => {
      //쿼리 키로 데이터 저장(step3에서 호출)
      queryClient.setQueryData(["auth", "signup", "userinfo"], data);
      onSuccess?.(); //다음으로 이동
    },
    onError: (error) => {
      onError?.(error); // error 넘기기
    },
  });

  return mutation;
};

//닉네임 중복 확인 Api

//회원가입(step3)회원가입용 api
export const useSignUp = () => {
  const mutation = useMutation({
    mutationFn: (userData: SignUpRequestDTO) => userApis.registerUser(userData),
    onSuccess: (a) => {
      console.log("회원가입 성공");
    },
    onError: (error) => {
      console.error("Error in SignUp :", error);
    },
  });

  const requestSignUp = (userData: SignUpRequestDTO) => {
    mutation.mutate(userData);
  };

  return { requestSignUp };
};
