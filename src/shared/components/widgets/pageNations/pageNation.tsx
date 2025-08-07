import type { PropsWithChildren, HTMLAttributes } from "react";
import { forwardRef } from "react";
import { Icon } from "../../atoms";

interface PageNationProps extends HTMLAttributes<HTMLElement>, PropsWithChildren {
  offset: number;
  setOffset: (page: number) => void;
  pages: number;
  showCount?: number; // ⭐ 추가: 몇 개의 페이지를 보여줄지
}

export const PageNation = forwardRef<HTMLUListElement, PageNationProps>(({ offset, setOffset, pages, showCount = 5 }, ref) => {
  const handleClick = (page: number) => () => setOffset(page);

  const getVisiblePages = (current: number, total: number, count: number): number[] => {
    const half = Math.floor(count / 2);
    let start = current - half;
    let end = current + half;

    // 1. 최소 범위 보정
    if (start < 1) {
      start = 1;
      end = Math.min(total, start + count - 1);
    }

    // 2. 최대 범위 보정
    if (end > total) {
      end = total;
      start = Math.max(1, end - count + 1);
    }

    // 3. 결과 생성
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages(offset, pages, showCount);

  return (
    <ul className="pageNation__list" ref={ref}>
      {/* 이전 버튼 */}
      {offset > 1 && (
        <li onClick={handleClick(offset - 1)}>
          <a className="arrow">
            <Icon src={"arrow_left"} alt="이전 페이지" />
          </a>
        </li>
      )}

      {/* 페이지 번호 */}
      {visiblePages.map((page) => (
        <li key={page}>
          <a data-page={page} onClick={handleClick(page)} className={offset === page ? "active" : ""}>
            {page}
          </a>
        </li>
      ))}

      {/* 다음 버튼 */}
      {offset < pages && (
        <li onClick={handleClick(offset + 1)}>
          <a className="arrow">
            <Icon src={"arrow_right"} alt="다음 페이지" />
          </a>
        </li>
      )}
    </ul>
  );
});
