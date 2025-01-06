import type { HTMLAttributes, PropsWithChildren } from "react";
import { forwardRef } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, PropsWithChildren {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>((props, forwardedRef) => {
  const { as: Component = "h3", className, style, children, ...rest } = props;
  return (
    <Component ref={forwardedRef} className={className} style={style} {...rest}>
      {children}
    </Component>
  );
});
