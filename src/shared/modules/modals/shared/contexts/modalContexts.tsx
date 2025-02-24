import type { FC, Dispatch } from "react";
import { createContext, useContext } from "react";

import type { ModalAction } from "../../types";

export interface ModalState {
  id: string;
  component: FC<any>;
  props: Record<string, any>;
}

export interface ModalContextProps {
  state: ModalState[];
  dispatch: Dispatch<ModalAction>;
}

export const initialState: ModalState[] = [];

export const ModalContext = createContext<ModalContextProps>({ state: [], dispatch: () => null });

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("Modal's value is not validated");
  }
  return context;
};
