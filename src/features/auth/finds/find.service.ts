import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApis } from "@/networks";

//네이버 로그인
const useOauth = () => {
  const queryClient = useQueryClient();

  const oauthMutation = useMutation({
    mutationFn: () => userApis.getUserByOauth(),
    onSuccess: (data) => {
      //로그인 리다이렉트
      // window.location.href = data.body;
    },
    onError: (error) => {
      console.error("Error in oauth로그인 :", error);
    },
  });

  return { oauthMutation };
};

//비밀번호 재설정 api
const useResetAccountPassword = () => {
  const queryClient = useQueryClient();

  const resetpaswordmutation = useMutation({
    mutationFn: userApis.resetUserPassword,
    onSuccess: (a) => {
      // 데이터 업데이트가 성공하면 쿼리 캐시를 무효화하여 최신 데이터를 가져옴
      console.log("비밀번호 재설정 성공");
    },
    onError: (error) => {
      console.error("Error in 비밀번호 재설정 :", error);
    },
  });

  return { resetpaswordmutation };
};

export const findService = {
  useOauth,
  useResetAccountPassword,
};
