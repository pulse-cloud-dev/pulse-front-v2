import { useLocation } from "react-router-dom";
import { useState } from "react";
import { getSearchParams } from "@/shared/lib";
import { PageNation } from "@/shared/components/widgets";
import { ResetSelection } from "@/shared/components/atoms/reset/resetSelection";
import { SortDropdown } from "@/shared/components/widgets/sortDropdown/SortDropdown";

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
import { DeleteIcon } from "@/shared/components/atoms/deletes/delete";
import { fi } from "zod/v4/locales";


interface FilterProps {
  event: ViewEventProps['event'];
  keyword: string;
  setKeyword: (value: string) => void;
  selectedFields: string[];
  selectedRegions: string[];
  onlineStatus: string | null;
  removeField: (field: string) => void;
  removeRegion: (region: string) => void;
  onReset?: () => void;
}

// 검색 + 필터
const FilterBar = ({ 
  event,
  keyword,
  setKeyword,
  selectedFields,
  selectedRegions,
  onlineStatus,
  removeField,
  removeRegion,
  onReset
 } : FilterProps) => {


  return (
  <>
    <div className="flex_r gap_6 m-t-30">
      <PopupSearch title="분야" openPopup={event?.openFirstModal} count={selectedFields.length} />
      <PopupSearch title="온/오프라인" openPopup={event?.openSecondModal} />

      {onlineStatus !== "온라인" && (
        <PopupSearch title="지역" openPopup={event?.openThirdModal} count={selectedRegions.length} />
      )}
      
      <div className="btn-search">
        <input placeholder="검색" />
        <button><Icon src="search_18" alt="검색 아이콘" /></button>
      </div>
    </div>


    {/* 선택된 필터 표시 영역 */}
    <div className="selected-filters flex gap-2 flex-wrap m-t-16 " >
      {(selectedFields.length > 0 || selectedRegions.length > 0) && (
        <ResetSelection className="m-l-5" onClick={onReset} label="초기화"  />
      )}
      {selectedFields.map((field, idx) => (
        <span key={idx} className="tag">
          {field}
          <DeleteIcon size={12} color="#9E9E9E" className="m-l-4" onClick={() => removeField(field)} />
        </span>
      ))}
      {selectedRegions.map((region, idx) => (
        <span key={idx} className="tag">
          {region}
          <DeleteIcon size={12} color="#9E9E9E" className="m-l-4" onClick={() => removeRegion(region)} />
        </span>
      ))}
    </div>
  </>
);
 };

// 지도 탭
const MentorViewMap = ({ 
  event,
  keyword,
  setKeyword,
  selectedFields,
  selectedRegions,
  onlineStatus,
  removeField,
  removeRegion,
  onReset,
  sortOption,
  setSortOption,
 } : FilterProps& { sortOption: string; setSortOption: (val: string) => void }) => {
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
        <FilterBar 
        event={event}
        keyword={keyword}
        setKeyword={setKeyword}
        selectedFields={selectedFields}
        selectedRegions={selectedRegions}
        removeField={removeField}
        removeRegion={removeRegion}
        onlineStatus={onlineStatus}
        onReset={onReset}
        />
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
const MentorViewPosts = ({ 
  event,
  keyword,
  setKeyword,
  selectedFields,
  selectedRegions,
  onlineStatus,
  removeField,
  removeRegion,
  onReset,
  sortOption,
  setSortOption,
 } : FilterProps& { sortOption: string; setSortOption: (val: string) => void }) => {

const cards = Array.from({ length: 30 }); //임시
  return (
    <>
      <FilterBar event={event}
        keyword={keyword}
        setKeyword={setKeyword}
        selectedFields={selectedFields}
        selectedRegions={selectedRegions}
        onlineStatus={onlineStatus} 
        removeField={removeField}
        removeRegion={removeRegion}
        onReset={onReset}
  />

      {/* 총 개수 + 정렬 옵션 표시 */}
      <div className="card-count">
        <Typography variant="body" size="16" weight="semi-bold">
          총 {cards.length}개
        </Typography>

        <SortDropdown 
          sortOption={sortOption} 
          setSortOption={setSortOption}
          />
      </div>

      <section className="flex__box m-t-10">
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

  
  // state값
const {
  keyword,
  selectedFields,
  selectedRegions,
  onlineStatus,
  
} = props.state;

// actions값
const {
  setKeyword,
  removeField,
  removeRegion,
  resetFilters
} = props.actions;

 const [sortOption, setSortOption] = useState("기본순");

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
        <MentorViewPosts 
        event={props.event}
        keyword={keyword}
        setKeyword={setKeyword}
        selectedFields={selectedFields}
        selectedRegions={selectedRegions}
        onlineStatus={onlineStatus}
        removeField={removeField}
        removeRegion={removeRegion}
        onReset={resetFilters}
        sortOption={sortOption}
        setSortOption={setSortOption}
        />
      )}
      {menu === "map" && (
        <MentorViewMap 
        event={props.event}
        keyword={keyword}
        setKeyword={setKeyword}
        selectedFields={selectedFields}
        selectedRegions={selectedRegions}
        onlineStatus={onlineStatus}
        removeField={removeField}
        removeRegion={removeRegion}
        onReset={resetFilters}
        sortOption={sortOption}
      setSortOption={setSortOption}
        />
      )}
    </article>
  );
};


