import { useState } from 'react';

interface UseCheckFieldGroupProps {
  initialValues?: Record<string, boolean>;
}

export const useCheckFieldGroup = ({ initialValues = {} }: UseCheckFieldGroupProps) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(initialValues);

  const toggle = (key: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return { checkedItems, toggle };
};
