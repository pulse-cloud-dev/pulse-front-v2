import { useQuery } from "@tanstack/react-query";
import { categoryApis } from "@/networks/apis/category.api";

export const useCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: categoryApis.regionItems,
    staleTime: 1000 * 60 * 10, // 10분
    placeholderData: [],
  });
};

export const useDistricts = (cityCode: string | undefined, cityName: string | undefined) => {
  return useQuery({
    queryKey: ["districts", cityCode],
    queryFn: async () => {
      const res = await categoryApis.subRegions(cityCode!);
      if (res.length === 0) {
        if (cityName === "세종") return [{ name: "전체", code: "SEJONG-전체" }];
        if (cityName === "전국") return [{ name: "전국", code: "ALL-전국" }];
        return [];
      }
      return res;
    },
    enabled: !!cityCode,
    placeholderData: [],
    staleTime: 1000 * 60 * 10,
  });
};

export const localQeurys = {
  useCities,
  useDistricts
}