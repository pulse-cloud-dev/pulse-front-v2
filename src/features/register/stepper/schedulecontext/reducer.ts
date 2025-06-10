import { ScheduleAction, ScheduleState, Region } from "./types";

// 초기 상태는 Set으로 올바르게 초기화합니다.
export const initialScheduleState: ScheduleState = {
  mode: true,
  region: new Set<Region>(),
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
      newDays.add(action.payload);
      return {
        ...state,
        days: newDays,
      };
    }

    case "DELETE_REGION": {
      const newRegionSet = new Set(state.region);
      newRegionSet.delete(action.payload);
      return {
        ...state,
        region: new Set(newRegionSet),
      };
    }

    case "UPDATE_REGION": {
      const newRegionSet = new Set(state.region);
      newRegionSet.add(action.payload);

      return {
        ...state,
        region: newRegionSet,
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
