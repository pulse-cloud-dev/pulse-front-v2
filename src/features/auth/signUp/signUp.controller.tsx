import { useState } from "react";

import { SignUpView } from "./signUp.view";
import { useJoinSocial, useSignUp } from "./signUp.service";
import { SignUpRequestDTO } from "@/contracts";
import { CheckboxItem } from "@/shared/components";

export const SignUpController = () => {
  // View에서 사용되어질 상태관리
  const [step, setStep] = useState<"consent" | "certification" | "form">("consent");
  const { mutation: joinSocialMutation } = useJoinSocial();
  const { mutation} = useSignUp();
  // const handleSubmit = (formData: SignUpRequestDTO, checkboxItems:CheckboxItem[]) => requestSignUp(formData, checkboxItems);


  // Controller에서 View로 내려질 Props
  const props = {
    state: { step, setStep },
    mutate: { joinSocialMutation }
  };
  return <SignUpView {...props} />;
};
