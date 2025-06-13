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
const Footer = ({ onPrev, onNext }: FooterProps) => {
  return (
    <footer
      style={{
        marginLeft: "auto",
        display: "flex",
        gap: "8px",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "24px",
      }}
    >
      <BaseButton color="reverse" onClick={onPrev}>
        나중에
      </BaseButton>
      <BaseButton color="primary" onClick={onNext}>
        지금등록
      </BaseButton>
    </footer>
  );
};

interface BodyProps extends HTMLAttributes<HTMLDivElement>, PropsWithChildren {}
const Body = (props: BodyProps) => {
  return (
    <div style={{ marginTop: "16px", marginLeft: "24px", marginRight: "24px" }}>
      <Typography size="14" weight="regular">
        2가지만 더 등록하면 맞춤 알림을 받아보실 수 있어요
      </Typography>
    </div>
  );
};
// OneStep 컴포넌트 정의
export const OneStep: React.FC<StepProps> = ({ onNext, onPrev }) => (
  <div className="modal_box on">
    <div className="popup--step__layout">
      <Header />
      <Body />
      <Footer onNext={onNext} onPrev={onPrev} />
    </div>
  </div>
);

const Header = () => {
  return (
    <div style={{ marginTop: "32px", marginRight: "24px", marginLeft: "24px" }}>
      <Typography>멘토등록이 완료되었어요</Typography>
    </div>
  );
};
