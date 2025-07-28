import { useState } from "react";
import { Modal } from "@/shared/modules";
import { BaseButton } from "@/shared/components";

export const PasswordEditModal = ({
  closeModal,
  id = "password-edit",
}: {
  closeModal: (id: string) => void;
  id?: string;
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Modal id={id} title="비밀번호 변경" closeModal={closeModal}>
      <div className="mypage-modal-body">
        <div className="modal-form-group">
          <label htmlFor="new-password" className="modal-input-label">새 비밀번호</label>
          <input
            id="new-password"
            type="password"
            placeholder="숫자, 영문, 특수문자 포함 8자 이상 작성해 주세요."
            className="modal-input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="modal-form-group">
          <label htmlFor="confirm-password" className="modal-input-label">비밀번호 확인</label>
          <input
            id="confirm-password"
            type="password"
            placeholder="입력한 비밀번호를 확인해 주세요."
            className="modal-input-field"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="modal-divider" />

      <div className="button-wrapper">
        <div className="mypage-modal__button">
          <BaseButton onClick={() => closeModal(id)} type="button" size="lg" color="outlined">
            닫기
          </BaseButton>
          <BaseButton onClick={() => closeModal(id)} type="button" size="lg" color="teal">
            저장
          </BaseButton>
        </div>
      </div>
    </Modal>
  );
};
