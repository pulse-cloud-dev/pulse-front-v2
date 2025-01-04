import type { PropsWithChildren } from "react";
import { createContext, useContext, useState, useCallback } from "react";

export interface CheckboxItem {
  id: string;
  label: string;
  checked: boolean;
}

type CheckboxContextType = {
  items: CheckboxItem[];
  toggleCheckbox: (id: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
};
const CheckboxContext = createContext<CheckboxContextType | undefined>(undefined);

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
  const [items, setItems] = useState<CheckboxItem[]>(initialItems);

  const toggleCheckbox = useCallback(
    (id: string) => {
      if (id === "all") {
        const allChecked = items.every((item) => !item.checked); // 모든 항목이 체크되어 있지 않은 경우
        setItems((prevItems) => prevItems.map((item) => ({ ...item, checked: allChecked })));
      } else {
        setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
      }
    },
    [items]
  );

  const selectAll = useCallback(() => {
    setItems((prevItems) => prevItems.map((item) => ({ ...item, checked: true })));
  }, []);

  const deselectAll = useCallback(() => {
    setItems((prevItems) => prevItems.map((item) => ({ ...item, checked: false })));
  }, []);

  return <CheckboxContext.Provider value={{ items, toggleCheckbox, selectAll, deselectAll }}>{children}</CheckboxContext.Provider>;
};
