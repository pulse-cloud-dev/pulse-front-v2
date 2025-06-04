import { useState, useRef, createContext, ReactElement, useContext, ReactNode, useEffect, Children, isValidElement, useMemo } from "react";
import { Icon } from "../atoms";

import React from "react";
interface DropdownContextProps {
  onSelect: (value: string) => void;
  selected: string;
  focusedIndex: number;
  itemsRef: React.MutableRefObject<(HTMLLIElement | null)[]>;
  id: string;
}

const DropdownContext = createContext<DropdownContextProps | null>(null);

interface DropdownProps {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  onBlur: () => void;
  onFocus: () => void;
  errorMessage?: string;
  hasError?: boolean;
  children: ReactNode;
  className?: string;
  itemClassName?: string;
}

export const Dropdown = ({ id, label, value, onChange, onBlur, onFocus, errorMessage, hasError = false, children, className = "" }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  const options = useMemo(() => {
    return Children.toArray(children)
      .filter((child): child is ReactElement => isValidElement(child))
      .map((child) => child.props.value)
      .filter((value): value is string => typeof value === "string");
  }, [children]);

  const handleBlur = (e: React.FocusEvent) => {
    if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
      onBlur();
      setOpen(false);
      setFocusedIndex(-1);
    }
  };

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
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
          setFocusedIndex((prev) => Math.min(prev + 1, options.length - 1));
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
        } else if (focusedIndex >= 0 && options[focusedIndex]) {
          handleSelect(options[focusedIndex]);
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

  useEffect(() => {
    if (focusedIndex >= 0 && itemsRef.current[focusedIndex]) {
      itemsRef.current[focusedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [focusedIndex]);

  return (
    <div className={`dropdown-container ${className}`} ref={wrapperRef} onBlur={handleBlur} onFocus={onFocus}>
      <label htmlFor={id} className="dropdown-label">
        {label}
      </label>
      <button
        id={id}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-activedescendant={focusedIndex >= 0 ? `${id}-option-${focusedIndex}` : ""}
        aria-describedby={hasError && errorMessage ? `${id}-error` : undefined}
        className={`dropdown-trigger relative ${hasError ? "dropdown-error" : ""}`}
        aria-invalid={hasError}
      >
        {value || "선택하세요"}
        <Icon className={`icon__arrow img_to_bk80 absolute ${open ? "" : "on"}`} src="chevron_down_bk_16" alt="화살표" style={{ right: "10px" }} />
      </button>

      {open && (
        <ul role="listbox" className="dropdown-list" style={{ marginBottom: "4px'" }}>
          <DropdownContext.Provider
            value={{
              onSelect: handleSelect,
              selected: value,
              focusedIndex,
              itemsRef,
              id,
            }}
          >
            {Children.toArray(children)
              .filter((child): child is ReactElement => isValidElement(child))
              .map((child, index) =>
                React.cloneElement(child, {
                  index,
                  key: index,
                })
              )}
          </DropdownContext.Provider>
        </ul>
      )}

      {hasError && errorMessage && (
        <div className="dropdown-error-message" role="alert" id={`${id}-error`}>
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
  index?: number;
}

export const DropdownItem = ({ value, children, className = "", index }: DropdownItemProps) => {
  const context = useContext(DropdownContext);
  if (!context || index === undefined) {
    throw new Error("DropdownItem must be used within a Dropdown and receive an index");
  }

  const { onSelect, selected, focusedIndex, itemsRef, id } = context;

  const isFocused = focusedIndex === index;

  const handleClick = () => {
    onSelect(value);
  };
  return (
    <li
      ref={(el) => {
        if (itemsRef.current && index >= 0) {
          itemsRef.current[index] = el;
        }
      }}
      id={`${id}-option-${index}`}
      role="option"
      aria-selected={selected === value}
      className={`dropdown-item ${className} ${selected === value ? "selected" : ""} ${isFocused ? "focused" : ""}`}
      onMouseDown={handleClick}
      data-value={value}
      data-index={index}
    >
      {children}
    </li>
  );
};
