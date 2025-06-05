import type { HTMLAttributes } from "react";
import { BaseButton } from "../../../../atoms";
import { ResetSelection } from "../../../../atoms/reset/resetSelection";

// 🔹 Footer
export const Footer = ({ className = "local", ...props }: HTMLAttributes<HTMLElement>) => (
  <footer className={`popup-local__footer ${className}`} {...props}>
    <ResetSelection className={className} />
    <div className="popup-local__footer-right">
      <BaseButton color="reverse">닫기</BaseButton>
      <BaseButton color="teal">적용</BaseButton>
    </div>
  </footer>
); 