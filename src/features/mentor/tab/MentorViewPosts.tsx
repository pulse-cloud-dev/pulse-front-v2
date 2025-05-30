import type { ViewEventProps } from "@/shared/types";
import { PageNation } from "@/shared/components/widgets";
import { MentorCard, PopupSearch, } from "@/shared/components/blocks";

import { FieldPopupSearch, LearningTypePopup, RegionPopup } from "../popupSearch";


/** 
 * 사용 예
 * const myEvents = {
  onClick: (param) => console.log("Clicked!", param),
  onChange: (param) => console.log("Changed!", param),
};
<ViewComponent event={myEvents} />
 */


// 모집글 탭
export const MentorViewPosts = (props: ViewEventProps) => {
  const { event } = props;
  return (
    <>
      <section className="m-t-30 flex_r gap_6">
        <FieldPopupSearch title="분야" openPopup={event?.openFirstModal} />
        <LearningTypePopup title="온/오프라인" openPopup={event?.openSecondModal} />
        <RegionPopup title="지역" openPopup={event?.openThirdModal} />
      </section>

      <section className="flex__box m-t-30">
        {Array.from({ length: 30 }).map((_, index) => (
          <MentorCard key={index} />
        ))}
      </section>

      <section className="m-t-72 m-b-70">
        <PageNation queryStringKey={"offset"} pages={11} />
      </section>
    </>
  );
};