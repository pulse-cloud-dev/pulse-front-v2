import { useQuery } from "@tanstack/react-query";
import { categoryApis } from "@/networks";

const emptyPlaceholder: MentoringListResponseBody = {
  page: 1,
  size: 20,
  sort: "DESC",
  total_pages: 0,
  total_count: 0,
  contents: [],
};

export const useMentoringListQuery = ({
  selectedFields,
  selectedRegions,
  onlineStatus,
  sortOption,
  searchText,
}: {
  selectedFields: string[];
  selectedRegions: string[];
  onlineStatus: string | null;
  sortOption: string;
  searchText: string;
}) => {
  return useQuery({
    queryKey: [
      "mentoringList",
      selectedFields,
      selectedRegions,
      onlineStatus,
      sortOption,
      searchText,
    ],
    queryFn: () =>
      categoryApis.getMentoringList({
        field: selectedFields.join(","),
        region: selectedRegions.join(","),
        lecture_type:
          onlineStatus === "전체"
            ? undefined
            : onlineStatus === "온라인"
            ? "ONLINE"
            : "OFFLINE",
        sort_type:
          sortOption === "기본순"
            ? "LATEST"
            : sortOption === "인기순"
            ? "POPULAR"
            : "LATEST",
        search_text: searchText,
        page: 1,
        size: 20,
      })
      .then((res) => res),
    staleTime: 1000 * 60, // 1분 동안 캐시 유지
     placeholderData: (prev) => prev ?? emptyPlaceholder,
  });
};
