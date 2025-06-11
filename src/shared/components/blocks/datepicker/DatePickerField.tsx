import React from "react";
import DatePicker from "react-datepicker";
import { Icon } from "../../atoms";
import { useState, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerFieldProps {
  id?: string;
  label: string;
  name: string;
  selected: Date | null;

  onChange?: (date: Date | null) => void;
  onFocus?: () => void;
  onBlur?: () => void;

  isInvalid?: boolean;
  errorMessage?: string;

  placeholderText?: string;
  dateFormat?: string;
  inputClass?: string;
  labelClass?: string;
  wrapperClass?: string;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  id,
  name,
  selected,
  onChange,
  onFocus,
  onBlur,
  isInvalid = false,
  errorMessage,
  placeholderText = "날짜를 선택하세요",
  dateFormat = "yyyy년MM월dd일",
  inputClass = "dateinput",
  labelClass = "",
  wrapperClass = "",
}) => {
  const minDate = new Date("2000-01-01");
  const maxDate = new Date("2099-12-31");
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef(null);
  // 오류 메시지를 위한 ID 생성
  const errorId = id ? `${id}-error` : undefined;

  return (
    <div className={wrapperClass}>
      <label htmlFor={id} className={labelClass}>
        {label}

        <div style={{ position: "relative" }}>
          <DatePicker
            locale="ko"
            ref={datePickerRef}
            id={id}
            name={name}
            selected={selected}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            dateFormat={dateFormat}
            placeholderText={placeholderText}
            minDate={minDate}
            maxDate={maxDate}
            className={`${inputClass} ${isInvalid ? "border-red-500" : ""}`}
            aria-invalid={isInvalid}
            aria-describedby={isInvalid && errorId ? errorId : undefined}
            open={isOpen}
            onClickOutside={() => setIsOpen(false)}
            onSelect={() => setIsOpen(false)}
          />
          <Icon onClick={() => setIsOpen((prev) => !prev)} src="calendar_bk_16" alt="" aria-hidden="true" className="w24 h24" style={{ position: "absolute", right: "10px", top: "13px", cursor: "pointer" }} />
        </div>
      </label>
      {isInvalid && errorMessage && (
        <span id={errorId} className="text-field__error m-t-10" role="alert">
          {errorMessage}
        </span>
      )}
    </div>
  );
};
