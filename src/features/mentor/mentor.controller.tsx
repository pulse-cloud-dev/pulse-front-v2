import { useLocation } from "react-router-dom";

import { Modal, useModal } from "@/shared/modules";
import { FieldPopup, OnlineStatusPopup } from "@/shared/components";
import { MentorView } from "./mentor.view";
import { Alert, useAlert, AlertInterface } from "@/shared/modules";

const useModals = () => {
  return {
    first: useModal(Modal, {
      title: "분야",
      variant: "default",
      children: <FieldPopup />,
    }),
    second: useModal(Modal, {
      title: "온/오프라인",
      variant: "default",
      children: <OnlineStatusPopup />,
    }),
    third: useModal(Modal, {
      title: "지역",
      variant: "check",
      children: <div>모달 3</div>,
    }),
  };
};




export const MentorController = () => {
  const modals = useModals();
  const location = useLocation();

  const { isOpen, alertProps, showAlert, hideAlert } = useAlert();

  const handleDeleteClick = () => {
    showAlert({
      title: '삭제 확인',
      body: '정말로 이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
      cancelText: '취소',
      confirmText: '삭제',
      onCancel: () => {
        console.log('삭제가 취소되었습니다.');
      },
      onConfirm: () => {
        console.log('삭제가 완료되었습니다!');
      }
    });
  };

  const props = {
    event: {
      openFirstModal: modals.first.openModal,
      openSecondModal: modals.second.openModal,
      openThirdModal: modals.third.openModal,
    },
  };

  // return <MentorView {...props} />;
  
  return (
    <>
    <button onClick={handleDeleteClick}>버튼</button>
    {isOpen && <Alert {...alertProps} />}
  </>
  )  
};
