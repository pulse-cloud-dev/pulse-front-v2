import { CheckField, useCheckFieldGroup } from "@/shared/modules/select-ui";
import type { HTMLAttributes, PropsWithChildren } from "react";
import { BaseButton } from "../../atoms";

interface HeaderProps extends HTMLAttributes<HTMLElement>, PropsWithChildren {}
const Header = (props: HeaderProps) => {
  const { className, children, ...restProps } = props;
  return (
    <header className={`popup--online__header ${className}`} {...restProps}>
      {children}
    </header>
  );
};

interface BodyProps extends HTMLAttributes<HTMLDivElement>, PropsWithChildren {}
const Body = (props: BodyProps) => {
  const { className, children, ...restProps } = props;
  const { checkedItems, toggle } = useCheckFieldGroup({
    initialValues: {
      option1: true,
      option2: false,
    },
  });

  return (
    <div className={`popup--online__body ${className}`} {...restProps}>
      <CheckField className="check-field-module" variant="circle">
        <CheckField.Input checkId="option1" name="option1" isChecked={checkedItems.option1} onChange={() => toggle("option1")} />
        <CheckField.Label checkId="option1">분야 텍스트</CheckField.Label>
      </CheckField>
      <CheckField className="check-field-module" variant="circle">
        <CheckField.Input checkId="option2" name="option2" isChecked={checkedItems.option1} onChange={() => toggle("option1")} />
        <CheckField.Label checkId="option2">분야 텍스트</CheckField.Label>
      </CheckField>{" "}
    </div>
  );
};

interface FooterProps extends HTMLAttributes<HTMLElement>, PropsWithChildren {}
const Footer = (props: FooterProps) => {
  const { className, children, ...restProps } = props;
  return (
    <footer className={`popup--online__footer ${className}`} {...restProps}>
      <div className="popup--online__footer--left">선택 초기화</div>
      <div className="popup--online__footer--right">
        <BaseButton color="reverse">닫기</BaseButton>
        <BaseButton color="primary">신청</BaseButton>
      </div>
    </footer>
  );
};

export function OnlineStatusPopup() {
  return (
    <div className="popup--online">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}
