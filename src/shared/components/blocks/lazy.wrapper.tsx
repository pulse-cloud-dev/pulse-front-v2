import type { ReactNode, JSX, ReactElement, LazyExoticComponent } from "react";
import { Suspense } from "react";

/**
 * @description 'DefaultLazyWrapperFallback' - 기본적으로 로딩 상태를 표시하기 위한 Fallback 컴포넌트.
 *               LazyWrapper에서 커스텀 Fallback이 제공되지 않은 경우 사용됩니다.
 * @returns JSX.Element
 */
const DefaultLazyWrapperFallback = () => {
  return <div>It is loading....</div>;
};

/**
 * @description 'LazyWrapper' - Lazy 로드된 컴포넌트를 React.Suspense로 감싸는 Wrapper 컴포넌트입니다.
 *               Suspense는 React에서 동적 로딩 시 발생하는 로딩 상태를 처리합니다.
 *
 * @param Component - Lazy 로드된 컴포넌트를 나타내는 LazyExoticComponent 타입의 React 컴포넌트.
 *                    Lazy 컴포넌트는 React의 `React.lazy()`를 통해 생성된 컴포넌트입니다.
 * @param fallback - 로딩 중에 표시할 Fallback UI로, ReactNode 타입을 받습니다.
 *                   만약 전달되지 않을 경우 기본 Fallback 컴포넌트(DefaultLazyWrapperFallback)가 사용됩니다.
 * @returns ReactElement - Lazy 로드된 컴포넌트를 Suspense로 감싼 React 엘리먼트를 반환합니다.
 */

export const LazyWrapper = (
  Component: LazyExoticComponent<() => JSX.Element>,

  fallback?: ReactNode
): ReactElement => (
  <Suspense fallback={fallback || <DefaultLazyWrapperFallback />}>
    <Component />
  </Suspense>
);
