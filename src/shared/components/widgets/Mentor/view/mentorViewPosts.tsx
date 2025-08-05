import { Suspense } from "react";
import { useMentoringListQuery } from "../hooks/useMentoringListQuery";
import { FilterBar } from "../filters/filterBar";
import { Typography } from "@/shared/components/atoms";
import { SortDropdown } from "@/shared/components/widgets/sortDropdown/SortDropdown";
import { MentorCard } from "@/shared/components/blocks";
import { PageNation } from "@/shared/components/widgets";
import { FilterProps } from "../type/filterProps";
import ErrorBoundary from "@/shared/components/blocks/errorboundary/errorBoundary";
import { FallbackMentoringList } from "@/shared/components/widgets/Mentor/view/fallbackMentoringList";

interface Mentoring {
  mentoring_id: string;
  title: string;
  mentor_nickname: string;
  deadline_time: string;
  mentor_job: { jobCode: string };
  mentor_career_total_year: number;
  mentor_profile_image: string;
  lecture_type: "ONLINE" | "OFFLINE";
  online_platform: string;
  region: string;
}

interface MentorViewPostsProps extends FilterProps {
  sortOption: string;
  setSortOption: (val: string) => void;
  offset: number;
  setOffset: (val: number) => void;
}

// 멘토링 카드 리스트 컴포넌트 (Suspense 내부)
const MentoringCardList = ({
  selectedFields,
  selectedRegions,
  onlineStatus,
  sortOption,
  searchText,
  offset,
}: {
  selectedFields: string[];
  selectedRegions: string[];
  onlineStatus: string | null;
  sortOption: string;
  searchText: string;
  offset: number;
}) => {
  const {
    data: { contents: mentorings },
  } = useMentoringListQuery({
    selectedFields,
    selectedRegions,
    onlineStatus,
    sortOption,
    searchText,
    offset,
  });

  const isDataEmpty = mentorings.length === 0;

  if (isDataEmpty) {
    return <Typography>결과가 없습니다.</Typography>;
  }

  return (
    <>
      {mentorings.map((item: Mentoring) => (
        <MentorCard
          key={item.mentoring_id}
          mentoringId={item.mentoring_id}
          lectureType={item.lecture_type}
          onlinePlatform={item.online_platform}
          title={item.title}
          mentorNickname={item.mentor_nickname}
          deadlineDate={item.deadline_time}
          mentorJob={item.mentor_job.jobCode}
          mentorCareer={item.mentor_career_total_year}
          region={item.region}
          mentorProfileImage={item.mentor_profile_image}
        />
      ))}
    </>
  );
};

// 카드 개수 컴포넌트 (Suspense 내부)
const CardCount = ({ selectedFields, selectedRegions, onlineStatus, sortOption, searchText, offset }: { selectedFields: string[]; selectedRegions: string[]; onlineStatus: string | null; sortOption: string; searchText: string; offset: number }) => {
  const { data } = useMentoringListQuery({
    selectedFields,
    selectedRegions,
    onlineStatus,
    sortOption,
    searchText,
    offset,
  });
  return (
    <Typography variant="body" size="16" weight="semi-bold">
      총 {data?.total_count ?? 0}개
    </Typography>
  );
};

export const MentorViewPosts = ({ event, keyword, setKeyword, setSearchText, removeField, removeRegion, selectedFields, selectedRegions, onlineStatus, sortOption, setSortOption, searchText, offset, setOffset, onReset }: MentorViewPostsProps) => {
  return (
    <div style={{ marginBottom: "60px" }}>
      <FilterBar
        event={event}
        keyword={keyword}
        setKeyword={setKeyword}
        setSearchText={setSearchText}
        removeField={removeField}
        removeRegion={removeRegion}
        selectedFields={selectedFields}
        selectedRegions={selectedRegions}
        onlineStatus={onlineStatus}
        searchText={searchText}
        sortOption={sortOption}
        setSortOption={setSortOption}
        onReset={onReset}
      />
      <div className="card-count" role="region" aria-label="멘토 개수 및 정렬 옵션">
        <ErrorBoundary fallback={<Typography>데이터를 불러오는 중 오류가 발생했습니다.</Typography>}>
          <Suspense fallback={<Typography>카드 개수를 불러오는 중...</Typography>}>
            <CardCount selectedFields={selectedFields} selectedRegions={selectedRegions} onlineStatus={onlineStatus} sortOption={sortOption} searchText={searchText} offset={offset} />
          </Suspense>
        </ErrorBoundary>
        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
      </div>

      <section className="flex__box m-t-10 m-b-30" aria-labelledby="멘토링 카드 리스트 영역" style={{ height: "1524px" }}>
        <ErrorBoundary fallback={<FallbackMentoringList />}>
          <Suspense fallback={<Typography>로딩 중...</Typography>}>
            <MentoringCardList selectedFields={selectedFields} selectedRegions={selectedRegions} onlineStatus={onlineStatus} sortOption={sortOption} searchText={searchText} offset={offset} />
          </Suspense>
        </ErrorBoundary>
      </section>
      <PageNation offset={offset} setOffset={setOffset} pages={10} />
    </div>
  );
};
