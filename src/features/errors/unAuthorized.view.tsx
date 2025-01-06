import { Linker } from "@/shared/components";

export const UnAuthorizedView = () => {
  return (
    <div className="unauthorized__container">
      <h1 className="unauthorized__title">403</h1>
      <p className="unauthorized__message">접근이 거부되었습니다!</p>
      <p className="unauthorized__suggestion">이 페이지에 접근하려면 로그인해야 합니다. 아래 링크를 통해 로그인 페이지로 이동하세요.</p>
      <Linker href="/auth/signIn" className="unauthorized__login-link">
        로그인 페이지로 이동
      </Linker>
    </div>
  );
};
