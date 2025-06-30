import type { ViewEventProps } from "@/shared/types";

export interface FilterProps {
  event: ViewEventProps['event'];
  keyword: string;
  setKeyword: (value: string) => void;
  setSearchText: (value: string) => void;
  searchText: string;
  selectedFields: string[];
  selectedRegions: string[];
  onlineStatus: string | null;
  removeField: (field: string) => void;
  removeRegion: (region: string) => void;
  onReset?: () => void;

  sortOption: string;
  setSortOption: (val: string) => void;
}