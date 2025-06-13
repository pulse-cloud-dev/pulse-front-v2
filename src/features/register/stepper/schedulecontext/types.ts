export interface Region {
  city: string;
  district: string;
}

export interface ScheduleState {
  mode: boolean; // online/offline 모드
  region: Array<Region>; // Region 객체의 Set
  days: Set<string>; // 문자열 Set (선택된 요일들)
}

export type ScheduleActionType = "DELETE_SCHEDULE_DATE" | "UPDATE_SCHEDULE_DATE" | "DELETE_REGION" | "UPDATE_REGION" | "TOGGLE_ONLINE_OFFLINE_MODE";

export type ScheduleAction =
  | { type: "TOGGLE_ONLINE_OFFLINE_MODE" }
  | { type: "UPDATE_REGION"; payload: Region }
  | { type: "DELETE_REGION"; payload: Region }
  | { type: "UPDATE_SCHEDULE_DATE"; payload: string }
  | { type: "DELETE_SCHEDULE_DATE"; payload: string };

export interface ScheduleContextType {
  schedule: ScheduleState;
  dispatch: React.Dispatch<ScheduleAction>;
}
