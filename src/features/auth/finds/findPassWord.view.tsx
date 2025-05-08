//step1
const AuthenticationSelectionStep = ({ onNext }: { onNext?: () => void; onMain?: () => void }) => {
  return (
    <div>
      <h3>인증선택</h3>
      <button onClick={onNext}>본인인증하기</button>
    </div>
  );
};

//step2
const ShowEmailIdStep = ({ onNext, onPrev }: { onNext?: () => void; onPrev?: () => void }) => {
  return (
    <div>
      <h3>이매일아이디보여주기</h3>
      <button onClick={onNext}>비밀번호 재설정</button>
      <button onClick={onPrev}>로그인으로 이동</button>
    </div>
  );
};

//step3
const ResetAccountPasswordStep = ({ onNext, onPrev }: { onNext?: () => void; onPrev?: () => void }) => {
  //버튼을 누르면 비밀번호 재성정 성공 로그인으로 이동
  //그냥 로그인으로 이동
  console.log("${urlConst.home.main}", urlConst.home.main);
  return (
    <div>
      <h3>비밀번호 재설정</h3>
      <p>이메일 인증을 통해 비밀번호를 재설정합니다.</p>
      <button onClick={onNext}>메인으로 이동</button>
      <button onClick={onPrev}>집으로 이동</button>
    </div>
  );
};
import { urlConst } from "@/shared/constants";
export const FindPassWordView = ({ state }: { state: Record<string, any> }) => {
  return (
    //"인증선택" | "이매일아이디보여주기" | "비밀번호재설정"
    <div>
      {state?.step === "인증선택" && (
        <AuthenticationSelectionStep
          onNext={() => state?.setStep("이매일아이디보여주기")} // 인증선택
        />
      )}
      {state?.step === "이매일아이디보여주기" && (
        <ShowEmailIdStep
          onNext={() => state?.setStep("비밀번호재설정")} //이메일 보여주기
          onPrev={() => state?.navigation.goToPage(`/${urlConst.auth.main}/${urlConst.auth.signIn}`)} //로그인으로 돌아가기
        />
      )}
      {state?.step === "비밀번호재설정" && (
        <ResetAccountPasswordStep
          onNext={() => alert("비밀번호 재설정에 성공하였습니다.")} // 비밀번호 재설정 성공 + 로그인으로 이동
          onPrev={() => state?.navigation.goHome()} // 메인으로 돌아가기
        />
      )}
    </div>
  );
};
