import { FindPassWordView } from "./findPassWord.view";
import { useState } from "react";
import { usePageNavigation } from "@/shared/lib/hooks";

export const FindController = () => {
  // View에서 사용되어질 상태관리
  const [step, setStep] = useState<"인증선택" | "이메일아이디보여주기" | "비밀번호재설정">("인증선택");

  //인증선택해서 성공시 이매일아이디보여주기로 이동
  const handleOauthLogin = () => {
    // oauthMutation.mutate(undefined, {});
    setStep("이메일아이디보여주기");
  };

  // //비밀번호 재설정 함수
  const navigation = usePageNavigation();

  const handleResetPassword = (payload: any) => {
    navigation.goBack();
  };
  // Controller에서 View로 내려질 Props
  const props = {
    state: { step, setStep, handleOauthLogin, handleResetPassword, navigation },
  };
  return <FindPassWordView {...props} />;
};

