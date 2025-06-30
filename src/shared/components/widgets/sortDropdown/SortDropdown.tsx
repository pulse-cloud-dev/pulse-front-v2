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
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
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

  // 키보드 이벤트 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement | HTMLUListElement>) => {
    if (!open) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev === null || prev === sortOptions.length - 1 ? 0 : prev + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev === null || prev === 0 ? sortOptions.length - 1 : prev - 1));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (focusedIndex !== null) {
          setSortOption(sortOptions[focusedIndex]);
          setOpen(false);
          setFocusedIndex(null);
        }
        break;
      case "Escape":
        setOpen(false);
        setFocusedIndex(null);
        break;
    }
  };

  return (
    <div className="sort-dropdown" ref={dropdownRef}>
      <button
        className="sort-button"
        ref={buttonRef}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="sort-dropdown-list"
        onClick={() => {
          setOpen((prev) => !prev);
          setFocusedIndex(null);
        }}
        onKeyDown={handleKeyDown}
      >
        {sortOption}
        <span className="sort-arrow">
          <Icon src="chevron_down_bk80_16" alt="정렬 옵션 열기" />
        </span>
      </button>

      {open && (
        <ul
          id="sort-dropdown-list"
          role="listbox"
          className="sort-list"
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          aria-activedescendant={
            focusedIndex !== null ? `sort-option-${focusedIndex}` : undefined
          }
        >
          {sortOptions.map((option, index) => (
            <li
              id={`sort-option-${index}`}
              key={option}
              role="option"
              aria-selected={option === sortOption}
              className={`sort-item ${option === sortOption ? "selected" : ""} ${
                focusedIndex === index ? "focused" : ""
              }`}
              onClick={() => {
                setSortOption(option);
                setOpen(false);
                setFocusedIndex(null);
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
