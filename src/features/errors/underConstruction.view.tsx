import { usePageNavigation } from "@/shared/lib/hooks";

export const UnderConstructionView = () => {
  const { goHome, goBack } = usePageNavigation();
  return (
    <div className="underConstruction__container">
      <h1 className="underConstruction__title">현재 개발 중입니다!</h1>
      <p className="underConstruction__message">요청하신 페이지는 아직 개발 중입니다. 곧 업데이트될 예정입니다.</p>
      <p className="underConstruction__message">잠시만 기다려 주세요.</p>
      <p className="underConstruction__suggestion">다른 페이지로 이동하려면 아래 링크를 클릭하세요.</p>

      <div className="flex_r gap_8 m-t-20">
        <button className="btn__primary btn_xl fs_20_medium text_wh w160" onClick={goHome}>
          홈으로 이동
        </button>
        <button className="btn__line btn_xl pri fs_20_medium w160" onClick={goBack}>
          이전으로
        </button>
      </div>
    </div>
  );
};
