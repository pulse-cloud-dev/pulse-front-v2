import type { HTMLAttributes, ChangeEvent } from "react";

/**
 * @description 공통 FormField 컴포넌트
 * - 재사용 가능한 컴포넌트
 */

interface FormFieldProps extends HTMLAttributes<HTMLElement> {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormField = ({ label, name, value, onChange }: FormFieldProps) => (
  <div>
    <label>
      {label}
      <input name={name} value={value} onChange={onChange} />
    </label>
  </div>
);
