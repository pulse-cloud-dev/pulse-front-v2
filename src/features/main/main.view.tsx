import { MainHeader } from "./component/header";
import { MainCardList } from "./component/card";
import { FindMentorSection } from "./component/findMentor";
import { usePageNavigation } from "@/shared/lib/hooks";

import { Icon } from "@/shared/components";

export const MainView = () =>  {

  const  {goToPage } = usePageNavigation();

  const handleClick = () => {
    goToPage("/mentee-find");
  }

  return (
     <>
    <main className="main-container">

      {/* 상단 */}
      <MainHeader />
     
      {/* 인기 멘토링 카드 리스트 */}
      <section className="mentoringcard-section">
        <div className="mentoringcard-header">
            <h2 className="mentoringcard-title">관심 집중! 멘티 모집</h2>
            <button className="mentoringcard-view-all-button" onClick={handleClick}>
                전체보기 <Icon src={"chevron_right"} alt="모집글 전체보기"/>
            </button>
        </div>

        {/* 나중에 API 연동해서 카드 8개 노출 */}
        <MainCardList />
        </section>

      {/* 맞춤 멘토 찾기 */}
      <section className="mentoringfit-section">
        <h2 className="mentoringfit-title">맞춤형 멘토를 찾고 싶어요!</h2>
        <FindMentorSection />
      </section>
    
    </main>
    </>
  );
};
