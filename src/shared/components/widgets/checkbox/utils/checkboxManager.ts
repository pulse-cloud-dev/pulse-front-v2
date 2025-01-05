import { useState, useCallback } from "react";
import { CheckboxItem } from "../types/checkbox.type";

export function useCheckboxManager(initialItems: CheckboxItem[]) {
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

  return {
    items,
    toggleCheckbox,
    selectAll,
    deselectAll,
  };
}
