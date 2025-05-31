import type { PropsWithChildren, HTMLAttributes } from "react";
import { forwardRef } from "react";

interface BaseButtonProps extends PropsWithChildren, HTMLAttributes<HTMLButtonElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>((props, ref) => {
  const { className, size = "md", style, children, ...restProps } = props;
  return (
    <button ref= {ref} className={`btn btn--base ${size} ${className}`} style={style} {...restProps}>
      {children}
    </button>
  );
});
