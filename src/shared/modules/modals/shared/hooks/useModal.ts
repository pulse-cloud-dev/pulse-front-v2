import { useCallback } from "react";

import { uuid } from "@/shared/lib";
import { useModalContext } from "./contexts/modalContexts";

export const useModal = (component: React.FC, props?: object) => {
  const { dispatch } = useModalContext();

  const openModal = useCallback(() => {
    const newId = uuid().next().value as string;
    const modalProps = {
      ...props,
      closeModal,
      closeAllModals,

      actions: {
        handleClose: closeModal,
        handleCloseAll: closeAllModals,
      },
      id: newId,
    };

    dispatch({
      type: "OPEN_MODAL",
      payload: { id: newId, component, props: modalProps },
    });
    document.body.style.overflow = "hidden";
  }, [dispatch, component, props]);

  const closeModal = useCallback(
    (uid: string) => {
      dispatch({ type: "CLOSE_MODAL", payload: { id: uid } });

      document.body.style.overflow = "unset";
    },
    [dispatch]
  );

  const closeAllModals = useCallback(() => {
    dispatch({ type: "CLOSE_ALL" });
  }, [dispatch]);

  return { openModal, closeModal, closeAllModals };
};
