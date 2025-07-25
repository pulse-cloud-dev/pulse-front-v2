import { useModal } from "@/shared/modules";
import { Modal } from "@/shared/modules";
function AddGroupButton() {
  const PlusModal = useModal(Modal, {
    variant: "confirm",
    title: "정말 삭제하시겠어요?",
    subtitle: "삭제하면 되돌릴 수 없습니다.",
    type: "large",
  });

  return (
    <button
      style={{
        borderRadius: "14px",
        width: "104px",
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #E0E0E0",
        background: "#fff",
        cursor: "pointer",
        fontSize: "18px",
        fontWeight: "bold",
      }}
      aria-label="그룹 추가"
      onClick={() => PlusModal.openModal()}
    >
      +
    </button>
  );
}

export default AddGroupButton;
