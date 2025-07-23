import { useState, useRef, useId, forwardRef } from "react";
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
  labelSize?: "hidden" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  isValid?: boolean;
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
      placeholderText = "ex)202507",
      dateFormat = "yyyyMM",
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
      <div className={` ${isValid ? "" : ""} ${disabled ? "text-field--disabled" : ""} ${className}`} style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
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
            onBlur={onBlur}
            onFocus={onFocus}
            dateFormat={dateFormat}
            placeholderText={placeholderText}
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            className={`form-field__input ${isValid ? "" : "error-border"}`}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? errorId : undefined}
            open={isOpen}
            onClickOutside={() => setIsOpen(false)}
            onSelect={() => setIsOpen(false)}
          />
          <Icon
            onClick={handleIconClick}
            src="calendar_bk_16"
            alt="달력 아이콘"
            aria-hidden="true"
            className={`w24 h24 ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
            }}
          />
        </div>

        {error && !isValid && (
          <p id={errorId} className="text-field__error" role="alert" aria-live="polite" style={{ position: "absolute", marginTop: "81px" }}>
            {error}
          </p>
        )}
      </div>
    );
  }
);
