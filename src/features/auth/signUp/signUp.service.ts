import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApis } from "@/networks";
import { JoinSocialRequestDTO, SignUpRequestDTO } from "@/contracts";
import { CheckboxItem } from "@/shared/components";

//소셜인증(step2)
export const useJoinSocial = (options = {}) => {
  const mutation = useMutation({
    mutationFn: (domain: string) => userApis.joinSocial(domain),
    onSuccess: (response) => {
      // 응답이 문자열 URL이라면
      // const query = response.body;
      // const parsing = new URLSearchParams(query);
      
      // if (typeof redirectUrl === "string") {
      //   window.location.href = redirectUrl; // 외부로 리디렉트
      // } else {
      //   console.error("리다이렉트 URL이 유효하지 않습니다.");
      // }
    },
    onError: (error) => {
      console.error("Join social failed:", error);
    },
  });

  return { mutation };
};



//회원가입(step3)
export const useSignUp = () => {
  const mutation = useMutation({
    mutationFn: (userData: SignUpRequestDTO) => userApis.registerUser(userData),
    onSuccess: (a) => {
     
    },
    onError: (error) => {
      console.error("Error in SignUp :", error);
    },
  });

  const requestSignUp = (userData: SignUpRequestDTO) => {
      mutation.mutate(userData);
  };

  return { mutation, requestSignUp };
};























// import { useMutation } from "@tanstack/react-query";

// import { userApis } from "@/networks";
// import { JoinSocialRequestDTO } from "@/contracts";

// const usejoinSocial = () => {
//   const mutation = useMutation({
//       mutationFn: (domain:string) => userApis.joinSocial(domain),
//   })

//   const requestJoinSocial = (domain:string) => {
//     mutation.mutate(domain,{
//       onSuccess: () => {
//         onNext();
//       },
//       onError: (error) => {
//         console.error("소셜 가입 실패", error);
//       }
//     })};

//     return { mutation, requestJoinSocial };
//   }

// export const signUpService = {
//   usejoinSocial
// };