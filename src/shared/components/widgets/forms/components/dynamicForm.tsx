import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import type { FieldConfig } from "../types/index.type";
import { type UseFormManagerOptions, useFormManager } from "../utils/formManager";
import { FormField } from "./formField";

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
export const DynamicForm = forwardRef<HTMLFormElement, DynamicFormProps>((props, forwardedRef) => {
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
