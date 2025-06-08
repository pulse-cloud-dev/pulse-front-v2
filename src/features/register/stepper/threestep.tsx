import { StepProps } from "./type/stepstype";
import { BaseButton, Typography } from "@/shared/components";
import { HTMLAttributes, PropsWithChildren } from "react";
import { Modal } from "@/shared/modules";
// FooterProps 타입 정의
interface FooterProps extends HTMLAttributes<HTMLElement>, PropsWithChildren {
  onPrev: () => void;
  onNext: () => void;
}

// Footer 컴포넌트 정의
const Footer = ({ className = "", children, onPrev, onNext, ...restProps }: FooterProps) => {
  return (
    <footer className={`popup--online__footer ${className}`} {...restProps}>
      <div className="popup--online__footer--right">
        <BaseButton color="reverse" onClick={onPrev}>
          나중에
        </BaseButton>
        <BaseButton color="primary" onClick={onNext}>
          지금등록
        </BaseButton>
      </div>
      {children}
    </footer>
  );
};

interface BodyProps extends HTMLAttributes<HTMLDivElement>, PropsWithChildren {}
const Body = (props: BodyProps) => {
  const { className, children, ...restProps } = props;
  return (
    <div className={`popup--online__body ${className}`} {...restProps}>
      이건 body입니다~
    </div>
  );
};
export const ThreeStep: React.FC<StepProps> = ({ onNext, onPrev }) => {
  return (
    <div>
      <div className="popup--online">
        <Modal id="2" title="step3">
          <Body />
          <Footer onNext={onNext} onPrev={onPrev} />
        </Modal>
      </div>
    </div>
  );
};
