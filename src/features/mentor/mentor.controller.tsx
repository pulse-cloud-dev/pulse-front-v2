import { useLocation } from "react-router-dom";

import { Modal, useModal } from "@/shared/modules";
import { FieldPopup, OnlineStatusPopup, LocalPopup  } from "@/shared/components";
import { MentorView } from "./mentor.view";

import { useState } from "react";
const useModals = () => {
  return {
    first: useModal(Modal, {
      title: "분야",
      subtitle: "최대 3개 선택",
      variant: "default",
      children: <FieldPopup />,
    }),
    second: useModal(Modal, {
      title: "온/오프라인",
      variant: "default",
      children: (modalProps: any) => (
    <OnlineStatusPopup closeModal={() => modalProps.closeModal(modalProps.id)} />
  ),
    }),
    third: useModal(Modal, {
      title: "지역",
      subtitle: "최대 10개 선택",
      variant: "default",
      children: (modalProps: any) => (
    <LocalPopup closeModal={() => modalProps.closeModal(modalProps.id)} />
  ),
    }),
  };
};

export const MentorController = () => {
  const modals = useModals();
  const location = useLocation();
  const [keyword, setKeyword] = useState("");
  const [isOnlineOnly, setIsOnlineOnly] = useState(false);


  const props = {
    event: {
      openFirstModal: modals.first.openModal,
      openSecondModal: () => {
      modals.second.openModal();
    },
    openThirdModal: () => {
      if (!isOnlineOnly) {
        modals.third.openModal();
      } else {
        alert("온라인 선택 시 지역 선택은 불가능합니다.");
      }
    },
  },
    state: { keyword },
  actions: { setKeyword },
  };

  return <MentorView {...props} />;
};
