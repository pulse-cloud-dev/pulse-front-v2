import type { ChangeEvent } from 'react';
import { useState, useCallback } from 'react';

interface UseSelectProps<T> {
  defaultValue?: T;
}

export const useSelect = <T extends string>({ defaultValue }: UseSelectProps<T>) => {
  const [value, setValue] = useState<T | ''>(defaultValue ?? '');

  // 값 변경
  const onChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value as T);
  }, []);

  // 값 초기화
  const reset = useCallback(() => {
    setValue(defaultValue ?? '');
  }, [defaultValue]);

  return { value, onChange, reset, setValue };
};
