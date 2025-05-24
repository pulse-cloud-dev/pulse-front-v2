import { checkboxConst } from "@/shared/constants";
import { CheckboxProvider, Heading, Icon, Linker } from "@/shared/components";
import { SignUpCertificationStep } from "./steps/signupcertificationstep";
import { SignUpConsentStep } from "./steps/signupconsentstep";
import { SignUpFormStep } from "./steps/signupformstep";

export const SignUpView = (props: { state: Record<string, any>; mutate: Record<string, any> }) => {
  return (
    <article className="sub-layout__content">
      <section className="section__auth">
        <div className="container__signUp">
          <Linker href="/" className="align_center">
            <Icon src="logo_02" alt="logo" className="logo" />
          </Linker>
          <Heading as="h3" className="title-32 text-center m-t-20 m-b-20">
            시작하기
          </Heading>

          {props.state?.step === "consent" && (
            <CheckboxProvider initialItems={checkboxConst.SIGN_UP_STEP_1}>
              <SignUpConsentStep
                onNext={() => props.state?.setStep("certification")} // 인증으로 가기..
              />
            </CheckboxProvider>
          )}
          {/* () => props.mutate.requestJoinSocial("NAVER")}  다음에 일어날일 이 코드 수정 필요 */}
          {props.state?.step === "certification" && (
            <SignUpCertificationStep
              handleJoinSocial={() => props.state?.setStep("form")} // 소셜 로그인 시도하기..
              onNext={() => props.state?.setStep("form")} // 회원가입 폼으로 가기..
            />
          )}

          {props.state?.step === "form" && (
            <CheckboxProvider initialItems={checkboxConst.SIGN_UP_STEP_2}>
              <SignUpFormStep
                onPrev={() => props.state?.setStep("certification")} // 인증으로 돌아가기..
                onNext={() => alert("회원가입중입니다...")} // 회원가입 시도하기..
              />
            </CheckboxProvider>
          )}
        </div>
      </section>
    </article>
  );
};
