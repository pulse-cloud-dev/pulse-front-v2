import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

// import type { FieldConfig } from "../types/index.type";
// import { type UseFormManagerOptions, useFormManager } from "../utils/formManager";
import { FormField } from "./formField";
import { CheckboxItem } from "../../checkbox";
import { SignUpRequestDTO } from "@/contracts";


//#region index.type.ts
interface IFormData {
  [key: string]: string;
}

interface FieldConfig {
  name: string;
  label: string;
  type?: string;      // 입력 타입 (예: text, email, password)
  required?: boolean; //필수 항목
  placeholder?: string;
  edit?: boolean;     //비활성화
  regular ?: string;  //정규식
}
//#endregion


//#region formManager.ts`
interface UseFormManagerOptions {
  handleSubmit: (data: IFormData) => void;
  schema: Record<string, any>;
}


function useFormManager(fields: FieldConfig[], options: UseFormManagerOptions) {
  const [formData, setFormData] = useState<IFormData>({});
  const [errors, setErrors] = useState<IFormData>({});
  const [disabled, setDisabled] = useState<boolean>(false);
  /**
   * @description Change 핸들러
   * @param {ChangeEvent<HTMLInputElement>} e
   */
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const isValid = Object.keys(options.schema).every((key) => {
      return value.length >= options.schema[key];
    });

    setDisabled(!isValid);
  };

  /**
   * @description 폼 제출 핸들러
   * @param {FormEvent} e
   */
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // 유효성 검사를 통과한 경우 데이터 제출
      options.handleSubmit(formData);
    }
  };

  /**
   * @description 유효성 검사
   */
  const validateForm = (): boolean => {
    const newErrors: IFormData = ({});
    fields.forEach(({ name, label, required }) => {
      if (required && !formData[name]?.trim()) {
        newErrors[name] = `${label} is required.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    disabled,
    formData,
    setFormData,
    errors,
    setErrors,

    onChange,
    onSubmit,
  };
}
//#endregion

interface DynamicFormProps extends HTMLAttributes<HTMLFormElement> {
  fields: FieldConfig[];
  handleSubmit: UseFormManagerOptions["handleSubmit"];

  schema: Record<string, any>;

  // On Click
  onClickCancel?: () => void;
  // Button Title
  cancelTitle?: string;
  submitTitle?: string;

  // Class
  labelClass?: string;
  inputClass?: string;
  cancelClass?: string;
  submitClass?: string;
}
export const DynamicFormV2 = forwardRef<HTMLFormElement, DynamicFormProps>((props, forwardedRef) => {
  const {
    className,
    children,
    fields,
    handleSubmit,
    schema,
    // On Click
    onClickCancel,

    // style class
    cancelTitle = "cancel",
    submitTitle = "Submit",

    labelClass,
    inputClass,
    cancelClass,
    submitClass,
  } = props;

  const { disabled, formData, errors, onChange, onSubmit } = useFormManager(fields, { handleSubmit, schema });

  return (
    <form className={className} onSubmit={onSubmit} ref={forwardedRef}>
      {fields.map((field) => (
        <FormField
          key={field.name}
          type={field.type || "text"}
          label={field.label}
          name={field.name}
          value={formData[field.name] || ""}
          placeholder={field.placeholder}
          required={field.required}
          onChange={onChange}
          isInvalid={!!errors[field.name]} // 유효성 검사 상태
          errorMessage={errors[field.name]} // 에러 메시지 전달
          labelClass={labelClass}
          inputClass={inputClass}
        />
      ))}
      {children}
      <div className="flex_r align_center justify_center gap_8 m-t-40">
        {cancelTitle !== "cancel" && (
          <button type="button" className={cancelClass} onClick={onClickCancel}>
            {cancelTitle}
          </button>
        )}
        <button type="submit" className={`${submitClass} ${disabled ? "disabled" : ""}`} disabled={disabled}>
          {submitTitle}
        </button>
      </div>
    </form>
  );
});



