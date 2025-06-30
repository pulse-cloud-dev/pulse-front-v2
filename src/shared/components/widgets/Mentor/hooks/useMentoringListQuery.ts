// import { useQuery } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { categoryApis } from "@/networks";


export const useMentoringListQuery = ({
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
  return useQuery({
    queryKey: [
      "mentoringList",
      selectedFields,
      selectedRegions,
      onlineStatus,
      sortOption,
      searchText,
      offset,
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
        page: offset,
        size: 40,
      }),
    staleTime: 1000 * 60,
  });
};
