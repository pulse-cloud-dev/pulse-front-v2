import { useState } from "react";

import { Accordion, CheckboxGroup, CheckboxItem, Heading, Icon } from "@/shared/components";
import { usePageNavigation } from "@/shared/lib/hooks";

interface SignUpViewProps {
  checkboxItems: CheckboxItem[];
}

const SignUpConsentCheck = (props: SignUpViewProps) => {
  const { checkboxItems } = props;
  const { goBack } = usePageNavigation();
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
      <div className="border-b">
        <div className="flex_r align_center gap_8 p-8">
          <CheckboxGroup type="all" id={checkboxItems[0].id} />
          <span>모두 동의합니다</span>
        </div>
      </div>

      <div className="flex1 flex_c gap_10">
        <Accordion>
          <Accordion.Item initialValue>
            {({ isActive, toggle }) => {
              return (
                <>
                  <div className={`accordion__toggle border-b`}>
                    <div className="accordion__toggle toggle__text">
                      <div className="flex_r align_center p-8 gap_8 ">
                        <CheckboxGroup type="item" id={checkboxItems[1].id} />
                        <span>이용약관(필수)</span>
                      </div>
                    </div>
                    <button type="button" className="accordion__toggle-arrow more" onClick={toggle}>
                      <Icon className="icon__arrow img_to_bk80" src="chevron_down_bk_16" alt="화살표" />
                    </button>
                  </div>

                  <div className="side-bar-content">아이템1</div>
                </>
              );
            }}
          </Accordion.Item>

          <Accordion.Item initialValue>
            {({ isActive, toggle }) => {
              return (
                <>
                  <div className={`accordion__toggle border-b`}>
                    <div className="accordion__toggle toggle__text">
                      <div className="flex_r align_center p-8 gap_8">
                        <CheckboxGroup type="item" id={checkboxItems[2].id} />
                        <span>이용약관(필수)</span>
                      </div>
                    </div>
                    <button type="button" className="accordion__toggle-arrow more" onClick={toggle}>
                      <Icon className="icon__arrow img_to_bk80" src="chevron_down_bk_16" alt="화살표" />
                    </button>
                  </div>

                  <div className="side-bar-content">아이템2</div>
                </>
              );
            }}
          </Accordion.Item>
        </Accordion>
      </div>

      <div className="w-70 m-t-40 flex_r align_center justify_center gap_8">
        <button className="btn__line btn_xl fs_15 flex1" onClick={goBack}>
          취소
        </button>
        <button className="btn__primary btn_xl flex1" onClick={() => toggle(true)}>
          다음
        </button>
      </div>
    </>
  );
};

export const SignUpView = (props: SignUpViewProps) => {
  const { checkboxItems } = props;
  return (
    <article className="sub-layout__content">
      <section className="section__auth">
        <div className="container__signUp">
          <Icon src="logo_02" alt="logo" className="logo" />

          <Heading as="h3" className="title-32 text-center m-t-20 m-b-20">
            시작하기
          </Heading>

          <SignUpConsentCheck checkboxItems={checkboxItems} />
        </div>
      </section>
    </article>
  );
};
