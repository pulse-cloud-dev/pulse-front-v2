import { FilterBar } from "../filters/filterBar";
import { Typography } from "@/shared/components/atoms";
import { SortDropdown } from "@/shared/components/widgets/sortDropdown/SortDropdown";
import { MentorCard } from "@/shared/components/blocks";
import { PageNation } from "@/shared/components/widgets";
import { FilterProps } from "../type/filterProps";

import { usePageNationController } from "@/shared/components/widgets";
import { useMentoringListQuery } from "../hooks/useMentoringListQuery";

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
}: FilterProps & { sortOption: string; setSortOption: (val: string) => void }) => {
  const { offset } = usePageNationController("offset");
  
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

const mentorings = data?.contents ?? [];

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
          총 {mentorings.length}개
        </Typography>
        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
      </div>

      <section className="flex__box m-t-10" aria-labelledby="멘토링 카드 리스트 영역">
        {isFetching && mentorings.length === 0 ? (
          <Typography>로딩 중...</Typography>
        ) : error ? (
          <Typography>에러가 발생했습니다.</Typography>
        ) : mentorings.length === 0 ? (
          <Typography>결과가 없습니다.</Typography>
        ) : (
          mentorings.map((item) => (
            <MentorCard key={item.mentoring_id} {...item} />
          ))
        )}
      </section>

      <PageNation queryStringKey="offset" pages={data?.total_pages ?? 1} />
     
    </>
  );
};