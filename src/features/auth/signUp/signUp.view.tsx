import { usePageNavigation } from "@/shared/lib/hooks";
import { checkboxConst, formConstant } from "@/shared/constants";
import { Accordion, CheckboxGroup, CheckboxProvider, DynamicForm, Heading, Icon, Linker, useCheckboxGroup } from "@/shared/components";

const SignUpDynamicForm = () => {
  const handleSubmit = (data: { [key: string]: string }) => console.log("Form Submitted:", data);

  return (
    <DynamicForm
      id="signIn-form"
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
      submitClass="auth__button"
      submitTitle="확인"
    />
  );
};

const SignUpConsentCheck = ({ onNext }: { onNext: () => void }) => {
  const { items: checkboxItems } = useCheckboxGroup();
  const { goBack } = usePageNavigation();

  const isActiveNext = checkboxItems[0].checked;
  return (
    <>
      <div className="border-b m-t-10">
        <div className="flex_r align_center gap_8 p-8">
          <CheckboxGroup type="all" id={checkboxItems[0].id} />
          <span>모두 동의합니다</span>
        </div>
      </div>

      <div className="flex1 flex_c ">
        {checkboxItems.slice(1).map((item) => (
          <Accordion key={item.id}>
            <Accordion.Item>
              {({ toggle, isActive }) => (
                <>
                  <div className={`accordion__toggle border-b m-t-8`}>
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
                      <span>{`${item.label}`}</span>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                      took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
                      unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
                      PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
                      ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
                      electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                      with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                  )}
                </>
              )}
            </Accordion.Item>
          </Accordion>
        ))}
      </div>

      <div className="w-70 m-t-40 flex_r align_center justify_center gap_8">
        <button className="btn__line btn_xl fs_15 flex1" onClick={goBack}>
          취소
        </button>
        <button className={`btn__primary btn_xl flex1 ${isActiveNext ? "" : "disabled"}`} onClick={onNext} disabled={!isActiveNext}>
          다음
        </button>
      </div>
    </>
  );
};

interface SignUpViewProps {
  state?: Record<string, any>;
}

export const SignUpView = (props: SignUpViewProps) => {
  const { state } = props;

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
            <CheckboxProvider initialItems={checkboxConst.signUp}>
              <SignUpConsentCheck onNext={() => state?.setStep("form")} />
            </CheckboxProvider>
          )}
          {state?.step === "form" && <SignUpDynamicForm />}
        </div>
      </section>
    </article>
  );
};
