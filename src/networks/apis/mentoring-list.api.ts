import {
  ResultData,
  PaginationDto,
  MentoringListItemDto,
} from "@/contracts/response/mentoring-list/mentoring-list.reseponse.dto";

import { publicClient } from "../client";

export const gethMentoringList = async (): Promise<ResultData<PaginationDto<MentoringListItemDto>>> => {
    const res = await publicClient.get("/mentoring/list", {
      params: { page: 1, size: 8 },  // 가져와지는 
    }) as ResultData<PaginationDto<MentoringListItemDto>>;
  
    console.log("body:", res.body);
  
    return res;
  };
  
  