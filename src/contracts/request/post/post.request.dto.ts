/**
 * MentoringPostRequestDTO는 멘토링 등록 요청에 필요한 데이터를 정의합니다.
 *
 * @property {string} title - 멘토링 제목
 * @property {string} content - 멘토링 내용
 * @property {string} deadline_date - 모집 마감 날짜 (yyyyMMdd)
 * @property {string} deadline_time - 모집 마감 시간 (HHMM)
 * @property {string} start_date - 멘토링 시작 날짜 (yyyyMMdd)
 * @property {string} end_date - 멘토링 종료 날짜 (yyyyMMdd)
 * @property {string} lecture_type - 강의 형태 (ONLINE, OFFLINE)
 * @property {string} [online_platform] - 온라인 플랫폼 (선택값, 미입력시 '미정')
 * @property {string} address - 기본 주소
 * @property {string} detail_address - 상세 주소
 * @property {number} recruit_number - 모집 인원
 * @property {number} cost - 비용
 */
export interface MentoringPostRequestDTO {
  title: string;
  content: string;
  deadline_date: string;
  deadline_time: string;
  start_date: string;
  end_date: string;
  lecture_type: "ONLINE" | "OFFLINE";
  online_platform?: string;
  address: string;
  detail_address: string;
  recruit_number: number;
  cost: number;
}
