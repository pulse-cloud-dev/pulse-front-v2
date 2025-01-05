import { useState } from "react";

import { SignUpView } from "./signUp.view";

export const SignUpController = () => {
  // View에서 사용되어질 상태관리
  const [step, setStep] = useState<"consent" | "form">("consent");

  // Controller에서 View로 내려질 Props
  const props = {
    state: { step, setStep },
  };
  return <SignUpView {...props} />;
};
