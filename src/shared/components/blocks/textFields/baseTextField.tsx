import { useState, useId, forwardRef } from "react";

interface TextFieldProps {
  label?: string;
  value?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  labelSize?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  className?: string;
}

export const BaseTextField = forwardRef<HTMLInputElement, TextFieldProps>(({ className = "", label, value, placeholder, error, disabled, onChange, labelSize = "md" }, ref) => {
  const [inputValue, setInputValue] = useState(value || "");

  // 고유 ID 생성
  const inputId = useId();
  const errorId = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className={`text-field ${error ? "text-field--error" : ""} ${disabled ? "text-field--disabled" : ""} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={`text-field__label ${labelSize}`}>
          {label}
        </label>
      )}

      <input
        ref={ref}
        type="text"
        id={inputId}
        className="text-field__input"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? errorId : undefined}
      />

      {error && (
        <p id={errorId} className="text-field__error" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
});
