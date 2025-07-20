import { useCallback } from "react";
import { uuid } from "@/shared/lib";
import { useModalContext } from "../contexts";

type ModalComponent = React.FC<any>;

export const useModal = <T = Record<string, any>>(component: ModalComponent, props?: T) => {
  const { dispatch } = useModalContext();

  const closeModal = useCallback(
    (uid: string) => {
      dispatch({ type: "CLOSE_MODAL", payload: { id: uid } });
      document.body.style.overflow = "unset";
    },
    [dispatch]
  );

  const closeAllModals = useCallback(() => {
    dispatch({ type: "CLOSE_ALL" });
    document.body.style.overflow = "unset";
  }, [dispatch]);

  const openModal = useCallback(
    (dynamicProps?: T) => {
      const newId = uuid().next().value as string;

      const modalProps = {
        ...(props || {}),
        ...(dynamicProps || {}),
        id: newId,
        closeModal,
        closeAllModals,
        actions: {
          handleClose: closeModal,
          handleCloseAll: closeAllModals,
        },
      };

    const childrenFn = typeof (dynamicProps as any)?.children === "function" ? (dynamicProps as any).children : typeof (props as any)?.children === "function" ? (props as any).children : null;

      const resolvedProps = {
        ...modalProps,
        children: typeof childrenFn === "function" ? childrenFn(modalProps) : (dynamicProps as any)?.children ?? (props as any)?.children,
      };

      dispatch({
        type: "OPEN_MODAL",
        payload: { id: newId, component, props: resolvedProps },
      });

      document.body.style.overflow = "hidden";
    },
    [dispatch, component, props, closeModal, closeAllModals]
  );

  return { openModal, closeModal, closeAllModals };
};
