import type { ViewEventProps } from "@/shared/types";
import { CheckedItemData } from "../../popups";
export interface FilterProps {
  event: ViewEventProps["event"];
  keyword: string;
  setKeyword: (value: string) => void;
  setSearchText: (value: string) => void;
  searchText: string;
  selectedFields: CheckedItemData[];
  selectedRegions: CheckedItemData[];
  onlineStatus: "ONLINE" | "OFFLINE" | null;
  removeField: (field: string) => void;
  removeRegion: (region: string) => void;
  onReset?: () => void;

  sortOption: string;
  setSortOption: (val: string) => void;
}
