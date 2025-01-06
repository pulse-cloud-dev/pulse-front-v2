import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import type { FieldConfig } from "../types/index.type";
import { type UseFormManagerOptions, useFormManager } from "../utils/formManager";
import { FormField } from "./formField";

interface DynamicFormProps extends HTMLAttributes<HTMLFormElement> {
  fields: FieldConfig[];
  handleSubmit: UseFormManagerOptions["handleSubmit"];

  schema: Record<string, any>;

  submitTitle?: string;
  labelClass?: string;
  inputClass?: string;
  submitClass?: string;
}
export const DynamicForm = forwardRef<HTMLFormElement, DynamicFormProps>((props, forwardedRef) => {
  const {
    className,
    children,
    fields,
    handleSubmit,
    schema,
    // style class
    submitTitle = "Submit",
    labelClass,
    inputClass,
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
      <button type="submit" className={`${submitClass} ${disabled ? "disabled" : ""}`} disabled={disabled}>
        {submitTitle}
      </button>
    </form>
  );
});
