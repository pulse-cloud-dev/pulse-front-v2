import type { ViewEventProps, Void } from "@/shared/types";
import { usePageNavigation } from "@/shared/lib/hooks";
import { checkboxConst, formConstant, socialConstant } from "@/shared/constants";
import { Accordion, BaseButton, CheckboxGroup, CheckboxItem, CheckboxProvider, DynamicForm, Heading, Icon, Linker, useCheckboxGroup } from "@/shared/components";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { DynamicFormV2 } from "@/shared/components";
import { SignUpRequestDTO } from "@/contracts";
import { useSignUp } from "./signUp.service";

type SignUpStepProps = {
  onPrev?: () => void;
  onNext?: () => void;
};

// Step 1
const SignUpConsentStep = ({ onNext }: SignUpStepProps) => {
  const { items: checkboxItems } = useCheckboxGroup();
  const { goBack } = usePageNavigation();

  const isActiveNext = checkboxItems[0].checked;
  return (
    <div className="p-30">
      <div className="border-b m-t-10">
        <div className="flex_r align_center gap_8 p-8">
          <CheckboxGroup type="all" id={checkboxItems[0].id} />
          <span>모두 동의합니다</span>
        </div>
      </div>

      <div className="flex1 flex_c">
        {checkboxItems.slice(1).map((item) => (
          <Accordion key={item.id}>
            <Accordion.Item>
              {({ toggle, isActive }) => (
                <>
                  <div className={`accordion__toggle m-t-8`}>
                    <div className="flex_r align_center p-8 gap_8">
                      <CheckboxGroup type="item" id={item.id} />
                      <span>{item.label}</span>
                    </div>
                    <button type="button" className="accordion__toggle-arrow more" onClick={toggle}>
                      <Icon className={`icon__arrow img_to_bk80 ${isActive ? "on" : ""}`} src="chevron_down_bk_16" alt="화살표" />
                    </button>
                  </div>
                  {isActive && (
                    <div className="accordion__item-content">
                      <span className="fs_12 color__grayscale-50">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                        took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                        essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                        like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                        dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also
                        the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                      </span>
                    </div>
                  )}
                </>
              )}
            </Accordion.Item>
          </Accordion>
        ))}
      </div>

      <div className="w-60 m-t-40 flex_r align_center justify_center gap_8" style={{ margin: "auto" }}>
        <button className="fs_16 btn__line gray btn_xl flex1" onClick={goBack}>
          취소
        </button>
        <button className={`fs_16 btn__primary btn_xl flex1 ${isActiveNext ? "" : "disabled"}`} 
                onClick={() => {
                  const uncheckedItem = checkboxItems.filter((item) => item.id !== "all").find((item) => !item.checked);
                  if (uncheckedItem === undefined) {onNext?.()}
                  else if (uncheckedItem?.id === "1") { alert("이용약관 동의는 필수로 동의해야 회원가입이 가능합니다.");}
                  else if (uncheckedItem?.id === "2") { alert("개인정보 수집 이용에 대한 동의는 필수로 동의해야 회원가입이 가능합니다.");}
                }}>
          다음
        </button>
      </div>
    </div>
  );
};

// Step 2
const SignUpCertificationStep = ({ handleJoinSocial, onNext }: {  
    handleJoinSocial:  UseMutationResult<AxiosResponse<any, any>, Error, string, unknown>;
    onNext: () => void;
  }) => {

  const socialLogin = socialConstant.socialLogin;
  
  
  return (
    <div className="m-t-40 w-100 flex_c align_center justify_center">
      {socialLogin.map((item) => (
        <BaseButton className="w400 m-b-30 border gap_8" size="xl" onClick={() => handleJoinSocial.mutate(item.domain)}>
          <Icon src={item.icon} alt={item.alt} />
          {item.text}
        </BaseButton>
      ))}
    </div>
  );
};

// Step 3
const SignUpFormStep = ({ onPrev, onNext }: SignUpStepProps) => {
  const { items: checkboxItems } = useCheckboxGroup();
  const { mutation , requestSignUp} = useSignUp()

  // const handleSubmit = (data: { [key: string]: string }) => console.log("Form Submitted:", data);
  // const handleSubmit = (data: { [key: string]: string }) => {
  //   const uncheckedItem = checkboxItems.find((item) => !item.checked);

  //   if (uncheckedItem?.id === "1") { alert("이용약관 동의는 필수로 동의해야 회원가입이 가능합니다.");}
  //   else if (uncheckedItem?.id === "2") { alert("개인정보 수집 이용에 대한 동의는 필수로 동의해야 회원가입이 가능합니다.");}
  //   return
  // };

  return (
    <DynamicFormV2
      id="signUp-form"
      className="form__auth"
      fields={formConstant.signUp}
      handleSubmit={(formData:SignUpRequestDTO) => {
        // const uncheckedItem = checkboxItems.find((item) => !item.checked);
        // if (uncheckedItem?.id === "1") { alert("선택1");}
        // else if (uncheckedItem?.id === "2") { alert("선택2");}
        requestSignUp(formData);
      }}
      // 글자수 disabled상태
      schema={{
        email: 5,
        password: 5,
        phone_number: 5,
        birth: 5,
        name: 5,
        nick_name: 5
      }}
      cancelClass="auth__button cancel"
      cancelTitle="취소"
      onClickCancel={onPrev}
      submitClass="auth__button"
      submitTitle="다음"
    >
      <div className="signUp__step3">
        {checkboxItems.map((item) => (
          <div>
            <CheckboxGroup type="item" id={item.id} />
            <span>
              <p>{item.label}</p>
              <span>{item.desc}</span>
            </span>
          </div>
        ))}
      </div>
    </DynamicFormV2>
  );
};


interface SignUpViewProps extends ViewEventProps {
  state: { 
    step: "consent" | "certification" | "form";
    setStep: React.Dispatch<React.SetStateAction<"consent" | "certification" | "form">>;
  };
  mutate: {
    joinSocialMutation: UseMutationResult<AxiosResponse<any, any>, Error, string, unknown>
  }
}
export const SignUpView = (props: SignUpViewProps) => {
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

          {props.state?.step === "certification" && props.mutate?.joinSocialMutation && (
            <SignUpCertificationStep
              handleJoinSocial={props.mutate.joinSocialMutation}
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
