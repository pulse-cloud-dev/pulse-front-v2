import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { categoryApis } from "@/networks/apis/category.api";

const useFieldItems = () => {
  return useQuery({
    queryKey: ["fieldItems"],
    queryFn: categoryApis.fieldItems,
    staleTime: 1000 * 60 * 10, // 10분 캐시
    placeholderData: [],
  });
};

type SubField = { name: string; code: string }; // 응답 타입

const useSubFields = (
  selectedFieldCode?: string,
  options?: Partial<
    UseQueryOptions<SubField[], Error, SubField[], [string, string?]>
  >
) => {
  return useQuery<SubField[], Error, SubField[], [string, string?]>({
    queryKey: ["subFields", selectedFieldCode],
    queryFn: () => {
      if (!selectedFieldCode) return Promise.resolve([]);
      return categoryApis.subFields(selectedFieldCode);
    },
    staleTime: 1000 * 60 * 10,
    placeholderData: [],
    enabled: options?.enabled ?? !!selectedFieldCode,
    ...options,
  });
};

export const fieldQuerys = {
    useFieldItems,
    useSubFields,
}