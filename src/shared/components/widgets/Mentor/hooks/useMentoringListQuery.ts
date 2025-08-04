import { useQuery } from "@tanstack/react-query";
import { categoryApis } from "@/networks";

const PAGE_SIZE = 20;

interface UseMentoringListQueryParams {
  selectedFields: string[];
  selectedRegions: string[];
  onlineStatus: string | null;
  sortOption: string;
  searchText: string;
  offset?: number;
}

export const useMentoringListQuery = ({ selectedFields, selectedRegions, onlineStatus, sortOption, searchText, offset = 1 }: UseMentoringListQueryParams) => {
  const getLectureType = (status: string | null) => {
    if (status === "미선택") return undefined;
    if (status === "온라인") return "ONLINE";
    return "OFFLINE";
  };

  const getSortType = (option: string) => {
    switch (option) {
      case "인기순":
        return "POPULAR";
      case "기본순":
      case "최신순":
      default:
        return "LATEST";
    }
  };

  return useQuery({
    queryKey: ["mentoringList", selectedFields, selectedRegions, onlineStatus, sortOption, searchText, offset],
    queryFn: () =>
      categoryApis.getMentoringList({
        field: selectedFields.join(","),
        region: selectedRegions.join(","),
        lecture_type: getLectureType(onlineStatus),
        sort_type: getSortType(sortOption),
        search_text: searchText,
        page: offset,
        size: PAGE_SIZE,
      }),
    staleTime: 1000 * 60,
  });
};
