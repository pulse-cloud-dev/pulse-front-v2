import type { HTMLAttributes } from "react";
import { useState } from "react";
import { Icon } from "@/shared/components";


// 🔹 Header
export const Header = ({
  className = "",
  onSearch,
  ...props
}: HTMLAttributes<HTMLElement> & {
  onSearch: (keyword: string) => void;
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    onSearch(inputValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <header className={`popup-local__header ${className}`} {...props}>
      <div className="popup-local__search">
        <input
          type="text"
          placeholder="찾으시는 지역을 검색해 주세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Icon
          src="search_18"
          alt="검색 아이콘"
          className="popup-local__search-icon"
          onClick={handleSearch}
        />
      </div>
    </header>
  );
};