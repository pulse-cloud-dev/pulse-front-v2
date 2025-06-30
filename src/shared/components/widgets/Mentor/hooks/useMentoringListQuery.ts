// import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { categoryApis } from "@/networks";
import type { MentoringListResponseBody } from "@/contracts/request/category/mentoring.types";


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
  return useInfiniteQuery({
    queryKey: [
      "mentoringList",
      selectedFields,
      selectedRegions,
      onlineStatus,
      sortOption,
      searchText,
    ],
    queryFn: ({ pageParam = 1 }) =>
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
        page: pageParam,
        size: 40,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      const { page, total_pages } = lastPage;
      return page < total_pages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60,
  });
};
