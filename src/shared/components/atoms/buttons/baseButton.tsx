import type { PropsWithChildren, HTMLAttributes } from "react";
import { forwardRef } from "react";

interface BaseButtonProps extends PropsWithChildren, HTMLAttributes<HTMLButtonElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  color?: "bk" | "wh" | "default" | "primary" | "reverse" | "teal" ;
}

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>((props, forwardedRef) => {
  const { className, size = "md", color = "default", style, children, ...restProps } = props;
  return (
    <button ref={forwardedRef} className={`btn btn--base ${size} ${color} ${className}`} style={style} {...restProps}>
      {children}
    </button>
  );
});
