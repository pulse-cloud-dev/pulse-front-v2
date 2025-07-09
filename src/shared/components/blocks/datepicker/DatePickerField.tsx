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
  labelSize?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  isValid?: boolean;
}

// CustomDateInput 컴포넌트 정의
const CustomDateInput = forwardRef<
  HTMLInputElement,
  { placeholderText: string; value?: string; onClick?: () => void; className?: string; disabled?: boolean; placeholder?: string; error?: boolean; errorId?: string; onBlur?: () => void; onFocus?: () => void }
>(({ value, onClick, className, disabled, placeholderText, error, errorId, onBlur, onFocus }, ref) => (
  <div style={{ position: "relative" }}>
    <input
      ref={ref}
      className={`form-field__input ${error ? "error-border" : ""} ${className || ""}`}
      value={value}
      onClick={onClick}
      onBlur={onBlur}
      onFocus={onFocus}
      placeholder={placeholderText}
      disabled={disabled}
      readOnly
      aria-invalid={error ? "true" : "false"}
      aria-describedby={error ? errorId : undefined}
    />
    <div
      style={{
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        opacity: disabled ? 0.5 : 0.8,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="calendar">
          <path
            id="Icon"
            d="M14 6.66668H2M10.6667 1.33334V4.00001M5.33333 1.33334V4.00001M5.2 14.6667H10.8C11.9201 14.6667 12.4802 14.6667 12.908 14.4487C13.2843 14.2569 13.5903 13.951 13.782 13.5747C14 13.1468 14 12.5868 14 11.4667V5.86668C14 4.74657 14 4.18652 13.782 3.7587C13.5903 3.38237 13.2843 3.07641 12.908 2.88466C12.4802 2.66668 11.9201 2.66668 10.8 2.66668H5.2C4.0799 2.66668 3.51984 2.66668 3.09202 2.88466C2.71569 3.07641 2.40973 3.38237 2.21799 3.7587C2 4.18652 2 4.74657 2 5.86668V11.4667C2 12.5868 2 13.1468 2.21799 13.5747C2.40973 13.951 2.71569 14.2569 3.09202 14.4487C3.51984 14.6667 4.0799 14.6667 5.2 14.6667Z"
            stroke="black"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  </div>
));

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

    return (
      <div className={`${isValid ? "" : ""} ${disabled ? "text-field--disabled" : ""} ${className}`} style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
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
            dateFormat={dateFormat}
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            open={isOpen}
            onClickOutside={() => setIsOpen(false)}
            onSelect={() => setIsOpen(false)}
            customInput={<CustomDateInput className="form-field__input " placeholderText={placeholderText} disabled={disabled} placeholder={placeholderText} error={!isValid} errorId={errorId} onBlur={onBlur} onFocus={onFocus} />}
          />
        </div>

        {error && !isValid && (
          <p id={errorId} className="text-field__error" role="alert" aria-live="polite" style={{ marginTop: "4px" }}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

// 사용 예제
// const ExampleUsage = () => {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [isValid, setIsValid] = useState(true);
//
//   return (
//     <DatePickerField
//       label="생년월일"
//       selected={selectedDate}
//       onChange={setSelectedDate}
//       isValid={isValid}
//       error={!isValid ? "올바른 날짜를 선택해주세요" : ""}
//       placeholderText="날짜를 선택하세요"
//     />
//   );
// };
