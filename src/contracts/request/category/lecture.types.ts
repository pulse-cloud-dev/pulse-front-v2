export type LectureType = "ONLINE" | "OFFLINE";

export interface LectureTypeResponse {
  body: LectureType[];
  message: string;
}
