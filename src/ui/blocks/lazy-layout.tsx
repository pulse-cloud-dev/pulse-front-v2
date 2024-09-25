import type { ReactElement, LazyExoticComponent } from "react";
import * as React from "react";

export const LazyLayout = (Component: LazyExoticComponent<() => JSX.Element>): ReactElement => (
  <React.Suspense fallback={<div>로딩중</div>}>
    <Component />
  </React.Suspense>
);
