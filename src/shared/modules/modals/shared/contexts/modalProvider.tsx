import type { FC, PropsWithChildren } from "react";
import { useReducer } from "react";
import { createPortal } from "react-dom";

import type { ModalAction } from "../../types";
import { ModalContext, ModalState } from "./modalContexts";

const modalReducer = (state: ModalState[], action: ModalAction): ModalState[] => {
  switch (action.type) {
    case "OPEN_MODAL":
      return [...state, { id: action.payload.id, component: action.payload.component, props: action.payload.props || {} }];
    case "CLOSE_MODAL":
      return state.filter((modal) => modal.id !== action.payload.id);
    case "CLOSE_ALL":
      return [];
    default:
      return state;
  }
};

export interface ModalProviderProps extends PropsWithChildren {}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [state, dispatch] = useReducer(modalReducer, []);

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
      {state.map(({ id, component: Component, props }) => createPortal(<Component key={props.key ?? id} {...props} />, document.getElementById("portal-root")!))}
    </ModalContext.Provider>
  );
};
