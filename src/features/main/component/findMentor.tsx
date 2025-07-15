import { usePageNavigation } from "@/shared/lib/hooks";
import { useUser } from "@/shared/lib/hooks";


export const FindMentorSection = () => {

const { isLogin } = useUser();
const { goToPage } = usePageNavigation();

const handleMoveClick = () => {
  if (!isLogin) {
    const goLogin = window.confirm("로그인 후 이용 가능합니다. 로그인하시겠습니까?");
    if (goLogin) {
      goToPage("/auth/signIn");
    }
  } else {

  }
};
  return (
    <section className="mentoring-fit-find-mentor">
      <div className="fit-find-mentor__image">
        <img src="images/main_Image2.png" alt="맞춤 멘토 찾기" />
      </div>
      <div className="fit-find-mentor__text">
        <h2>나에게 딱 맞는 멘토링,<br />맞춤 멘토 찾기</h2>
        <p>원하는 분야, 시간을 정하고<br />받고 싶은 멘토링 주제를 작성하여<br />멘토에게 제안해 보세요!</p>
        <button className="fit-find-mentor__btn" onClick={handleMoveClick}>자세히 보기 →</button>
      </div>
    </section>
  );
};
