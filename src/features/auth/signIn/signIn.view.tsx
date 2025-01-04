import { Icon, Linker } from "@/shared/components";

export const SignInView = () => {
  return (
    <article className="sub-layout__content">
      <section className="section__auth">
        <div className="container__signIn">
          <Icon src="logo_02" alt="logo" className="logo" />
          <form className="form__auth">
            <label htmlFor="username">
              {/* 사용자 이름 */}
              <input type="text" id="username" name="username" placeholder="사용자 이름을 입력하세요" required />
            </label>
            <label htmlFor="password">
              {/* 비밀번호 */}
              <input type="password" id="password" name="password" placeholder="비밀번호를 입력하세요" required />
            </label>

            <div className="flex_r justify_space-between w400">
              <span>로그인 상태 유지</span>

              <span>
                <Linker href="/auth/find-password" style={{ color: "#000" }}>
                  계정/비밀번호 찾기
                </Linker>
              </span>
            </div>
            <button type="submit" className="login-button">
              로그인
            </button>
          </form>

          <div className="flex_r align_center">
            <span>
              아직 회원이 아니신가요? <span>회원가입</span>
            </span>
          </div>

          <div className="flex_r align_center m-t-40 terms">
            <span>이용약관</span>
            <span>개인정보방침</span>
            <span>고객센터</span>
          </div>
        </div>
      </section>
    </article>
  );
};
