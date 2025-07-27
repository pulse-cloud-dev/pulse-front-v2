import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * 쿼리 스트링의 특정 키를 읽고(set/get), 갱신할 수 있는 커스텀 훅
 *
 * @param {string} queryKey - 추적하려는 쿼리 파라미터의 키
 * @throws queryKey가 유효하지 않으면 에러
 *
 * @returns {{
 *   currentValue: string | null;
 *   getQueryValue: () => string | null;
 *   setQueryValue: (newValue: string) => void;
 * }}
 */
export const useQueryParams = (queryKey: string) => {
  if (typeof queryKey !== "string" || queryKey.trim() === "") {
    throw new Error("[useQueryParams] queryKey는 빈 문자열일 수 없습니다.");
  }

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const currentValue = params.get(queryKey);

  // getter: 호출 시점의 최신 쿼리 파라미터 값 반환
  const getQueryValue = useCallback(() => {
    const current = new URLSearchParams(location.search).get(queryKey);
    return current;
  }, [location.search, queryKey]);

  // setter: 쿼리 파라미터 값 업데이트
  const setQueryValue = useCallback(
    (newValue: string) => {
      const updated = new URLSearchParams(location.search);
      const prevValue = updated.get(queryKey);
      if (prevValue !== newValue) {
        updated.set(queryKey, newValue);
        navigate(`?${updated.toString()}`);
      }
    },
    [navigate, location.search, queryKey]
  );

  return {
    currentValue, // 초기값 (호출 시점 기준)
    getQueryValue, // 최신값 가져오는 함수
    setQueryValue, // 값 변경 함수
  };
};
