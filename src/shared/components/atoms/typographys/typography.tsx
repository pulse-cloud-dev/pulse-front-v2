import type { PropsWithChildren, HTMLAttributes } from "react";
import { forwardRef } from "react";

interface TypographyProps extends HTMLAttributes<HTMLSpanElement>, PropsWithChildren {
  variant?: "title" | "compact" | "body";
  size?: "11" | "12" | "13" | "14" | "15" | "16" | "18" | "20" | "24" | "28" | "36" | "40" | "48" | "56";
}

export const Typography = forwardRef<HTMLSpanElement, TypographyProps>((props, forwardedRef) => {
  const { variant = "title", size = "18", className, style, children, ...rest } = props;

  return (
    <span ref={forwardedRef} className={`${variant} ${variant}-${size}`} style={style} {...rest}>
      {children}
    </span>
  );
});
