import { useState } from "react";

import { SignUpView } from "./signUp.view";
import { signUpService } from "./signUp.servive";

export const SignUpController = () => {
  // View에서 사용되어질 상태관리
  const [step, setStep] = useState<"consent" | "certification" | "form">("consent");
  const { requestJoinSocial : handleJoinSocial } = signUpService.usejoinSocial();

  // Controller에서 View로 내려질 Props
  const props = {
    state: { step, setStep },
    event: { handleJoinSocial }
  };
  return <SignUpView {...props} />;
};
