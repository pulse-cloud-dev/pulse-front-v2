import type { ViewEventProps, Void } from "@/shared/types";
import { formConstant } from "@/shared/constants";
import { DynamicForm, Icon, Linker } from "@/shared/components";

const SignInDynamicForm = ({ handleSubmit }: { handleSubmit: Void }) => {
  return (
    <DynamicForm
      id="signIn-form"
      className="form__auth"
      fields={formConstant.signIn}
      handleSubmit={(formData) => {
        if (formData.email && formData.password) {
          handleSubmit(formData);
        }
      }}
      submitTitle="로그인"
      submitClass="auth__button"
      schema={{ email: 4, password: 5 }}
    >
      <div className="flex_r justify_space-between">
        <span className="fs_12 color__grayscale-50">로그인 상태 유지</span>

        <span>
          <Linker href="/auth/find-password" className="fs_12 color__grayscale-50">
            계정/비밀번호 찾기
          </Linker>
        </span>
      </div>
      {/* <button type="submit" className="auth__button disabled">
        로그인
      </button> */}
    </DynamicForm>
  );
};

interface SignInViewProps extends ViewEventProps {}

export const SignInView = (props: SignInViewProps) => {
  return (
    <article className="sub-layout__content">
      <section className="section__auth">
        <div className="container__signIn">
          <Linker href="/" className="align_center">
            <Icon src="logo_02" alt="logo" className="logo" />
          </Linker>

          {/* Sign-in Form */}
          <SignInDynamicForm handleSubmit={props.event?.handleSubmit!} />
          {/* Sign-in Form */}

          <div className="flex_r align_center">
            <span className="fs_14">
              아직 회원이 아니신가요?{" "}
              <Linker href="/auth/signUp" className="color__primary-70 fw_700">
                회원가입
              </Linker>
            </span>
          </div>

          {/* Bottom line */}
          <div className="flex_r align_center m-t-40 terms">
            <Linker href="/terms-and-conditions-for-service">이용약관</Linker>
            <Linker href="/privacy-policy-for-users">개인정보방침</Linker>
            <Linker href="/customer-support-faq">고객센터</Linker>
          </div>
          {/* Bottom line */}
        </div>
      </section>
    </article>
  );
};
