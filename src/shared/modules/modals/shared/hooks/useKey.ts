import { useCallback, useEffect } from "react";

/**
 * @param {string} targetKey - 감지할 키 값
 * @param {() => void} handler - 키가 눌렸을 때 실행할 함수 
 * @param {keyof WindowEventMap} [event="keydown"] - 이벤트 종류
 */


export const useKey = (
  targetKey: string,
  handler: () => void,
  event: keyof WindowEventMap = "keydown"
) => {
  const handleKey = useCallback((e: Event) => {
    const event = e as KeyboardEvent;
    if (event.key === targetKey) {
        handler();
    }
  }, [targetKey, handler]);

  useEffect(() => {
    window.addEventListener(event, handleKey);
    return () => window.removeEventListener(event, handleKey);
  }, [event, handleKey]);
};


