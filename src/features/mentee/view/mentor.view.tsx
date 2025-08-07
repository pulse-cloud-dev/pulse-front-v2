import { PageTabs } from "@/shared/components/blocks";
import { Typography } from "@/shared/components/atoms";
import { useLocation } from "react-router-dom";
import type { ViewEventProps } from "@/shared/types";

import { MentorViewMap } from "@/shared/components/widgets/Mentor/view/mentorViewMap";
import { MentorViewPosts } from "@/shared/components/widgets/Mentor/view/mentorViewPosts";

export const MenteeView = (props: ViewEventProps & { state: any; actions: any }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const menu = params.get("menu") || "posts";
  const { keyword, fieldCheckedItems, onlineStatus, sortOption, searchText, offset, regionCheckedItems } = props.state;
  const { setKeyword, removeField, removeRegion, resetFilters, setSortOption, setSearchText, setOffset } = props.actions;

  const commonProps = {
    event: props.event,
    keyword,
    setKeyword,
    regionCheckedItems,
    onlineStatus: onlineStatus,
    removeField,
    removeRegion,
    onReset: resetFilters,
    sortOption,
    setSortOption,
    searchText,
    setSearchText,
    fieldCheckedItems,
  };
  console.log("selectedregions view", commonProps.onlineStatus);
  return (
    <article className="sub-layout__content">
      <header>
        <Typography variant="title" size="24" weight="bold">
          멘티 모집
        </Typography>
      </header>
      <section className="m-t-30">
        <PageTabs
          tabList={[
            { id: "posts", display: "모집글" },
            { id: "map", display: "지도" },
          ]}
        />
      </section>
      {menu === "posts" && <MentorViewPosts {...commonProps} selectedFields={fieldCheckedItems} onlineStatus={onlineStatus} selectedRegions={regionCheckedItems} offset={offset} setOffset={setOffset} />}
      {menu === "map" && <MentorViewMap {...commonProps} selectedRegions={regionCheckedItems} selectedFields={fieldCheckedItems} />}
    </article>
  );
};
