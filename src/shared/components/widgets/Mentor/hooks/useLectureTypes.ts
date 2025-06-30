import { useQuery } from "@tanstack/react-query";
import { categoryApis } from "@/networks";

export const useLectureTypes = () => {
  return useQuery({
    queryKey: ["lectureTypes"],
    queryFn: categoryApis.lectureTypes,
    staleTime: 1000 * 60 * 10, // 10분 캐시
    placeholderData: [],
  });
};