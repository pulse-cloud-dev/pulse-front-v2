import type { MouseEvent, PropsWithChildren, HTMLAttributes } from "react";
import { useEffect, useState, forwardRef } from "react";
import qs from "query-string";
import { useSearchParams } from "react-router-dom";

import { Icon } from "../../atoms";

function usePageNationController<T>(queryStringKey: string = "offset") {
  const [serchParams, setSearchParams] = useSearchParams();

  const [offset, setOffset] = useState<number>(1);

  const [error, setError] = useState(false);

  const handleOffset = (e: MouseEvent) => {
    const dataPage = getDataPage(e);

    if (!dataPage) return throwError();

    setOffset(parseInt(dataPage));

    setParams(dataPage);
  };

  const throwError = () => setError(true);

  const getDataPage = (e: MouseEvent) => e.currentTarget.getAttribute("data-page");

  const setParams = (offset: string) => setSearchParams((prev) => ({ ...prev, ...qs.parseUrl(location.search).query, [queryStringKey]: offset }));

  useEffect(() => {
    if (error) {
      throw new Error(`⚠️ PageNation's error : 선택한 요소의 데이터가 없습니다.`);
    }
  }, [error]);

  return {
    offset,
    error,
    handleOffset,
  };
}

export interface PageNationProps extends HTMLAttributes<HTMLElement>, PropsWithChildren {
  queryStringKey: string;
  pages: number;
  handlePreview?: () => void;
  handleOverview?: () => void;
}

export const PageNation = forwardRef<HTMLUListElement, PageNationProps>((props, forwardedRef) => {
  const { queryStringKey, pages, handleOverview, handlePreview } = props;

  if (typeof queryStringKey !== "string") throw Error(`⚠️ PageNation's error : Query Key에 대한 Prop설정이 올바르지 않습니다.`);

  const pageNationController = usePageNationController<string>(queryStringKey);

  if (pages < 1) return <ul className="paging_ul" ref={forwardedRef}></ul>;

  const previewButton = () => {
    return (
      <li onClick={handlePreview}>
        <a className="arrow">
          <Icon src={"arrow_left"} alt="왼쪽 화살표" />
        </a>
      </li>
    );
  };

  const overviewButton = () => {
    return (
      <li onClick={handleOverview}>
        <a className="arrow">
          <Icon src={"arrow_right"} alt="오른쪽 화살표" />
        </a>
      </li>
    );
  };

  return (
    <ul className="pageNation__list" ref={forwardedRef}>
      {pageNationController.offset === 1 ? null : previewButton()}

      {Array(pages)
        .fill(0)
        .map((_, i) => ++i)
        .map((page, j) => {
          if (page === 5) {
            return (
              <li key={`${page}-${j}`}>
                <a data-page={undefined} className={`${pageNationController.offset === page && "active"}`} onClick={pageNationController.handleOffset}>
                  {"⛔"}{" "}
                </a>
              </li>
            );
          }
          return (
            <li key={`${page}-${j}`}>
              <a data-page={page} className={`${pageNationController.offset === page && "active"}`} onClick={pageNationController.handleOffset}>
                {page}
              </a>
            </li>
          );
        })}

      {pageNationController.offset === pages ? null : overviewButton()}
    </ul>
  );
});
