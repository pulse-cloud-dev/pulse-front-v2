import { useState, useEffect } from "react";
import { SignUpView } from "./signUp.view";
import { useJoinSocial, useSignUp, useSocialUserInfo } from "./signUp.service";
import { useLocation } from "react-router-dom";

const useAuthCode = () => {
  const location = useLocation();
  const getCodeFromSearch = (search: string) => {
    const params = new URLSearchParams(search);
    return params.get("code");
  };

  const useJoinSocial = () => {};

  const [code, setCode] = useState<string | null>(() => getCodeFromSearch(location.search));

  useEffect(() => {
    const newCode = getCodeFromSearch(location.search);
    if (newCode !== code) {
      setCode(newCode);
    }
  }, [location.search, code]);

  return code;
};

export const SignUpController = () => {
  // View에서 사용되어질 상태관리
  const [step, setStep] = useState<"consent" | "certification" | "form">("consent");

  //step 1
  const { requestJoinSocial } = useJoinSocial();

  //step 2
  const { requestSignUp } = useSignUp();

  const socialLoginMutation = useSocialUserInfo({
    onSuccess: () => setStep("certification"),
    onError: () => setStep("form"),
  });

  const code = useAuthCode();

  useEffect(() => {
    if (code !== null) {
      socialLoginMutation.mutate(code);
    }
  }, [code]);

  // Controller에서 View로 내려질 Props
  const props = {
    state: { step, setStep },
    mutate: { requestJoinSocial, requestSignUp },
  };
  return <SignUpView {...props} />;
};
