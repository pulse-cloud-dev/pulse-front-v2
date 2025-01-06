import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { Icon } from "../../atoms";

type SearchbarElement = HTMLInputElement & HTMLDivElement;

interface HeaderSearchbarProps extends HTMLAttributes<SearchbarElement> {
  placeHolder?: string;
}

export const HeaderSearchbar = forwardRef<HTMLInputElement, HeaderSearchbarProps>((props, forwardedRef) => {
  const { id = "search-input", placeHolder, className, children, style, ...rest } = props;

  return (
    <>
      <div className="search-bar" role="search">
        <label htmlFor={id} className="visually-hidden">
          Search
        </label>
        <button type="submit" className="search-bar__button" aria-label="Submit search">
          <Icon src="search_18" alt="search button" />
        </button>
        <input ref={forwardedRef} type="text" id={id} className="search-bar__input" placeholder={placeHolder || "검색어를 입력해주세요."} aria-label="Search" />
      </div>

      <button type="button" className="search-bar__button mobile" aria-label="Button search">
        <Icon src="search_18" alt="search button" />
      </button>
    </>
  );
});
