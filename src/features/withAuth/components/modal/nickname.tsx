import { useState } from "react";
import { Modal } from "@/shared/modules";
import { BaseButton } from "@/shared/components";

export const NicknameEditModal = ({ closeModal, id = "nickname-edit" }: { closeModal: (id: string) => void; id?: string }) => {
  const [nickname, setNickname] = useState("");

  return (
    <Modal id={id} title="닉네임 변경" closeModal={closeModal}>
      <div className="mypage-modal-body">
        <div className="modal-input-wrapper">
          <input className="modal-input-field" type="text" placeholder="닉네임 입력" value={nickname} onChange={(e) => setNickname(e.target.value)} />

          <BaseButton
            type="button"
            size="lg"
            color="secondary"
            style={{
              fontSize: "14px",
              padding: "10px",
              fontWeight: "bold",
            }}
          >
            중복 확인
          </BaseButton>
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
