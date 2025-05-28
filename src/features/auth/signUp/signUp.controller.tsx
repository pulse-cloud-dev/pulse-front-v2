import { useState, useEffect } from "react";
import { SignUpView } from "./signUp.view";
import { useJoinSocial, useSocialUserInfo } from "./signUp.service";
import { useLocation } from "react-router-dom";
import { usePageNavigation } from "@/shared/lib/hooks";
const useAuthCode = () => {
  const location = useLocation();
  const getCodeFromSearch = (search: string) => {
    const params = new URLSearchParams(search);
    return params.get("code");
  };

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

  //step 2에서 쓰는 네트워크 함수
  const { requestJoinSocial } = useJoinSocial();

  const socialLoginMutation = useSocialUserInfo({
    onSuccess: () => setStep("form"),
    onError: () => setStep("certification"),
  });

  const code = useAuthCode();

  useEffect(() => {
    if (code !== null) {
      socialLoginMutation.mutate(code);
    }
  }, [code]);

  const { goToPage } = usePageNavigation();
  // Controller에서 View로 내려질 Props
  const props = {
    state: { step, setStep },
    mutate: { requestJoinSocial },
    goToPage: () => goToPage("/auth/signIn"),
  };

  return <SignUpView {...props} />;
};
