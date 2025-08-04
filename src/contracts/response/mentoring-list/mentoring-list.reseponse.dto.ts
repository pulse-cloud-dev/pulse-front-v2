// 강의 타입
export type LectureType = "ONLINE" | "OFFLINE";

// 단일 멘토링 항목 DTO
export interface MentoringListItemDto {
  mentoring_id: string;                   // 멘토링 고유 ID
  lecture_type: LectureType;             // 강의 형태
  title: string;                         // 멘토링 제목
  mentor_profile_image: string;          // 멘토 프로필 이미지
  mentor_job: string;                    // 멘토 직업명
  mentor_career_total_year: number;      // 멘토 총 경력 (년 단위)
  online_platform: string;               // 온라인 플랫폼명
  mentor_nickname: string;               // 멘토 닉네임
  deadline_time: string;                 // 신청 마감 시간 (ISO8601)
  view_count: number;                    // 조회 수
  is_bookmark: boolean;                  // 북마크 여부
}

export interface ResultData<T> {
  body: T;
  message: string;
}

// 페이징 정보 및 멘토링 리스트 포함한 응답
export interface PaginationDto<T> {
  page: number;                          // 현재 페이지 번호
  size: number;                          // 한 페이지당 아이템 수
  sort: "ASC" | "DESC";                  // 정렬 방식
  total_pages: number;                   // 전체 페이지 수
  total_count: number;                   // 전체 항목 수
  contents: T[];                         // 실제 데이터 리스트
}

// API 기본 응답 구조
export interface ResultData<T> {
  body: T;                               // 응답 데이터 본문
  message: string;                       // 응답 메시지
}

// 최종 응답 타입 (ResultData + Pagination + Mentoring 리스트)
export type MentoringListResponseDto = ResultData<PaginationDto<MentoringListItemDto>>;
