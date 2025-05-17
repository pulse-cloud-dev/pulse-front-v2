import { useState } from "react";

import { SignUpView } from "./signUp.view";
import { useJoinSocial } from "./signUp.service";

export const SignUpController = () => {
  // View에서 사용되어질 상태관리
  const [step, setStep] = useState<"consent" | "certification" | "form">("consent");
  const { mutation: joinSocialMutation } = useJoinSocial();


  // Controller에서 View로 내려질 Props
  const props = {
    state: { step, setStep },
    mutate: { joinSocialMutation }
  };
  return <SignUpView {...props} />;
};
