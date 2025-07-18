import type { HTMLAttributes } from "react";
import { useEffect, useState, useMemo } from "react";
import { Icon } from "@/shared/components";
import { categoryApis } from "@/networks";
import { HeaderProps, SubItemWithParent } from "../../type/searchProps";
import { fieldQuerys } from "../../../Mentor/hooks/useFieldItems";

//Header
export const Header = ({
  onSearch,
  onToggle,
  checkedItems,
}: HeaderProps) => {
  const [inputValue, setInputValue] = useState("");
  const [allSubItems, setAllSubItems] = useState<SubItemWithParent[]>([]);

  // 전체 상위 카테고리 가져오기 (캐싱)
  const { data: fields = [] } = fieldQuerys.useFieldItems();

  // 진입 시 전체 하위 항목 수집
  useEffect(() => {
    const loadAllSubRegions = async () => {
      const all = await categoryApis.allSubRegions();
      setAllSubItems(all);
    };
    loadAllSubRegions();
  }, []);

  // 필터링된 하위 항목
  const filtered = useMemo(() => {
      if (!inputValue.trim()) return [];
      return allSubItems.filter(({ name }) =>
        name.toLowerCase().includes(inputValue.toLowerCase().trim())
      );
    }, [inputValue, allSubItems]);

  const handleSearch = () => {
    onSearch(inputValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const isChecked = (key: string) => !!checkedItems[key];

  return (
    <header className="popup-local__header" role="search" aria-label="지역 검색">
      <div className="popup-local__search">
        <input
          id="region-search"
          type="text"
          placeholder="찾으시는 지역을 검색해 주세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Icon
          src="search_18"
          alt="검색 아이콘"
          aria-label="검색"
          className="popup-local__search-icon"
          onClick={handleSearch}
        />
      </div>

      {inputValue.trim() && filtered.length > 0 && (
        <div className="search-dropdown-wrapper">
          {filtered.map(({ parent, name, code }) => {
            const fullKey = `${parent}-${name}`;
            return (
              <div
                key={`${fullKey}-${code}`}
                className={`search-dropdown ${isChecked(fullKey) ? "selected" : ""}`}
                onClick={() => onToggle(fullKey)}
              >
                {parent} &gt; {name}
              </div>
            );
          })}
        </div>
      )}
    </header>
  );
};