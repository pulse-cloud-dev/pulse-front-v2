import { categoryApis } from "@/networks";
import { useSuspenseQuery } from "@tanstack/react-query";

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
  const getLectureType = (status: string | null) => (status === "미선택" ? undefined : status === "온라인" ? "ONLINE" : "OFFLINE");

  const getSortType = (option: string) => ({ 인기순: "POPULAR", 기본순: "DEFAULT", 최신순: "LATEST" }[option] ?? "DEFAULT");

  const params = {
    ...(selectedFields?.length && { field: selectedFields.join(",") }),
    ...(selectedRegions?.length && { region: selectedRegions.join(",") }),
    ...(getLectureType(onlineStatus) && { lecture_type: getLectureType(onlineStatus) }),
    ...(getSortType(sortOption) && { sort_type: getSortType(sortOption) }),
    ...(searchText?.trim() && { search_text: searchText }),
    page: offset,
    size: PAGE_SIZE,
  };

  return useSuspenseQuery({
    queryKey: ["mentoringList", selectedFields, selectedRegions, onlineStatus, sortOption, searchText, offset],
    queryFn: () => categoryApis.getMentoringList(params),
    staleTime: 1000 * 60,
  });
};
