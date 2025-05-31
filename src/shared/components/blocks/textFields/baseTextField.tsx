import { useState } from "react";

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

export const BaseTextField = ({ className = "", label, value, placeholder, error, disabled, onChange, labelSize = "md" }: TextFieldProps) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className={`text-field ${error ? "text-field--error" : ""} ${disabled ? "text-field--disabled" : ""} ${className}`}>
      {label && <label className={`text-field__label ${labelSize}`}>{label}</label>}
      <input type="text" className="text-field__input" value={inputValue} onChange={handleChange} placeholder={placeholder} disabled={disabled} />
      {error && <p className="text-field__error">{error}</p>}
    </div>
  );
};

// 🌟 Vanilla Extract 스타일링
// const textFieldContainer = style({
//   display: "flex",
//   flexDirection: "column",
//   gap: "4px",
// });

// const labelStyle = style({
//   fontSize: "14px",
//   fontWeight: "bold",
// });

// const inputRecipe = recipe({
//   base: {
//     padding: "10px",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//     fontSize: "16px",
//     outline: "none",
//     transition: "border-color 0.2s",
//     ":focus": {
//       borderColor: "#007bff",
//     },
//   },
//   variants: {
//     error: {
//       true: {
//         borderColor: "red",
//       },
//     },
//     disabled: {
//       true: {
//         backgroundColor: "#f5f5f5",
//         cursor: "not-allowed",
//       },
//     },
//   },
// });

// const errorStyle = style({
//   color: "red",
//   fontSize: "12px",
// });
