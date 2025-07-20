import { useState, useRef, createContext, useContext, ReactNode, useEffect } from "react";
import { Icon } from "../../atoms";
import React from "react";
interface DropdownContextProps {
  onSelect: (value: string) => void;
  selected: string;
  focusedIndex: number;
  itemsRef: React.MutableRefObject<(HTMLLIElement | null)[]>;
  id: string;
  registerItem: (value: string) => number;
  unregisterItem: (value: string) => void;
}
const DropdownContext = createContext<DropdownContextProps | null>(null);

let cnt = 0;
interface DropdownProps {
  id: string;
  label: string;
  value: string;
  onChange?: (val: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  errorMessage?: string;
  hasError?: boolean;
  children: ReactNode;
  className?: string;
  itemClassName?: string;
}

export const Dropdown = ({ id, label, value, onChange, onBlur, onFocus, errorMessage, hasError = false, children, className = "" }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [registeredItems, setRegisteredItems] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  // 아이템 등록/해제 관리
  const registerItem = (value: string): number => {
    setRegisteredItems((prev) => {
      if (!prev.includes(value)) {
        const newItems = [...prev, value];
        return newItems;
      }
      return prev;
    });
    return registeredItems.indexOf(value) !== -1 ? registeredItems.indexOf(value) : registeredItems.length;
  };

  const unregisterItem = (value: string) => {
    setRegisteredItems((prev) => prev.filter((item) => item !== value));
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
      onBlur && onBlur();
      setOpen(false);
      setFocusedIndex(-1);
    }
  };

  const handleSelect = (selectedValue: string) => {
    onChange && onChange(selectedValue);
    setOpen(false);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) => Math.min(prev + 1, registeredItems.length - 1));
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (open) {
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setFocusedIndex(0);
        } else if (focusedIndex >= 0 && registeredItems[focusedIndex]) {
          handleSelect(registeredItems[focusedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        setFocusedIndex(-1);
        break;
      case "Tab":
        setOpen(false);
        setFocusedIndex(-1);
        break;
    }
  };
  /*
height: 200px;
/ overflow-y: auto;
설정 할것,자동 focus 설정
*/
  useEffect(() => {
    if (focusedIndex >= 0 && itemsRef.current[focusedIndex]) {
      itemsRef.current[focusedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [focusedIndex]);

  useEffect(() => {
    return () => {
      setRegisteredItems([]);
    };
  }, []);
  open === true ? "" : (cnt = 0);
  return (
    <div className={`dropdown-container ${className}`} ref={wrapperRef} onBlur={handleBlur} onFocus={onFocus} style={{ position: "relative" }}>
      <label htmlFor={id} className="dropdown-label">
        {label}
      </label>
      <button
        id={id}
        type="button"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-activedescendant={focusedIndex >= 0 ? `${id}-option-${focusedIndex}` : ""}
        aria-describedby={hasError && errorMessage ? `${id}-error` : undefined}
        className={`dropdown-trigger relative ${hasError ? "dropdown-error" : ""}`}
        aria-invalid={hasError}
        style={{ display: "flex", alignItems: "center" }}
      >
        <span style={{ color: value ? "inherit" : "#CECECE" }}>{value || "선택하세요"}</span>
        <Icon className={`icon__arrow img_to_bk80 absolute ${open ? "" : "on"}`} src="chevron_down_bk_16" alt="화살표" style={{ right: "10px" }} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="dropdown-list"
          style={{
            border: "1px solid #E0E0E0",
            borderRadius: "10px",
            maxHeight: "200px",
            overflowY: "auto",
            top: "70px",
            position: "absolute",
            boxShadow: "2px 2px 10px rgba(18, 18, 18, 0.1)",
          }}
        >
          <DropdownContext.Provider
            value={{
              onSelect: handleSelect,
              selected: value,
              focusedIndex,
              itemsRef,
              id,
              registerItem,
              unregisterItem,
            }}
          >
            {children}
          </DropdownContext.Provider>
        </ul>
      )}

      {hasError && errorMessage && (
        <div className="dropdown-error-message" role="alert" id={`${id}-error`} style={{ position: "absolute", marginTop: "81px" }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

interface DropdownItemProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const DropdownItem = ({ value, children, className = "" }: DropdownItemProps) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("DropdownItem must be used within a Dropdown");
  }

  const { onSelect, selected, focusedIndex, itemsRef, id, registerItem, unregisterItem } = context;
  const [itemIndex, setItemIndex] = useState<number>(-1);

  useEffect(() => {
    registerItem(value);
    setItemIndex(cnt);
    cnt++;
    return () => {
      cnt--;
      unregisterItem(value);
    };
  }, [focusedIndex]);

  const isFocused = focusedIndex === itemIndex;

  const handleClick = () => {
    onSelect(value);
  };

  if (itemIndex === -1) {
    return null;
  }

  return (
    <li
      ref={(el) => {
        if (itemsRef.current && itemIndex >= 0) {
          itemsRef.current[itemIndex] = el;
        }
      }}
      id={`${id}-option-${itemIndex}`}
      role="option"
      aria-selected={selected === value}
      className={`dropdown-item ${className} ${selected === value ? "selected" : ""} ${isFocused ? "focused" : ""}`}
      onMouseDown={handleClick}
      data-value={value}
      data-index={itemIndex}
    >
      {children}
    </li>
  );
};
