import { useQuery } from "@tanstack/react-query";
import { gethMentoringList } from "@/networks/apis/mentoring-list.api";
import { MentoringListItemDto } from "@/contracts/response/mentoring-list/mentoring-list.reseponse.dto";

// 한국 시간 변환 함수
const convertToKoreanDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const koreanTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return koreanTime.toISOString().split("T")[0]; 
};

export const useMentoringList = () => {
  return useQuery({
    queryKey: ["mentoringList"],
    queryFn: async () => {
      const res = await gethMentoringList();

      //  모든 항목의 deadline_time을 가공
      const convertedContents = res.body.contents.map((item): MentoringListItemDto => ({
        ...item,
        deadline_time: convertToKoreanDate(item.deadline_time),
      }));

      return {
        ...res,
        body: {
          ...res.body,
          contents: convertedContents,
        },
      };
    },
  });
};