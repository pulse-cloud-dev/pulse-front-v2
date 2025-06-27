import { useQuery } from "@tanstack/react-query";
import { categoryApis } from "@/networks/apis/category.api";

const useFieldItems = () => {
  return useQuery({
    queryKey: ["fieldItems"],
    queryFn: categoryApis.fieldItems,
    staleTime: 1000 * 60 * 10, // 10분 캐시
    placeholderData: [],
  });
};

const useSubFields = (selectedFieldCode?: string) => {
  return useQuery({
    queryKey: ["subFields", selectedFieldCode],
    queryFn: () => {
      if (!selectedFieldCode) return Promise.resolve([]);
      return categoryApis.subFields(selectedFieldCode);
    },
    enabled: !!selectedFieldCode, // 선택된 field가 있을 때만 호출
    staleTime: 1000 * 60 * 10,
    placeholderData: [],
  });
};

export const fieldQuerys = {
    useFieldItems,
    useSubFields,
}