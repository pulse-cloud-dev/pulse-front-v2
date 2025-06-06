import type { HTMLAttributes, PropsWithChildren } from "react";
import { BaseButton } from "../../../../atoms";
import { ResetSelection } from "../../../../atoms/reset/resetSelection";

interface FooterProps extends HTMLAttributes<HTMLElement>, PropsWithChildren {
  className?: string;
  onReset: () => void;
  onClose: () => void;
  onApply: () => void;
}

// 🔹 Footer
export const Footer = ({ className = "local", onReset, onClose, onApply, ...restProps }: FooterProps) => (
  <footer className={`popup-local__footer ${className}`} {...restProps}>
    <ResetSelection className={className} onClick={onReset} />
    <div className="popup-local__footer-right">
      <BaseButton color="reverse" onClick={onClose}>닫기</BaseButton>
      <BaseButton color="teal" onClick={onApply}>적용</BaseButton>
    </div>
  </footer>
); 