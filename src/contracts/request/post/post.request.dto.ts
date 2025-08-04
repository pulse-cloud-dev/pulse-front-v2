interface OnlineMentoringPostRequestDTO {
  lecture_type: "ONLINE";
  title: string;
  content: string;
  deadline_date: string;
  deadline_time: string;
  start_date: string;
  end_date: string;
  online_platform: string;
  recruit_number: number;
  cost: number;
  // 온라인은 주소 없음
}

interface OfflineMentoringPostRequestDTO {
  lecture_type: "OFFLINE";
  title: string;
  content: string;
  deadline_date: string;
  deadline_time: string;
  start_date: string;
  end_date: string;
  address: string;
  detail_address: string;
  recruit_number: number;
  cost: number;
  // 오프라인은 온라인 플랫폼 없음
}

export type MentoringPostRequestDTO = OnlineMentoringPostRequestDTO | OfflineMentoringPostRequestDTO;
