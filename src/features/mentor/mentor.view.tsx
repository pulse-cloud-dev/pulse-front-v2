import { useLocation } from "react-router-dom";
import { useState } from "react";
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
import { Typography } from "@/shared/components/atoms";
import { TabConst } from "@/shared/constants";
import type { ViewEventProps } from "@/shared/types";
import { Icon } from "@/shared/components";


interface FilterProps {
  event: ViewEventProps['event'];
  keyword: string;
  setKeyword: (value: string) => void;
}

// 검색 + 필터
const FilterBar = ({ event, keyword, setKeyword } : FilterProps) => (
  <div className="flex_r gap_6 m-t-30">
    <PopupSearch title="분야" openPopup={event?.openFirstModal} />
    <PopupSearch title="온/오프라인" openPopup={event?.openSecondModal} />
    <PopupSearch title="지역" openPopup={event?.openThirdModal} />

    <div className="btn-search">
    <input
      type="text"
      // className="flex-1 bg-transparent text-sm outline-none border-none"
      placeholder="검색"
    />
    <button>
      <Icon src="search_18" alt="검색 아이콘" />
    </button>
    </div>
  </div>
);

// 지도 탭
const MentorViewMap = ({ event, keyword, setKeyword } : FilterProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  return (
    <section className="m-t-30" style={{ position: "relative", overflow: "hidden" }}>
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

      <div style={{ position: "absolute", top: "16px", left: "16px" }}>
        <FilterBar event={event} keyword={keyword} setKeyword={setKeyword} />
      </div>

      <BaseDrawer isOpen={isDrawerOpen} onToggle={() => setIsDrawerOpen(!isDrawerOpen)}>
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
const MentorViewPosts = ({ event, keyword, setKeyword } : FilterProps) => {
  return (
    <>
      <FilterBar event={event} keyword={keyword} setKeyword={setKeyword} />

      <section className="flex__box m-t-30">
        {Array.from({ length: 30 }).map((_, index) => (
          <MentorCard key={index} />
        ))}
      </section>

      <section className="m-t-72 m-b-70">
        <PageNation queryStringKey="offset" pages={10} />
      </section>
    </>
  );
};

// 메인 뷰
export const MentorView = (props: ViewEventProps & { state: any; actions: any }) => {
  const menu = getSearchParams("menu") || "posts";
  const { keyword } = props.state;
  const { setKeyword } = props.actions;

  return (
    <article className="sub-layout__content">
      <header>
        <Typography variant="title" size="24" weight="bold">
          멘티모집
        </Typography>
      </header>

      <section className="m-t-30">
        <PageTabs tabList={TabConst.MENTOR_PAGE} />
      </section>

      {menu === "posts" && (
        <MentorViewPosts event={props.event} keyword={keyword} setKeyword={setKeyword} />
      )}
      {menu === "map" && (
        <MentorViewMap event={props.event} keyword={keyword} setKeyword={setKeyword} />
      )}
    </article>
  );
};


