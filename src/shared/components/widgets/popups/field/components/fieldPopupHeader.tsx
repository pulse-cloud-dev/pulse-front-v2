import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/shared/components";
import { categoryApis } from "@/networks";
import { HeaderProps, SubItemWithParent } from "../../type/searchProps";

//Header
export const Header = ({ onToggle, checkedItems }: HeaderProps) => {
  const [inputValue, setInputValue] = useState("");
  const [allSubItems, setAllSubItems] = useState<SubItemWithParent[]>([]);

  useEffect(() => {
    const loadAllSubFields = async () => {
      const all = await categoryApis.allSubFields();
      setAllSubItems(all);
    };
    loadAllSubFields();
  }, []);

  const filtered = useMemo(() => {
    if (!inputValue.trim()) return [];
    return allSubItems.filter(({ name }) => name.toLowerCase().includes(inputValue.toLowerCase().trim()));
  }, [inputValue, allSubItems]);

  // name을 key로 체크 여부 판단
  const isChecked = (name: string) => checkedItems.some((item) => item.name === name);

  return (
    <header className="popup-field__header" role="search" aria-label="분야 검색">
      <div className="popup-field__search">
        <input id="field-search" type="text" placeholder="찾으시는 분야를 검색해 주세요" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <Icon src="search_18" alt="검색 아이콘" className="popup-field__search-icon" />
      </div>

      {inputValue.trim() && filtered.length > 0 && (
        <div className="search-dropdown-wrapper">
          {filtered.map(({ parent, name, code }) => {
            const fullKey = name;
            return (
              <div key={`${fullKey}-${code}`} className={`search-dropdown ${isChecked(fullKey) ? "selected" : ""}`} onClick={() => onToggle({ parent, name, code })}>
                {parent} &gt; {name}
              </div>
            );
          })}
        </div>
      )}
    </header>
  );
};
