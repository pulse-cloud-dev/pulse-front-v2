import { DynamicForm, Icon, Linker } from "@/shared/components";

const fields = [
  { name: "username", label: "", required: false, placeholder: "사용자 이름을 입력하세요" },
  { name: "password", label: "", type: "password", required: false, placeholder: "비밀번호를 입력하세요" },
];

export const SignInView = () => {
  return (
    <article className="sub-layout__content">
      <section className="section__auth">
        <div className="container__signIn">
          <Icon src="logo_02" alt="logo" className="logo" />

          <DynamicForm
            id="signIn-form"
            className="form__auth"
            fields={fields}
            handleSubmit={(data: { [key: string]: string }) => {
              console.log("Form Submitted:", data);
            }}
          >
            <div className="flex_r justify_space-between w400">
              <span className="fs_12">로그인 상태 유지</span>

              <span className="fs_12">
                <Linker href="/auth/find-password" style={{ color: "#000" }}>
                  계정/비밀번호 찾기
                </Linker>
              </span>
            </div>
            <button type="submit" className="auth__button">
              로그인
            </button>
          </DynamicForm>

          <div className="flex_r align_center">
            <span className="fs_14">
              아직 회원이 아니신가요?{" "}
              <Linker href="/auth/signUp" className="color__primary-70 fw_700">
                회원가입
              </Linker>
            </span>
          </div>

          <div className="flex_r align_center m-t-40 terms">
            <Linker href="/terms-and-conditions-for-service">이용약관</Linker>
            <Linker href="/privacy-policy-for-users">개인정보방침</Linker>
            <Linker href="/customer-support-faq">고객센터</Linker>
          </div>
        </div>
      </section>
    </article>
  );
};
