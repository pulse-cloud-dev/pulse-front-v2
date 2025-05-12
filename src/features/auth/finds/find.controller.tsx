import { FindPassWordView } from "./findPassWord.view";
import { useState } from "react";
import { usePageNavigation } from "@/shared/lib/hooks";
import { findService } from "./find.service";

export const FindController = () => {
  // View에서 사용되어질 상태관리
  const [step, setStep] = useState<"인증선택" | "이매일아이디보여주기" | "비밀번호재설정">("인증선택");
  const { oauthMutation } = findService.useOauth();

  //인증선택해서 성공시 이매일아이디보여주기로 이동
  const handleOauthLogin = () => {
    // oauthMutation.mutate(undefined, {});
    setStep("이매일아이디보여주기");
  };

  //비밀번호 재설정 함수
  const { resetpaswordmutation } = findService.useResetAccountPassword();
  const navigation = usePageNavigation();

  const handleResetPassword = (payload: any) => {
    navigation.goHome();
    // resetpaswordmutation.mutate(payload, {
    //   onSuccess: () => {
    //     //비밀번호 재설정 성공시 홈으로 이동
    //     navigation.goHome();
    //   },
    // });
  };

  // Controller에서 View로 내려질 Props
  const props = {
    state: { step, setStep, handleOauthLogin, handleResetPassword, navigation },
  };
  return <FindPassWordView {...props} />;
};
