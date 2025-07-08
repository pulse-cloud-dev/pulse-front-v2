import { useQuery } from "@tanstack/react-query";
import { categoryApis } from "@/networks";

export const useMentoringDetailQuery = (id: string) => {
  return useQuery({
    queryKey: ["mentoringDetail", id],
    queryFn: () => categoryApis.getMentoringDetail(id),
    enabled: !!id, // id가 있어야 쿼리 실행
    staleTime: 1000 * 60, // 1분간 캐시 유지
    retry: 1, // 실패 시 1번 재시도
  });
};