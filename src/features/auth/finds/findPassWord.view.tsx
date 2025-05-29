import { Heading, Linker, Icon } from "@/shared/components";
import { userApis } from "@/networks/apis/user.api";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { urlConst } from "@/shared/constants";

//step 컴포넌트
import { ResetAccountPasswordStep } from "@/shared/components/widgets/rePassword/step/rePasswordForm";
import { AuthenticationSelectionStep } from "@/shared/components/widgets/rePassword/step/naverLogin";
import { ShowEmailIdStep } from "@/shared/components/widgets/rePassword/step/showEmail"


export const FindPassWordView = ({ state }: { state: Record<string, any> }) => {
  const [emailInfo, setEmailInfo] = useState<{ email: string; name: string } | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    
    if (!code) return;

    // 네이버 code로 이메일 정보 요청
    const fetchEmail = async () => {
      try {
        const response = await userApis.getEmailByOauthCode(code); // 이메일 요청 API
        setEmailInfo({ email: response.email, name: response.name }); // response는 { email, name }
        state.setStep("이매일아이디보여주기");
      } catch (error) {
        console.error("이메일 요청 실패", error);
      }
    };

    fetchEmail();
  }, []);

  return (
    //"인증선택" | "이메일아이디보여주기" | "비밀번호재설정"
    <article className="sub-layout__content">
      <section className="section__auth">
        <div className="container__signUp">
          <Linker href="/" className="align_center">
            <Icon src="logo_02" alt="logo" className="logo" />
          </Linker>
          <Heading as="h3" className="title-32 text-center m-t-20 m-b-20">
            계정/비밀번호 찾기
          </Heading>
          {state?.step === "인증선택" && <AuthenticationSelectionStep/>}
          {state?.step === "이메일아이디보여주기" &&
            emailInfo && (
              <ShowEmailIdStep
                email={emailInfo.email}
                name={emailInfo.name}
                onNext={() => state.setStep("비밀번호재설정")}
                onSignIn={() =>
                  state?.navigation.goToPage(`/${urlConst.auth.main}/${urlConst.auth.signIn}`)
                }
              />
            )}
          {state?.step === "비밀번호재설정" && <ResetAccountPasswordStep onNext={state.handleResetPassword} onMain={() => state?.navigation.goHome()} />}
        </div>
      </section>
    </article>
  );

};

