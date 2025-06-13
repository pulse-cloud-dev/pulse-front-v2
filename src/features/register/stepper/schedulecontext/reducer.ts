import { ScheduleAction, ScheduleState, Region } from "./types";

// 초기 상태를 region은 배열로 변경합니다.
export const initialScheduleState: ScheduleState = {
  mode: true,
  region: [] as Region[], // 배열로 변경
  days: new Set<string>(),
};

export const scheduleReducer = (state: ScheduleState, action: ScheduleAction): ScheduleState => {
  switch (action.type) {
    case "DELETE_SCHEDULE_DATE": {
      const newDays = new Set(state.days);
      newDays.delete(action.payload);
      return {
        ...state,
        days: newDays,
      };
    }

    case "UPDATE_SCHEDULE_DATE": {
      const newDays = new Set(state.days);
      newDays.has(action.payload) ? newDays.delete(action.payload) : newDays.add(action.payload);
      return {
        ...state,
        days: newDays,
      };
    }

    case "DELETE_REGION": {
      const newRegionArray = state.region.filter((region) => region !== action.payload);
      return {
        ...state,
        region: newRegionArray,
      };
    }

    case "UPDATE_REGION": {
      const exists = state.region.some((r) => r.city === action.payload.city && r.district === action.payload.district);

      const newRegionArray = exists ? state.region.filter((r) => !(r.city === action.payload.city && r.district === action.payload.district)) : [...state.region, action.payload]; // 없으면 추가

      return {
        ...state,
        region: newRegionArray,
      };
    }

    case "TOGGLE_ONLINE_OFFLINE_MODE":
      return {
        ...state,
        mode: !state.mode,
      };

    default: {
      throw Error("Unknown action");
    }
  }
};
