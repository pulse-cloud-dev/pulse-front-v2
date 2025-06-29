import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/shared/components";
import { fieldQuerys } from "../../../Mentor/hooks/useFieldItems";
import { categoryApis } from "@/networks";
import { HeaderProps, SubItemWithParent } from "../../type/searchProps";

//Header
export const Header = ({
  onSearch,
  onToggle,
  checkedItems,
}: HeaderProps) => {
  const [inputValue, setInputValue] = useState("");
  const [allSubItems, setAllSubItems] = useState<SubItemWithParent[]>([]);

  // 전체 상위 카테고리 가져오기
  const { data: fields = [] } = fieldQuerys.useFieldItems();

  // 진입 시 전체 하위 항목 수집
  useEffect(() => {
    const loadAllSubFields = async () => {
      const all = await categoryApis.allSubFields();
      setAllSubItems(all); 
    };
    loadAllSubFields();
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
    <header className="popup-field__header" role="search" aria-label="분야 검색">
      {/* 검색창 */}
      <div className="popup-field__search">
        <input
          id="field-search"
          type="text"
          placeholder="찾으시는 분야를 검색해 주세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Icon
          src="search_18"
          alt="검색 아이콘"
          className="popup-field__search-icon"
          onClick={handleSearch}
        />
      </div>

      {/* 드롭다운 */}
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
