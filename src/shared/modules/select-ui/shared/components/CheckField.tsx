import type { ForwardedRef, HTMLAttributes, PropsWithChildren } from "react";
import { forwardRef } from "react";

import type { CheckFieldVariants } from "../../types";

interface CheckFieldWrapper extends HTMLAttributes<HTMLElement>, PropsWithChildren {
  variant: CheckFieldVariants;
  size?: "md" | "lg";
  opacity?: "md" | "lg";
}
const CheckFieldWrapper = <T extends HTMLDivElement>(props: CheckFieldWrapper, forwardedRef: ForwardedRef<T>) => {
  const { className, variant = "square", size = "lg", opacity = "lg", style, children, ...rest } = props;
  return (
    <div
      ref={forwardedRef}
      // Props
      className={`${className} ${variant} ${opacity}  ${size} `}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};

interface CheckFieldInput extends HTMLAttributes<HTMLInputElement>, PropsWithChildren {
  checkId: string;
  name: string;
  isChecked: boolean;
  disabled?: boolean;
  hidden?: boolean;
}
const CheckFieldInput = <T extends HTMLInputElement>(props: CheckFieldInput, forwardedRef: ForwardedRef<T>) => {
  const { checkId = "", name = "", isChecked = false, disabled = false, hidden = false, className, style, children, ...rest } = props;
  return (
    <input
      ref={forwardedRef}
      // Props
      id={checkId}
      type="checkbox"
      className={className}
      name={name}
      checked={isChecked}
      disabled={disabled}
      hidden={false}
      style={style}
      {...rest}
    />
  );
};

interface CheckFieldLabel extends HTMLAttributes<HTMLLabelElement>, PropsWithChildren {
  checkId: string;
}
const CheckFieldLabel = <T extends HTMLLabelElement>(props: CheckFieldLabel, forwardedRef: ForwardedRef<T>) => {
  const { checkId = "", className, style, children, ...rest } = props;
  return (
    <label
      ref={forwardedRef}
      // Props
      htmlFor={checkId}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </label>
  );
};

export const CheckField = Object.assign(forwardRef(CheckFieldWrapper), {
  Input: forwardRef(CheckFieldInput),
  Label: forwardRef(CheckFieldLabel),
});
