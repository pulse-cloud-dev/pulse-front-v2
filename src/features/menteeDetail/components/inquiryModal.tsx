import { useState } from "react";
import { useKey } from "@/shared/modules/modals/shared/hooks/useKey";
import { Modal } from "@/shared/modules";
import { BaseButton } from "@/shared/components";
import { InquiryAlertContainer } from "./inquiryAlertContainer";

interface InquiryModalProps {
  id: string;
  onClose: () => void;
  onDone: () => void;
}

export const InquiryModal = ({ id, onClose, onDone}: InquiryModalProps) => {
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const maxLength = 1000;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    if (content.trim().length === 0) return;
    console.log("전송된 내용:", content);

    const confirmed = window.confirm(
        "문의 내용을 멘토에게 보내시겠습니까?\n문의 내용은 멘토링챗 > 임시채팅 내에서 확인할 수 있습니다."
    );

    if (!confirmed) return;
    
  onDone();// Alert 띄우기 

  };

  useKey("Escape", () => {
    onClose();
  });

  return (
    <>
    <Modal
      id={id}
      title="문의하기"
      closeModal={() => onClose()}
    >
      <div className="inquiry-modal__body">
        <div className="inquiry-modal__textarea-wrapper">
        <textarea
            className="inquiry-modal__textarea"
            placeholder="문의하실 내용을 입력해 주세요"
            maxLength={maxLength}
            value={content}
            onChange={handleChange}
        />
        </div>

        <div className="inquiry-modal__char-wrapper">
        <span className="inquiry-modal__char-count">
            {content.length} / {maxLength}
        </span>
        </div>

        <p className="inquiry-modal__note">
            문의는 한 번만 보낼 수 있고, 보낸 후에는 내용을 수정이 어렵습니다.<br />
            멘토가 24시간 이내에 수락하지 않을 경우에만 다시 문의하실 수 있으니, 신중하게 작성해 주세요.
        </p>
        </div>

        <div className="inquiry-modal__footer">
        <BaseButton color="teal" onClick={handleSubmit}>
            문의하기
        </BaseButton>
        </div>

        
    </Modal>
    {showAlert && (
      <InquiryAlertContainer
  onClose={() => {
    setShowAlert(false);
    onClose(); // 여기서 모달을 닫음
  }}
/>
    )}
</>
  );
};
