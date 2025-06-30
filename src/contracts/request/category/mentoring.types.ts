
type LectureType = "ONLINE" | "OFFLINE";

interface MentorJob {
  jobCode: string;
}

export interface MentoringItem {
  mentoring_id: string;
  lecture_type: LectureType;
  title: string;
  mentor_profile_image: string | null;
  mentor_job: MentorJob;
  mentor_career_total_year: number;
  online_platform: string;
  mentor_nickname: string;
  deadline_time: string; 
}

export interface MentoringListResponseBody {
  page: number;
  size: number;
  sort: "ASC" | "DESC";
  total_pages: number;
  total_count: number;
  contents: MentoringItem[];
}

export interface MentoringListResponse {
  body: MentoringListResponseBody;
  message: string;
}

export interface MentoringListParams {
  field?: string;
  region?: string;
  lecture_type?: LectureType;
  sort_type?: "DEFAULT" | "POPULAR" | "LATEST";
  search_text?: string;
  page?: number;
  size?: number;
}

