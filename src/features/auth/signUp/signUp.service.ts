import { useMutation } from "@tanstack/react-query";
import { userApis } from "@/networks";
import { JoinSocialRequestDTO } from "@/contracts";

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