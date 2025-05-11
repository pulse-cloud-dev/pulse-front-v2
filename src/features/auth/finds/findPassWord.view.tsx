// import React from "react";
import type { ViewEventProps, Void } from "@/shared/types";
import { Accordion, BaseButton, CheckboxGroup, CheckboxProvider, DynamicForm, Heading, Icon, Linker, useCheckboxGroup } from "@/shared/components";
import { checkboxConst, formConstant } from "@/shared/constants";
import { usePageNavigation } from "@/shared/lib/hooks";
// import { userApis } from "@/networks"
import { useEffect, useState } from "react";
import { userApis } from "@/networks/apis/user.api";
import axios from "axios";


type SignUpStepProps = {
  onPrev?: () => void;
  onNext?: (email?: string) => void;
};

// 네이버 본인인증(Step 1)
const SignUpCertificationStep = ({ onNext }: SignUpStepProps & { onNext: (email: string) => void }) => {
  const handleClick = async () => {
    try {
      const email = await userApis.getUser(); //이메일 받아오기
      onNext(email); // 다음 Step으로 넘김
    } catch (error) {
      console.error("이메일 요청 실패:", error);
    }
  };

  return (
    <div className="m-t-40 w-100 flex_r align_center justify_center">
      <BaseButton className="w400 border gap_8" size="xl" onClick={handleClick}>
        <Icon src="logo_naver" alt="네이버 로고" />
        네이버 로그인으로 본인인증
      </BaseButton>
    </div>
  );
};

// 사용자 확인(Step 2)
const Identification = ({ email, onNext }: { email: string; onNext: () => void }) => {
  return (
    <div className="w-30 m-t-40 flex-col align_center justify_center gap_8" style={{ margin: "auto" }}>
      <p className="fs_16 m-b-20">확인된 이메일 주소: <strong>{email}</strong></p>

      <button className="fs_16 btn__line gray btn_xl flex1" onClick={onNext}>
        비밀번호 재설정
      </button>
      <button className={`fs_16 btn__primary btn_xl flex1`} onClick={onNext}>
        로그인하기
      </button>
    </div>
  );
};


// 비밀번호 재설정(Step 3)
const SignUpFormStep = ({ onPrev, onNext }: SignUpStepProps) => {
  const { goBack } = usePageNavigation();

  const handleSubmit = (data: { [key: string]: string }) => console.log("Form Submitted:", data);

  return (
    <DynamicForm
      id="signUp-form"
      className="form__auth"
      fields={formConstant.rePassWord}
      handleSubmit={handleSubmit}
      // 글자수 disabled상태
      schema={{
        email: 4,
        username: 4,
        password: 6,
        "password-check": 6,
      }}
      cancelClass="auth__button cancel"
      cancelTitle="취소"
      onClickCancel={onPrev}
      submitClass=""
      submitTitle=""
    >
      
      <div className="w-80 m-t-40 flex_r align_center justify_center gap_8" style={{ margin: "auto" }}>
        <button className="fs_16 btn__line gray btn_xl flex1" onClick={goBack}>
          메인으로 이동
        </button>
        <button className={`fs_16 btn__primary btn_xl flex1`} onClick={() => onNext?.()}>
          비밀번호 재설정
        </button>
        {/* <button className={`fs_16 btn__primary btn_xl flex1 ${isActiveNext ? "" : "disabled"}`} onClick={onNext} disabled={!isActiveNext}>
          다음
        </button> */}
      </div>
     
    </DynamicForm>
     
  );
};

interface FindPassWordViewProps extends ViewEventProps {
  onNext: () => void;
}

export const FindPassWordView = ({ state }: { state: Record<string, any> }) => {
  const [email, setEmail] = useState("");
  
  return (
    <article className="sub-layout__content">
      <section className="section__auth">
        <div className="container__signIn">
          <Linker href="/" className="align_center">
              <Icon src="logo_02" alt="logo" className="logo" />
          </Linker>
          
          {/* Title */}
          <h4 className="text-xs font-semibold m-t-40 align_center">계정 비밀번호 찾기</h4>

          {state?.step === "initial" && (
            <SignUpCertificationStep 
              onNext={() => {
                setEmail(email);              
                state.setStep("certification"); 
              }}
              />
          )}

          {state?.step === "certification" && (
            <Identification
              email={email}
              onNext={() => state?.setStep("form")} // 비번 재설정 폼으로 가기
            />
          )}

          {state?.step === "form" && (
              <SignUpFormStep
                // onPrev={() => state?.setStep("certification")} 
                onNext={() => alert("비밀번호 재설정 중입니다...")} 
              />
          )}
        </div>

      </section>
    </article>
  )
};

