import { useState } from "react";

import { Accordion, Heading, Icon } from "@/shared/components";

const SignUpConsentCheck = () => {
  const [isActive, toggle] = useState<boolean>(false);

  if (isActive)
    return (
      <form className="form__auth">
        <label htmlFor="username">
          이메일
          <input type="text" id="username" name="username" placeholder="사용자 이름을 입력하세요" required />
        </label>

        <label htmlFor="password">
          닉네임
          <input type="password" id="password" name="password" placeholder="비밀번호를 입력하세요" required />
        </label>

        <label htmlFor="username">
          비밀번호
          <input type="text" id="username" name="username" placeholder="사용자 이름을 입력하세요" required />
        </label>

        <label htmlFor="username">
          비밀번호 확인
          <input type="text" id="username" name="username" placeholder="사용자 이름을 입력하세요" required />
        </label>
      </form>
    );
  return (
    <>
      <div className="accordion__wrap">
        <div className="accordion__item">
          <div className="accordion__toggle">모두 동의합니다</div>
        </div>
      </div>

      <div className="flex1 flex_c gap_10">
        <Accordion>
          <Accordion.Item initialValue>
            {({ isActive, toggle }) => {
              return (
                <>
                  <div className={`accordion__toggle`} onClick={toggle}>
                    <span className="accordion__toggle toggle__text">이용약관(필수)</span>
                    <button type="button" className="accordion__toggle-arrow more" onClick={toggle}>
                      <Icon className="icon__arrow img_to_bk80" src="chevron_down_bk_16" alt="화살표" />
                    </button>
                  </div>

                  <div className="side-bar-content">아이템1</div>
                </>
              );
            }}
          </Accordion.Item>
        </Accordion>
        <Accordion>
          <Accordion.Item initialValue>
            {({ isActive, toggle }) => {
              return (
                <>
                  <div className={`accordion__toggle`} onClick={toggle}>
                    <span className="accordion__toggle toggle__text">이용약관(필수)</span>
                    <button type="button" className="accordion__toggle-arrow more" onClick={toggle}>
                      <Icon className="icon__arrow img_to_bk80" src="chevron_down_bk_16" alt="화살표" />
                    </button>
                  </div>

                  <div className="side-bar-content">아이템1</div>
                </>
              );
            }}
          </Accordion.Item>
        </Accordion>
        <Accordion>
          <Accordion.Item initialValue>
            {({ isActive, toggle }) => {
              return (
                <>
                  <div className={`accordion__toggle`} onClick={toggle}>
                    <span className="accordion__toggle toggle__text">이용약관(필수)</span>
                    <button type="button" className="accordion__toggle-arrow more" onClick={toggle}>
                      <Icon className="icon__arrow img_to_bk80" src="chevron_down_bk_16" alt="화살표" />
                    </button>
                  </div>

                  <div className="side-bar-content">아이템1</div>
                </>
              );
            }}
          </Accordion.Item>
        </Accordion>
      </div>

      <div className="w-70 m-t-40 flex_r align_center justify_center gap_8">
        <button className="btn__line btn_xl fs_15 flex1">취소</button>
        <button className="btn__primary btn_xl flex1" onClick={() => toggle(true)}>
          다음
        </button>
      </div>
    </>
  );
};

export const SignUpView = () => {
  return (
    <article className="sub-layout__content">
      <section className="section__auth">
        <div className="container__signUp">
          <Icon src="logo_02" alt="logo" className="logo" />

          <Heading as="h3" className="title-32 text-center m-t-20 m-b-20">
            시작하기
          </Heading>

          <SignUpConsentCheck />
        </div>
      </section>
    </article>
  );
};
