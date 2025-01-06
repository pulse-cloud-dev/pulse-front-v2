import { Linker } from "@/shared/components";

export const NotFoundView = () => {
  return (
    <div className="notFound__container">
      <h1 className="notFound__title">404</h1>
      <p className="notFound__message">페이지를 찾을 수 없습니다!</p>
      <p className="notFound__suggestion">요청하신 페이지가 존재하지 않거나 삭제되었습니다. 다른 페이지로 이동해보세요.</p>
      <Linker href="/" className="notFound__home-link">
        홈으로 돌아가기
      </Linker>
    </div>
  );
};
