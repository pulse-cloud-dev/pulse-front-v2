import React, { useState, useRef, useId, forwardRef } from "react";
import DatePicker from "react-datepicker";
import { Icon } from "../../atoms";
import "react-datepicker/dist/react-datepicker.css";
interface DatePickerFieldProps {
  label?: string;
  name?: string;
  selected?: Date | null;
  onChange?: (date: Date | null) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  placeholderText?: string;
  dateFormat?: string;
  labelSize?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  isValid: boolean;
}

export const DatePickerField = forwardRef<HTMLInputElement, DatePickerFieldProps>(
  (
    {
      isValid,
      label,
      name,
      selected = null,
      onChange,
      onFocus,
      onBlur,
      error,
      disabled = false,
      placeholderText = "날짜를 선택하세요",
      dateFormat = "yyyy년MM월dd일",
      labelSize = "md",
      className = "",
      minDate = new Date("2000-01-01"),
      maxDate = new Date("2099-12-31"),
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const datePickerRef = useRef<DatePicker>(null);

    // 고유 ID 생성
    const inputId = useId();
    const errorId = useId();

    const handleChange = (date: Date | null) => {
      onChange?.(date);
    };

    const handleIconClick = () => {
      if (!disabled) {
        setIsOpen((prev) => !prev);
      }
    };

    return (
      <div className={` ${error ? "text-field--error" : ""} ${disabled ? "text-field--disabled" : ""} ${className}`} style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
        {label && (
          <label htmlFor={inputId} className={`form-field__label ${labelSize}`}>
            {label}
          </label>
        )}

        <div style={{ position: "relative" }}>
          <DatePicker
            locale="ko"
            ref={datePickerRef}
            id={inputId}
            name={name}
            selected={selected}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            dateFormat={dateFormat}
            placeholderText={placeholderText}
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            className={`form-field__input ${error ? "border-red-500" : ""}`}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? errorId : undefined}
            open={isOpen}
            onClickOutside={() => setIsOpen(false)}
            onSelect={() => setIsOpen(false)}
          />
          <Icon
            onClick={handleIconClick}
            src="calendar_bk_16"
            alt=""
            aria-hidden="true"
            className={`w24 h24 ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            style={{
              position: "absolute",
              right: "10px",
              top: "8px",
            }}
          />
        </div>

        {error && isValid && (
          <p id={errorId} className="text-field__error" role="alert" aria-live="polite">
            {error}
          </p>
        )}
      </div>
    );
  }
);
