import { createPortal } from "react-dom";
import { Alert } from "@/shared/modules";

interface InquiryAlertProps {
  onClose: () => void;
}

export const InquiryAlertContainer = ({ onClose }: InquiryAlertProps) => {
  return createPortal(
    <Alert
      title="멘토에게 전달되었습니다."
      body="문의한 내용은 멘토링 챗 > 임시채팅에서 확인할 수 있습니다."
      cancelText="닫기"
      confirmText="확인하기"
      onCancel={onClose}
      onConfirm={onClose}
    />,
    document.getElementById("portal-root")!
  );
};
