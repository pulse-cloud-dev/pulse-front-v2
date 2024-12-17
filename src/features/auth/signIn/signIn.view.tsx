import React from "react";

export const SignInView = () => {
  return (
    <section className="login-section">
      <div className="login-container p-60">
        <form className="login-form">
          <label htmlFor="username">
            사용자 이름
            <input type="text" id="username" name="username" placeholder="사용자 이름을 입력하세요" required />
          </label>

          <label htmlFor="password">
            비밀번호
            <input type="password" id="password" name="password" placeholder="비밀번호를 입력하세요" required />
          </label>

          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
      </div>
    </section>
  );
};
