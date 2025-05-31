import { useEffect, useRef } from 'react';

type CallbackEventHandler = () => void | undefined;

/**
 * This is Hook that triggers an event when an external area is clicked
 * @param {Function} callback Event callback function to generate
 * @returns ref object
 */
export function useClickOutSide<T>(callback: CallbackEventHandler) {
  const ref = useRef<T & HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current?.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref; // Tracking Outside ref object
}
