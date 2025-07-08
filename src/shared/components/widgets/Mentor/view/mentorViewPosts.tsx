import { useMentoringListQuery } from "../hooks/useMentoringListQuery";
import { FilterBar } from "../filters/filterBar";
import { Typography } from "@/shared/components/atoms";
import { SortDropdown } from "@/shared/components/widgets/sortDropdown/SortDropdown";
import { MentorCard } from "@/shared/components/blocks";
import { PageNation } from "@/shared/components/widgets";
import { FilterProps } from "../type/filterProps";

// import { Suspense } from "react";
// import ErrorBoundary from "@/shared/components/blocks/errorboundary/errorBoundary";
// import { FallbackMentoringList } from "@/shared/components/widgets/Mentor/view/fallbackMentoringList";

interface MentorViewPostsProps extends FilterProps {
  sortOption: string;
  setSortOption: (val: string) => void;
  offset: number;
  setOffset: (val: number) => void;
}

export const MentorViewPosts = ({
  event,
  keyword,
  setKeyword,
  setSearchText,
  removeField,
  removeRegion,
  selectedFields,
  selectedRegions,
  onlineStatus,
  sortOption,
  setSortOption,
  searchText,
  offset,
  setOffset,
}: MentorViewPostsProps) => {
  const {
    data,
    isFetching,
    error,
  } = useMentoringListQuery({
    selectedFields,
    selectedRegions,
    onlineStatus,
    sortOption,
    searchText,
    offset,
  });
  
  //더미데이터
   const dummyData = [
  {
    mentoring_id: "1",
    title: "React로 배우는 프론트엔드 입문 React로 배우는 프론트엔드 입문 React로 배우는 프론트엔드 입문",
    mentor_nickname: "코딩은재밌어",
    deadline_time: "2025-08-01",
    mentor_job: { jobCode: "프론트엔드 개발자" },
    mentor_profile_image: null,
    lecture_type: "OFFLINE",
  },
  {
    mentoring_id: "2",
    title: " 백엔드 개발 로드맵",
    mentor_nickname: "백엔드장인",
    deadline_time: "2025-08-15",
    mentor_job: { jobCode: "백엔드 개발자" },
    mentor_profile_image: null,
    lecture_type: "ONLINE",
  },
];


const mentorings =
  !data || data.contents.length === 0 ? dummyData : data.contents;

  // const mentorings = data?.contents ?? [];
  // const totalPages = data?.total_pages ?? 1;
  // const isDataEmpty = mentorings.length === 0;
  // const mentorings = data?.contents ?? [];
  const totalPages = data?.total_pages ?? 1;
  const isDataEmpty = mentorings.length === 0;

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = (e.target as HTMLElement).closest("[data-index]");
  if (!card) return;

  const index = card.getAttribute("data-index");
  console.log("클릭된 카드 인덱스:", index);
};



return (
    <>
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
      />

      <div className="card-count" role="region" aria-label="멘토 개수 및 정렬 옵션">
        <Typography variant="body" size="16" weight="semi-bold">
          총 {data?.total_count ?? 0}개
        </Typography>
        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
      </div>

      <section className="flex__box m-t-10" aria-labelledby="멘토링 카드 리스트 영역">
        {isFetching && isDataEmpty ? (
          <Typography>로딩 중...</Typography>
        ) : error ? (
          <Typography>에러가 발생했습니다.</Typography>
        ) : isDataEmpty ? (
          <Typography>결과가 없습니다.</Typography>
        ) : (
          mentorings.map((item) => (
          <MentorCard
            mentoringId={item.mentoring_id}
            onlineStatus={item.lecture_type === "ONLINE" ? "온라인" : "오프라인"}
            title={item.title}
            mentorNickname={item.mentor_nickname}
            deadlineDate={item.deadline_time}
            mentorJob={item.mentor_job.jobCode}
            mentorProfileImage={item.mentor_profile_image}
          /> 
    ))
              
        )}
      </section>

      <PageNation offset={offset} setOffset={setOffset} pages={totalPages} />
    </>
  );
};
