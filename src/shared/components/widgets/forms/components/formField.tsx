import type { HTMLAttributes, ChangeEvent } from "react";
import { forwardRef } from "react";

/**
 * @description 공통 FormField 컴포넌트
 * - 재사용 가능한 컴포넌트
 * - 웹 접근성(WAI-ARIA) 및 표준을 준수
 *
 * aria-invalid와 aria-describedby:
 * 1) 유효성 검사 실패 시 화면 읽기 도구가 상태를 인식하도록 설정.
 * 2) 에러 메시지를 읽어주기 위해 aria-describedby 연결.
 *
 */
interface FormFieldProps extends HTMLAttributes<HTMLElement> {
  type?: string;
  id?: string; // 명시적으로 id를 받을 수 있도록 수정
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string; // 에러 메시지
  isInvalid?: boolean; // 유효성 상태
  labelClass?: string;
  inputClass?: string;
  errorClass?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>((props, forwardedRef) => {
  const { id, type = "text", name, label, value, placeholder, required = false, errorMessage, isInvalid = false, labelClass, inputClass, errorClass, onChange, style, ...rest } = props;

  const inputId = id || name; // 고유한 id 설정

  return (
    <div>
      <label htmlFor={inputId} className={labelClass}>
        {/* 라벨 */}
        <span className="color__grayscale-50 fs_12">{label}</span>
        {/* 라벨 */}

        {/* 필수 필드 표시 */}
        {required && (
          <span className="color__error fs_12" aria-hidden="true">
            {" "}
            *{" "}
          </span>
        )}
        {/* 필수 필드 표시 */}
      </label>
      <input
        ref={forwardedRef}
        id={inputId}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        aria-invalid={isInvalid} // 유효성 상태
        aria-describedby={isInvalid && errorMessage ? `${inputId}-error` : undefined} // 에러 메시지 연결
        className={inputClass}
        onChange={onChange}
        style={style}
        {...rest}
      />
      {isInvalid && errorMessage && (
        <span id={`input-error ${inputId}-error`} className={errorClass} role="alert">
          {errorMessage}
        </span>
      )}
    </div>
  );
});
