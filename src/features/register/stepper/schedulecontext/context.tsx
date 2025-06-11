import { createContext, useReducer, useContext, ReactNode } from "react";
import { initialScheduleState, scheduleReducer } from "./reducer";
import { ScheduleContextType } from "./types";

const scheduleContext = createContext<ScheduleContextType | "use Provider">("use Provider");

interface ScheduleProviderProps {
  children: ReactNode;
}

export const ScheduleProvider = ({ children }: ScheduleProviderProps) => {
  const [schedule, dispatch] = useReducer(scheduleReducer, initialScheduleState);

  return <scheduleContext.Provider value={{ schedule, dispatch }}>{children}</scheduleContext.Provider>;
};

export const useSchedule = (): ScheduleContextType => {
  const context = useContext(scheduleContext);
  if (context === "use Provider") {
    throw new Error("provider사용해주세요");
  }
  return context;
};
