import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";

import type { CheckboxItem } from "../types/checkbox.type";
import { useCheckboxManager } from "../utils/checkboxManager";

interface CheckboxContextProps {
  items: CheckboxItem[];
  toggleCheckbox: (id: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
}

const CheckboxContext = createContext<CheckboxContextProps | undefined>(undefined);

export const useCheckboxGroup = () => {
  const context = useContext(CheckboxContext);
  if (!context) {
    throw new Error("useCheckboxGroup훅(Hooks)은 정해진 공급자 내에서 사용해야 합니다.");
  }
  return context;
};

export interface CheckboxProviderProps extends PropsWithChildren {
  initialItems: CheckboxItem[];
}

export const CheckboxProvider = ({ initialItems, children }: CheckboxProviderProps) => {
  const checkboxManger = useCheckboxManager(initialItems);

  return <CheckboxContext.Provider value={checkboxManger}>{children}</CheckboxContext.Provider>;
};
