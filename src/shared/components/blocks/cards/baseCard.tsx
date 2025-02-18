import type { HTMLAttributes, PropsWithChildren } from "react";

type DefaultElement = HTMLAttributes<HTMLDivElement> & PropsWithChildren;

interface BaseCardContainerProps extends DefaultElement {}
const Container = (props: BaseCardContainerProps) => {
  const { className, style, children, ...rest } = props;
  return (
    <div className={`card__base ${className}`} style={style} {...rest}>
      {children}
    </div>
  );
};

interface BaseCardHeaderProps extends DefaultElement {}
const Header = (props: BaseCardHeaderProps) => {
  const { className, style, children, ...rest } = props;
  return (
    <div className={`baseCard head ${className}`} style={style} {...rest}>
      {children}
    </div>
  );
};

interface BaseCardBodyProps extends DefaultElement {}
const Body = (props: BaseCardBodyProps) => {
  const { className, style, children, ...rest } = props;
  return (
    <div className={`baseCard body ${className}`} style={style} {...rest}>
      {children}
    </div>
  );
};

interface BaseCardFooterProps extends DefaultElement {}
const Footer = (props: BaseCardFooterProps) => {
  const { className, style, children, ...rest } = props;
  return (
    <div className={`baseCard footer ${className}`} style={style} {...rest}>
      {children}
    </div>
  );
};

export const BaseCard = Object.assign(Container, {
  Header,
  Body,
  Footer,
});
