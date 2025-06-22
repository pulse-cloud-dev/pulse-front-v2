import type { HTMLAttributes, PropsWithChildren } from "react";
import { BaseButton } from "../../atoms";
import { ResetSelection } from "../../atoms/reset/resetSelection";

interface FooterProps extends HTMLAttributes<HTMLElement>, PropsWithChildren {
  className?: string;
  onReset: () => void;
  onClose: () => void;
  onApply: () => void;
}

//Footer
export const Footer = ({ className = "", onReset, onClose, onApply, ...restProps }: FooterProps) => (
  <footer 
    className="popup-footer" 
    aria-label="필터 적용 영역"
    {...restProps}
  >
    <ResetSelection 
      className={className} 
      onClick={onReset} 
      aria-label="선택한 필터 초기화"
    />
    <div className="popup-footer__right">
      <BaseButton 
        color="reverse" 
        onClick={onClose}
        aria-label="모달 닫기"
      >
        닫기
      </BaseButton>
      <BaseButton 
        color="teal" 
        onClick={onApply}
        aria-label="선택한 필터 적용"
      >
        적용
      </BaseButton>
    </div>
  </footer>
); 