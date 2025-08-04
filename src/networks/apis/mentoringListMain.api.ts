import { MentoringListItemDto, ResultData } from "@/contracts/response/mentoring-list/mentoring-list.reseponse.dto";
import { publicClient } from "../client";

export const getMentoringListMain = async (): Promise<ResultData<MentoringListItemDto[]>> => {
  const res = await publicClient.get("/mentoring/popular") as ResultData<MentoringListItemDto[]>;

  console.log("mentoring list body:", res.body);

  return res;
};
