import { forwardRef } from "react";
import type { BadgeProps } from "./badge.type";

interface SquareBadgeProps extends BadgeProps {
  title?: string;
  color?: "blue" | "purple";
}
export const SquareBadge = forwardRef<HTMLElement, SquareBadgeProps>((props, forwardedRef) => {
  const { title = "제목없음", color = "blue", className, style, children, ...rest } = props;
  return (
    <span ref={forwardedRef} className={`badge__square ${className} ${color}`} style={style} {...rest}>
      {title || children}
    </span>
  );
});
