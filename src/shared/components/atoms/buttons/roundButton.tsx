import type { PropsWithChildren, HTMLAttributes } from "react";
import { forwardRef } from "react";

interface RoundButtonProps extends PropsWithChildren, HTMLAttributes<HTMLButtonElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}

export const RoundButton = forwardRef<HTMLButtonElement, RoundButtonProps>((props) => {
  const { className, size = "md", style, children, ...restProps } = props;
  return (
    <button className={`btn btn--round ${size} ${className}`} style={style} {...restProps}>
      {children}
    </button>
  );
});
