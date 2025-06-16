import type { ViewEventProps } from "@/shared/types";
import { getSearchParams } from "@/shared/lib";
import { PageNation } from "@/shared/components/widgets";
import {
  Breadcrumb,
  MentorCard,
  PageTabs,
  PopupSearch,
  BaseDrawer,
  Map,
} from "@/shared/components/blocks";
import { Heading, Typography } from "@/shared/components/atoms";
import { TabConst } from "@/shared/constants";
import { useState, useEffect, useRef } from "react";
import { QueryObserver } from '@tanstack/react-query';



// 지도 탭
const MentorViewMap = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <section
      className="m-t-30"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          background: "lightgray",
          height: "750px",
          borderRadius: "18px",
          border: "1px solid #e0e0e0",
        }}
      >
        <Map />
      </div>

      <div
        className="flex_r gap_6"
        style={{ position: "absolute", top: "16px", left: "16px" }}
      >
        <PopupSearch title="분야" openPopup={event?.openFirstModal} />
        <PopupSearch title="온/오프라인" openPopup={event?.openSecondModal} />
        <PopupSearch title="지역" openPopup={event?.openThirdModal} />
      </div>

      <BaseDrawer isOpen={isDrawerOpen} onToggle={handleDrawerToggle}>
        <div className="flex_dcol_jbet gap_10">
          {Array.from({ length: 5 }).map((_, index) => (
            <MentorCard key={index} />
          ))}
        </div>
      </BaseDrawer>
    </section>
  );
};

// 모집글 탭
const MentorViewPosts = (props: ViewEventProps) => {
  const { event } = props;
  const [ mentorCards, setMentorCards] = useState<any[]>([]);
  const [ page, setPage ] = useState(1);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ hasMore, setHasMore ] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
    const entry = entries[0];
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchCards();
        }
  },
      { threshold: 1.0 }
      );

      if (observerRef.current) {
        observer.observe(observerRef.current);
      }

      return () => {
        if (observerRef.current) observer.unobserve(observerRef.current);
      };
    
  }, [hasMore, isLoading]);

    
    const fetchCards = () => {
      if (isLoading || !hasMore) return;

      setIsLoading(true);

      //테스트용 데이터
      const newCards = Array.from({ length: 40 }).map((_, i) => ({
        id: String(page * 40 + i), // 문자열로 통일
        title: "제목입니다. 제목은 3줄까지만 보입니다. 제목은 3줄까지만 보입니다. 제목은 3줄까지만 보입니다. 제목은 3줄까지만 보입니다. ",
        type: i % 2 === 0 ? "online" : "offline",
        region: i % 2 === 0 ? undefined : "서울",
      }));

      //시뮬레이션용
      setTimeout(() => {
        setMentorCards((prev) => [...prev, ...newCards]);
        setPage((prev) => prev + 1);
        if(page >= 5) setHasMore(false);
        setIsLoading(false);
      }, 1000); 
    };
    

  return (
    <>
      <section className="m-t-30 flex_r gap_6">
        <PopupSearch title="분야" openPopup={event?.openFirstModal} />
        <PopupSearch title="온/오프라인" openPopup={event?.openSecondModal} />
        <PopupSearch title="지역" openPopup={event?.openThirdModal} />
      </section>

      <section className="flex__box m-t-30">
        {mentorCards.map((card) => (
  <MentorCard
    key={card.id}
    id={card.id}
    title={card.title}
    type={card.type}
    region={card.region}
  />
))}
      </section>

      {isLoading && (
        <div className="m-t-20 text-center">
          <span className="spinner"/>
          <Typography size="14" weight="medium">불러오는 중...</Typography>
        </div>
      )}

      {hasMore && <div ref={observerRef} style = {{ height: 1}} />}

      {/* <section className="m-t-72 m-b-70">
        <PageNation queryStringKey={"offset"} pages={10} />
      </section> */}
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