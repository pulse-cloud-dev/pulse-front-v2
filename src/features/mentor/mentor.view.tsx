import type { ViewEventProps } from "@/shared/types";
import { getSearchParams } from "@/shared/lib";
import { PageNation } from "@/shared/components/widgets";
import { Breadcrumb, MentorCard, PageTabs, PopupSearch } from "@/shared/components/blocks";
import { Heading, Typography } from "@/shared/components/atoms";
import { TabConst } from "@/shared/constants";

// 지도 탭
const MentorViewMap = () => {
  return <>지도</>;
};

// 모집글 탭
const MentorViewPosts = (props: ViewEventProps) => {
  const { event } = props;
  return (
    <>
      <section className="m-t-30 flex_r gap_6">
        <PopupSearch title="분야" openPopup={event?.openFirstModal} />
        <PopupSearch title="온/오프라인" openPopup={event?.openSecondModal} />
        <PopupSearch title="지역" openPopup={event?.openThirdModal} />
      </section>

      <section className="flex__box m-t-30">
        {Array.from({ length: 30 }).map((_, index) => (
          <MentorCard key={index} />
        ))}
      </section>

      <section className="m-t-72 m-b-70">
        <PageNation queryStringKey={"offset"} pages={10} />
      </section>
    </>
  );
};

interface MentorViewProps extends ViewEventProps {}

export const MentorView = (props: MentorViewProps) => {
  const menu = getSearchParams("menu") || "posts";

  return (
    <article className="sub-layout__content">
      <header>
        <Typography variant="title" size="24" weight="bold">
          멘티모집
        </Typography>
      </header>

      {/* Tab Navigation */}
      <section className="m-t-30">
        <PageTabs tabList={TabConst.MENTOR_PAGE} />
      </section>
      {/* Tab Navigation */}

      {menu === "posts" && <MentorViewPosts {...props} />}
      {menu === "map" && <MentorViewMap />}
    </article>
  );
};

{
  /* <Breadcrumb
        items={[
          { title: "멘토링", href: "mentor" },
          { title: "멘토링1", href: "mentor/123" },
        ]}
      /> */
}
