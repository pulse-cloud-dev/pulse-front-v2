import type { FC, PropsWithChildren } from "react";
import { useReducer } from "react";

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

interface ModalComponentProps {
  Component: FC<any>;
  props: Record<string, any>;
}

// const ModalComponent = (props) => {
//   // return <Component {...props} />;
// };

export interface ModalProviderProps extends PropsWithChildren {}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [state, dispatch] = useReducer(modalReducer, []);

  console.log(state);
  // const modalElements = useMemo(
  //   () => state.map(({ id, component: Component, props }) => <ModalComponent key={id} Component={Component} props={props} />),
  //   [state, dispatch]
  // );

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
      {/* {modalElements} */}
      {state.map(({ id, component: Component, props }) => (
        <Component key={id} {...props} />
      ))}
    </ModalContext.Provider>
  );
};
