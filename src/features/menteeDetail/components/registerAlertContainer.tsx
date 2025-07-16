import { createPortal } from "react-dom";
import { Alert } from "@/shared/modules"; 
import { usePageNavigation } from "@/shared/lib/hooks";

interface RegisterAlertContainerProps {
  body?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const RegisterAlertContainer = ({
  body,
  onCancel,
  onConfirm,
}: RegisterAlertContainerProps) => {

  const { goToPage } = usePageNavigation();

  return createPortal(
    <Alert
      title="신청이 완료되었습니다."
      body={body}
      cancelText="닫기"
      confirmText="마이페이지로 이동"
      onCancel={onCancel}
      onConfirm={() => goToPage("/my-page")}
      style={{
        height: 100,
      }}
    />,
    document.getElementById("portal-root")!
  );
};
