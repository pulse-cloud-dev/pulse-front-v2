import type { HTMLAttributes } from "react";
import { Icon } from "@/shared/components";


// 🔹 Header
export const Header = ({ className = "", ...props }: HTMLAttributes<HTMLElement>) => (
  <header className={`popup-local__header ${className}`} {...props}>
    <div className="popup-local__search">
      <input type="text" placeholder="찾으시는 지역을 검색해 주세요" />
      <Icon src="search_18" alt="검색 아이콘" className="popup-local__search-icon" />
    </div>
  </header>
);