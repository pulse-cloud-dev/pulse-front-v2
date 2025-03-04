import { useLocation } from "react-router-dom";

import { Modal, useModal } from "@/shared/modules";
import { MentorView } from "./mentor.view";

const useModals = () => {
  return {
    first: useModal(Modal, {
      title: "분야",
      variant: "check",
      children: <div>모달 1</div>,
    }),
    second: useModal(Modal, {
      title: "온/오프라인",
      variant: "check",
      children: <div>모달 2</div>,
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
