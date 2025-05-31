import { useLocation } from "react-router-dom";

import { Modal, useModal } from "@/shared/modules";
import { FieldPopup, OnlineStatusPopup } from "@/shared/components";
import { MentorView } from "./mentor.view";

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

  const props = {
    event: {
      openFirstModal: modals.first.openModal,
      openSecondModal: modals.second.openModal,
      openThirdModal: modals.third.openModal,
    },
  };

  return <MentorView {...props} />;
};
