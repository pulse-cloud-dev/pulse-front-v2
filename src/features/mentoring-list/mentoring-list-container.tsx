import { useMentoringList } from "./mentoring-list.controller";
import { MainCardList } from "../main/component/card";
import { MentoringListItemDto } from "@/contracts/response/mentoring-list/mentoring-list.reseponse.dto";

export const MainCardListContainer = () => {
  const { data, isLoading, isError } = useMentoringList();

  if (isLoading) return <p>로딩 중...</p>;
  if (isError || !data) return <p>에러 발생</p>;

  return <MainCardList list={data.body.contents as MentoringListItemDto[]} />;
};
