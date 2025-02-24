import type { FC } from "react";

export type ModalOpenPayload = {
  id: string;
  component: FC;
  props?: object;
};

export type ModalClosePayload = {
  id: string;
};

export type ModalAction =
  | {
      type: "OPEN_MODAL";
      payload: ModalOpenPayload;
    }
  | {
      type: "CLOSE_MODAL";
      payload: ModalClosePayload;
    }
  | {
      type: "CLOSE_ALL";
    };
