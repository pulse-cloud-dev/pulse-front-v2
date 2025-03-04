import { useState } from 'react';

type ActiveType = boolean;

type ExtractToggleHookReturnType<T> = T extends [infer A, infer V] ? [A, V, V, V] : never;

export function useToggle(initialValue = false): ExtractToggleHookReturnType<[ActiveType, () => void]> {
  const [status, setStatus] = useState<ActiveType>(initialValue);

  const toggle = () => setStatus((prevStatus) => !prevStatus);

  const onInactive = () => setStatus(false);

  const onActive = () => setStatus(true);

  return [status, toggle, onActive, onInactive] as const;
}
