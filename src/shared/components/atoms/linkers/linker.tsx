import { Link, LinkProps } from "react-router-dom";

interface LinkerProps extends Omit<LinkProps, "to"> {
  href: string; // to -> href

  // reloadDocument?: boolean;
  // replace?: boolean;
  // state?: any;
  // preventScrollReset?: boolean;
  // relative?: RelativeRoutingType;
  // viewTransition?: boolean;
}

export const Linker = (props: LinkerProps) => {
  const { href = "/", className, style, children, ...rest } = props;
  return (
    <Link to={href} className={className} style={style} {...rest}>
      {children}
    </Link>
  );
};
