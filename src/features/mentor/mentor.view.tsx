import { PageTabs } from "@/shared/components/blocks";
import { Typography } from "@/shared/components/atoms";
import { useLocation } from "react-router-dom";
import type { ViewEventProps } from "@/shared/types";
import { useState } from "react";

import { MentorViewMap } from "@/shared/components/widgets/Mentor/view/mentorViewMap";
import { MentorViewPosts } from "@/shared/components/widgets/Mentor/view/mentorViewPosts";

import { Suspense } from "react";
import ErrorBoundary from "@/shared/components/blocks/errorboundary/errorBoundary";
import { FallbackMentoringList } from "@/shared/components/widgets/Mentor/view/fallbackMentoringList";

export const MentorView = (props: ViewEventProps & { state: any; actions: any }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const menu = params.get("menu") || "posts";
  const { keyword, selectedFields, selectedRegions, onlineStatus, sortOption, searchText, offset } = props.state;
  const { setKeyword, removeField, removeRegion, resetFilters, setSortOption, setSearchText, setOffset } = props.actions;

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

  // const [offset, setOffset] = useState(1);

  return (
    <article className="sub-layout__content">
      <header>
        <Typography variant="title" size="24" weight="bold">
          멘티 모집
        </Typography>
      </header>
      <section className="m-t-30">
        <PageTabs tabList={[
          { id: "posts", display: "모집글" },
          { id: "map", display: "지도" },
        ]} />
      </section>
      {menu === "posts" && (
        <ErrorBoundary fallback={<FallbackMentoringList />}>
          <Suspense fallback={<FallbackMentoringList />}>
            <MentorViewPosts {...commonProps} offset={offset} setOffset={setOffset} />
          </Suspense>
        </ErrorBoundary>
        )
      }
      {menu === "map" && <MentorViewMap {...commonProps} />}

    </article>
    
  );
};
