import type { PropsWithChildren, HTMLAttributes } from "react";
import { forwardRef } from "react";
import { Icon } from "../../atoms";

interface PageNationProps extends HTMLAttributes<HTMLElement>, PropsWithChildren {
  offset: number;
  setOffset: (page: number) => void;
  pages: number;
}

export const PageNation = forwardRef<HTMLUListElement, PageNationProps>(
  ({ offset, setOffset, pages }, ref) => {
    // if (pages < 2) return null;

    const handleClick = (page: number) => () => setOffset(page);

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
        {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
          <li key={page}>
            <a
              data-page={page}
              onClick={handleClick(page)}
              className={offset === page ? "active" : ""}
            >
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
  }
);
