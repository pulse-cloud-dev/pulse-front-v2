import type { HTMLAttributes, PropsWithChildren } from "react";
import { Children, forwardRef, useState, cloneElement, isValidElement } from "react";

export interface AccordionProps {
  isActive: boolean;
  toggle: () => void;
}

export interface AccordionWrapperProps extends HTMLAttributes<HTMLUListElement>, PropsWithChildren {}

const AccordionWrapper = forwardRef<HTMLUListElement, AccordionWrapperProps>((props, forwardedRef) => {
  const { style, children, ...rest } = props;

  return (
    <ul className="accordion__wrap" ref={forwardedRef} style={style} {...rest}>
      {children}
    </ul>
  );
});

export interface AccordionItemProps {
  initialValue?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode | ((props: AccordionProps) => React.ReactNode);
}

const AccordionItem = forwardRef<HTMLLIElement, AccordionItemProps>((props, forwardedRef) => {
  const { initialValue = false, style, children, ...rest } = props;
  const [isActive, setIsActive] = useState<boolean>(initialValue);

  const toggle = () => setIsActive(!isActive);

  let content;

  // children이 함수일 경우 isActive, toggle을 전달
  if (typeof children === "function") {
    content = children({ isActive, toggle });
  } else {
    // children이 ReactElement인 경우 isActive, toggle을 props로 전달
    content = Children.map(children, (child) => {
      if (isValidElement<AccordionProps>(child)) {
        return cloneElement(child, { isActive, toggle });
      }
      return child;
    });
  }

  return (
    <li ref={forwardedRef} style={style} className={`accordion__item ${isActive ? "active" : ""}`} {...rest}>
      {content}
    </li>
  );
});

export const Accordion = Object.assign(AccordionWrapper, {
  Item: AccordionItem,
});
