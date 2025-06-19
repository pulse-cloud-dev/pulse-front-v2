import { useState, useRef, useEffect } from "react";
import { Icon } from "../../atoms";


export const SortDropdown = ({
  sortOption,
  setSortOption,
}: {
  sortOption: string;
  setSortOption: (val: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sortOptions = ["기본순", "인기순", "최신순"];

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sort-dropdown" ref={dropdownRef}>
      <button className="sort-button" onClick={() => setOpen(!open)}>
        {sortOption} <span className="sort-arrow">
            <Icon src="chevron_down_bk80_16" alt="화살표" />
        </span>
      </button>
      {open && (
        <ul className="sort-list">
          {sortOptions.map((option) => (
            <li
              key={option}
              className={`sort-item ${option === sortOption ? "selected" : ""}`}
              onClick={() => {
                setSortOption(option);
                setOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
