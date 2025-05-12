import { Heading, Typography } from "@/shared/components";
import { Linker } from "@/shared/components";
import { BaseButton } from "@/shared/components";

//step1
const AuthenticationSelectionStep = ({ onNext }: { onNext?: () => void }) => {
  return (
    <div className="w-100 flex_r align_center justify_center m-t-40">
      <BaseButton className="w400 border gap_8" size="xl" onClick={onNext}>
        <Icon src="logo_naver" alt="네이버 로고" />
        네이버 로그인으로 본인인증
      </BaseButton>
    </div>
  );
};

const FoundAccountPanel = ({ email, name }: { email: string; name: string }) => {
  return (
    <div className="w-100 border-gray flex_c align-center justify_center gap_16" style={{ padding: "24px", height: "104px", borderRadius: "10px" }}>
      <p>
        <Typography variant="compact" size="16" weight="bold" color="grayscale" colorscale="90">
          {name}님의 아이디
        </Typography>
      </p>
      <p>
        <Typography variant="compact" size="18" weight="regular" color="grayscale" colorscale="90">
          {email}
        </Typography>
      </p>
    </div>
  );
};

//step2
const ShowEmailIdStep = ({ onNext, onSignIn }: { onNext?: () => void; onSignIn?: () => void }) => {
  const data = {
    email: "hong12***@naver.com",
    name: "김펄스",
  };

  return (
    <>
      <FoundAccountPanel {...data} />
      <div className="w-80 m-t-40 flex_r align_center justify_center gap_8" style={{ margin: "auto" }}>
        <button className="find_reset__button" onClick={onNext}>
          비밀번호 재설정
        </button>
        <button className={`fs_16 btn__primary btn_xl flex1`} onClick={onSignIn}>
          로그인하기
        </button>
      </div>
    </>
  );
};

import { DynamicForm } from "@/shared/components";
import { formConstant } from "@/shared/constants";
//step3
const ResetAccountPasswordStep = ({ onNext, onMain }: { onNext?: () => void; onMain?: () => void }) => {
  //버튼을 누르면 비밀번호 재성정 성공 로그인으로 이동
  //그냥 로그인으로 이동

  const handleSubmit = (data: { [key: string]: string }) => console.log("Form Submitted:", data);

  return (
    <DynamicForm
      id="signUp-form"
      className="form__auth"
      fields={formConstant.find}
      handleSubmit={handleSubmit}
      // 글자수 disabled상태
      schema={{
        email: 4,
        password: 6,
        "password-check": 6,
      }}
      cancelClass="find__auth__button cancel m-l-60 flex1"
      cancelTitle="취소"
      onClickCancel={onMain}
      submitClass="find__auth__button flex1 m-r-60"
      submitTitle="다음"
    ></DynamicForm>
  );
};

import { urlConst } from "@/shared/constants";
import { Icon } from "@/shared/components";

export const FindPassWordView = ({ state }: { state: Record<string, any> }) => {
  return (
    //"인증선택" | "이매일아이디보여주기" | "비밀번호재설정"
    <article className="sub-layout__content">
      <section className="section__auth">
        <div className="container__signUp">
          <Linker href="/" className="align_center">
            <Icon src="logo_02" alt="logo" className="logo" />
          </Linker>
          <Heading as="h3" className="title-32 text-center m-t-20 m-b-20">
            계정/비밀번호 찾기
          </Heading>
          {state?.step === "인증선택" && <AuthenticationSelectionStep onNext={state?.handleOauthLogin} />}
          {state?.step === "이매일아이디보여주기" && <ShowEmailIdStep onNext={state.handleOauthLogin} onSignIn={() => state?.navigation.goToPage(`/${urlConst.auth.main}/${urlConst.auth.signIn}`)} />}
          {state?.step === "비밀번호재설정" && <ResetAccountPasswordStep onNext={state.handleResetPassword} onMain={() => state?.navigation.goHome()} />}
        </div>
      </section>
    </article>
  );
};
