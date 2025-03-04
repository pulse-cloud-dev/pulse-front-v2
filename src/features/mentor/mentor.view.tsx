import type { ViewEventProps } from "@/shared/types";
import { getSearchParams } from "@/shared/lib";
import { PageNation } from "@/shared/components/widgets";
import { Breadcrumb, MentorCard, PageTabs, PopupSearch } from "@/shared/components/blocks";
import { Heading } from "@/shared/components/atoms";

// 지도 탭
const MentorViewMap = () => {
  return <>지도</>;
};

// 모집글 탭
const MentorViewPosts = () => {
  return (
    <>
      <section className="flex__box m-t-30">
        {Array.from({ length: 30 }).map((_, index) => (
          <MentorCard />
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
  const { event } = props;

  return (
    <article className="sub-layout__content">
      <header className="m-t-30">
        <Heading as={"h3"}>멘티모집</Heading>
      </header>
      <Breadcrumb
        items={[
          { title: "멘토링", href: "mentor" },
          { title: "멘토링1", href: "mentor/123" },
        ]}
      />

      <section className="m-t-30">
        {/* Tab Navigation */}
        <PageTabs
          tabList={[
            { id: "posts", display: "모집글" },
            { id: "map", display: "지도" },
          ]}
        />
      </section>

      <section className="m-t-30 flex_r gap_6">
        <PopupSearch title="분야" openPopup={event?.openFirstModal} />
        <PopupSearch title="온/오프라인" openPopup={event?.openSecondModal} />
        <PopupSearch title="지역" openPopup={event?.openThirdModal} />
      </section>

      {(getSearchParams("menu") === "posts" || getSearchParams("menu") === "") && <MentorViewPosts />}
      {getSearchParams("menu") === "map" && <MentorViewMap />}
    </article>
  );
};
