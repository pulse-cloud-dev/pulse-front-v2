import { useMutation } from "@tanstack/react-query";
import { userApis } from "@/networks";
import { JoinSocialRequestDTO, SignUpRequestDTO, SimplifiedUserlResponseDTO } from "@/contracts";
import { useQueryClient } from "@tanstack/react-query";

// 소셜 인증후 code전송하여 데이터 불러오기
export const useSocialUserInfo = ({ onSuccess, onError }: { onSuccess?: () => void; onError?: (error: any) => void }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (code: string): Promise<SimplifiedUserlResponseDTO> => userApis.getSocialUser(code),
    onSuccess: (data) => {
      //쿼리 키로 데이터 저장(step3에서 호출)
      queryClient.setQueryData(["auth", "sign-up", "userinfo"], data);
      // 또는 쿼리 무효화 시간 설정
      queryClient.setQueryDefaults(["auth", "sign-up", "userinfo"], {
        staleTime: 0, // 항상 새로운 데이터 요청
        gcTime: 1000 * 60 * 60 * 2, // 2시간
      });
      onSuccess?.(); //다음으로 이동
    },
    onError: (error) => {
      onError?.(error); // error 넘기기
    },
  });

  return mutation;
};
//소셜인증(step2)
export const useJoinSocial = () => {
  const mutation = useMutation({
    mutationFn: (domain: JoinSocialRequestDTO) => userApis.joinSocial(domain),
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
//step3용 api
//닉네임 중복 확인 Api
export const useNicknameCheck = () => {
  const checknickname = useMutation({
    mutationFn: (nick_name: string) => userApis.nicknameCheck(nick_name),
  });
  return { checknickname };
};

//회원가입(step3)회원가입용 api
export const useSignUp = ({ onSuccess, onError }: { onSuccess?: () => void; onError?: (error: any) => void }) => {
  const requestSignUp = useMutation({
    mutationFn: (userData: SignUpRequestDTO) => userApis.registerUser(userData),
    onSuccess: (data) => {
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });

  return { requestSignUp };
};
