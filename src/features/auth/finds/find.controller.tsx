import { FindPassWordView } from "./findPassWord.view";
import { useState } from "react";
import { usePageNavigation } from "@/shared/lib/hooks";

export const FindController = () => {
  // View에서 사용되어질 상태관리
  const [step, setStep] = useState<"인증선택" | "이매일아이디보여주기" | "비밀번호재설정">("인증선택");
  const navigation = usePageNavigation();
  // Controller에서 View로 내려질 Props
  const props = {
    state: { step, setStep, navigation },
  };
  return <FindPassWordView {...props} />;
};
