import { usePageNavigation } from "@/shared/lib/hooks";
import { checkboxConst, formConstant } from "@/shared/constants";
import { Accordion, BaseButton, CheckboxGroup, CheckboxProvider, DynamicForm, Heading, Icon, Linker, useCheckboxGroup } from "@/shared/components";

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
        <button className={`fs_16 btn__primary btn_xl flex1 ${isActiveNext ? "" : "disabled"}`} onClick={onNext} disabled={!isActiveNext}>
          다음
        </button>
      </div>
    </div>
  );
};

// Step 2
const SignUpCertificationStep = ({ onNext }: SignUpStepProps) => {
  return (
    <div className="m-t-40 w-100 flex_r align_center justify_center">
      <BaseButton className="w400 border gap_8" size="xl" onClick={onNext}>
        <Icon src="logo_naver" alt="네이버 로고" />
        네이버 로그인으로 본인인증
      </BaseButton>
    </div>
  );
};

// Step 3
const SignUpFormStep = ({ onPrev, onNext }: SignUpStepProps) => {
  const { items: checkboxItems } = useCheckboxGroup();

  const handleSubmit = (data: { [key: string]: string }) => console.log("Form Submitted:", data);

  return (
    <DynamicForm
      id="signUp-form"
      className="form__auth"
      fields={formConstant.signUp}
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
    </DynamicForm>
  );
};

export const SignUpView = ({ state }: { state: Record<string, any> }) => {
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

          {state?.step === "consent" && (
            <CheckboxProvider initialItems={checkboxConst.SIGN_UP_STEP_1}>
              <SignUpConsentStep
                onNext={() => state?.setStep("certification")} // 인증으로 가기..
              />
            </CheckboxProvider>
          )}

          {state?.step === "certification" && (
            <SignUpCertificationStep
              onNext={() => state?.setStep("form")} // 회원가입 폼으로 가기..
            />
          )}

          {state?.step === "form" && (
            <CheckboxProvider initialItems={checkboxConst.SIGN_UP_STEP_2}>
              <SignUpFormStep
                onPrev={() => state?.setStep("certification")} // 인증으로 돌아가기..
                onNext={() => alert("회원가입중입니다...")} // 회원가입 시도하기..
              />
            </CheckboxProvider>
          )}
        </div>
      </section>
    </article>
  );
};
