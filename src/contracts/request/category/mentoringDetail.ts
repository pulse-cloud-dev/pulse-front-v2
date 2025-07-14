export interface MentoringDetail {
  mentor_nickname: string;
  mentor_profile_image: string;
  mentor_job: string;
  mentor_career_total_year: number;
  mentor_last_company: string;
  title: string;
  content: string;
  deadline_date: string;
  deadline_time: string;
  start_date: string;
  end_date: string;
  lecture_type: "ONLINE" | "OFFLINE";
  online_platform: string;
  address: string;
  detail_address: string;
  recruit_number: number;
  apply_number: number;
  cost: number;
  region: string;
}

export interface MentoringDetailResponse {
  body: MentoringDetail;
  message: string;
}