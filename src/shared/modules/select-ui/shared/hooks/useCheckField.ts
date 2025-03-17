import { useState, useCallback } from 'react';

interface UseCheckFieldProps {
  initialChecked?: boolean;
  disabled?: boolean;
}

export const useCheckField = ({ initialChecked = false, disabled = false }: UseCheckFieldProps) => {
  const [checked, setChecked] = useState(initialChecked);

  const toggle = useCallback(() => {
    if (!disabled) {
      setChecked((prev) => !prev);
    }
  }, [disabled]);

  return { checked, toggle, disabled };
};
