import { useLocalStorage } from "@/shared/modules";


export const useMentorFilters = () => {
  const [selectedFields, setSelectedFields] = useLocalStorage<string[]>("selectedFields", []);
  const [selectedRegions, setSelectedRegions] = useLocalStorage<string[]>("selectedRegions", []);
  const [onlineStatus, setOnlineStatus] = useLocalStorage<string>("onlineStatus", "전체");
  const [isOnlineOnly, setIsOnlineOnly] = useLocalStorage<boolean>("isOnlineOnly", false);
  const [fieldCheckedItems, setFieldCheckedItems] = useLocalStorage<Record<string, boolean>>("fieldCheckedItems", {});
  const [regionCheckedItems, setRegionCheckedItems] = useLocalStorage<Record<string, boolean>>("regionCheckedItems", {});

  const reset = () => {
    setSelectedFields([]);
    setSelectedRegions([]);
    setOnlineStatus("전체");
    setIsOnlineOnly(false);
    setFieldCheckedItems({});
    setRegionCheckedItems({});
  };

  return {
    selectedFields, setSelectedFields,
    selectedRegions, setSelectedRegions,
    onlineStatus, setOnlineStatus,
    isOnlineOnly, setIsOnlineOnly,
    fieldCheckedItems, setFieldCheckedItems,
    regionCheckedItems, setRegionCheckedItems,
    reset,
  };
};
