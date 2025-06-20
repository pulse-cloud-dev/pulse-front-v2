import { useState } from "react";
import { getSearchParams } from "@/shared/lib";
import { PageNation } from "@/shared/components/widgets";
import { ResetSelection } from "@/shared/components/atoms/reset/resetSelection";
import { SortDropdown } from "@/shared/components/widgets/sortDropdown/SortDropdown";

import {
  Map,
  MentorCard,
  PageTabs,
  PopupSearch,
  BaseDrawer,
} from "@/shared/components/blocks";
import { Typography, Icon } from "@/shared/components/atoms";
import { DeleteIcon } from "@/shared/components/atoms/deletes/delete";
import { TabConst } from "@/shared/constants";
import type { ViewEventProps } from "@/shared/types";

interface FilterProps {
  event: ViewEventProps['event'];
  keyword: string;
  setKeyword: (value: string) => void;
  setSearchText: (value: string) => void;
  searchText: string;
  selectedFields: string[];
  selectedRegions: string[];
  onlineStatus: string | null;
  removeField: (field: string) => void;
  removeRegion: (region: string) => void;
  onReset?: () => void;
}

const FilterBar = ({ 
  event, keyword, setKeyword, setSearchText,
  selectedFields, selectedRegions, onlineStatus,
  removeField, removeRegion, onReset, 
}: FilterProps) => (
  <>
    <div className="flex_r gap_6 m-t-30">
      <PopupSearch title="분야" openPopup={event?.openFirstModal} count={selectedFields.length} />
      <PopupSearch title="온/오프라인" openPopup={event?.openSecondModal} />
      {onlineStatus !== "온라인" && (
        <PopupSearch title="지역" openPopup={event?.openThirdModal} count={selectedRegions.length} />
      )}
      <div className="btn-search">
        <input 
          placeholder="검색" 
          value={keyword} 
          onChange={e => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchText(keyword);
            }
          }
          } />
        <button onClick={() => setSearchText(keyword)}>
          <Icon src="search_18" alt="검색 아이콘" />
        </button>
      </div>
    </div>

    <div className="selected-filters flex gap-2 flex-wrap m-t-16">
      {(selectedFields.length > 0 || selectedRegions.length > 0) && (
        <ResetSelection className="m-l-5" onClick={onReset} label="초기화" />
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

const MentorViewMap = (props: FilterProps & { sortOption: string; setSortOption: (val: string) => void }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  return (
    <section className="m-t-30" style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ background: "lightgray", height: "750px", borderRadius: "18px", border: "1px solid #e0e0e0" }}>
        <Map />
      </div>
      <div style={{ position: "absolute", top: "16px", left: "16px" }}>
        <FilterBar {...props} />
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

const MentorViewPosts = (props: FilterProps & { sortOption: string; setSortOption: (val: string) => void }) => {
  const { sortOption, setSortOption } = props;
  const cards = Array.from({ length: 10 });

  return (
    <>
      <FilterBar {...props} />
      <div className="card-count">
        <Typography variant="body" size="16" weight="semi-bold">
          총 {cards.length}개
        </Typography>
        <SortDropdown sortOption={sortOption} setSortOption={(val) => {
    setSortOption(val);
  }} />
      </div>
      <section className="flex__box m-t-10">
        {cards.map((_, index) => (
          <MentorCard key={index} />
        ))}
      </section>
      <section className="m-t-72 m-b-70">
        <PageNation queryStringKey="offset" pages={10} />
      </section>
    </>
  );
};

export const MentorView = (props: ViewEventProps & { state: any; actions: any }) => {
  const menu = getSearchParams("menu") || "posts";
  const { keyword, selectedFields, selectedRegions, onlineStatus, sortOption, searchText } = props.state;
  const { setKeyword, removeField, removeRegion, resetFilters, setSortOption, setSearchText } = props.actions;

  const commonProps = {
    event: props.event,
    keyword,
    setKeyword,
    selectedFields,
    selectedRegions,
    onlineStatus,
    removeField,
    removeRegion,
    onReset: resetFilters,
    sortOption,
    setSortOption,
    searchText,
    setSearchText
  };

  return (
    <article className="sub-layout__content">
      <header>
        <Typography variant="title" size="24" weight="bold">
          멘티 모집
        </Typography>
      </header>
      <section className="m-t-30">
        <PageTabs tabList={TabConst.MENTOR_PAGE} />
      </section>
      {menu === "posts" && <MentorViewPosts {...commonProps} />}
      {menu === "map" && <MentorViewMap {...commonProps} />}
    </article>
  );
};
