import { useState } from "react";
import { SignUpView } from "./signUp.view";
import { useJoinSocial, useSignUp } from "./signUp.service";

export const SignUpController = () => {
  // View에서 사용되어질 상태관리
  const [step, setStep] = useState<"consent" | "certification" | "form">("consent");

  //step 1
  const { requestJoinSocial } = useJoinSocial();

  //step 2
  const { requestSignUp } = useSignUp();

  const handleSubmit = () => console.log("");

  // Controller에서 View로 내려질 Props
  const props = {
    state: { step, setStep },
    mutate: { requestJoinSocial, requestSignUp },
  };
  return <SignUpView {...props} />;
};
