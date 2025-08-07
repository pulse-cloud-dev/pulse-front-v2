import { categoryApis } from "@/networks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CheckedItemData } from "@/shared/components/widgets/popups";
const PAGE_SIZE = 20;

interface UseMentoringListQueryParams {
  selectedFields: CheckedItemData[];
  selectedRegions: CheckedItemData[];
  onlineStatus: "ONLINE" | "OFFLINE" | null;
  sortOption: string;
  searchText: string;
  offset?: number;
}

export const useMentoringListQuery = ({ selectedFields, selectedRegions, onlineStatus, sortOption, searchText, offset = 1 }: UseMentoringListQueryParams) => {
  const getSortType = (option: string) => ({ 인기순: "POPULAR", 기본순: "DEFAULT", 최신순: "LATEST" }[option] ?? "DEFAULT");

  const params = {
    ...(selectedFields.length > 0 && {
      field: selectedFields.map((item) => item.code).join(","),
    }),
    ...(selectedRegions.length > 0 && {
      region: selectedRegions.map((item) => item.code).join(","),
    }),
    ...(onlineStatus && {
      lecture_type: onlineStatus,
    }),
    sort_type: getSortType(sortOption),
    ...(searchText.trim() && {
      search_text: searchText.trim(),
    }),
    page: offset,
    size: PAGE_SIZE,
  };

  return useSuspenseQuery({
    queryKey: ["mentoring", "list", selectedFields, selectedRegions, onlineStatus, sortOption, searchText, offset],
    queryFn: () => categoryApis.getMentoringList(params),
    staleTime: 1000 * 60,
  });
};
