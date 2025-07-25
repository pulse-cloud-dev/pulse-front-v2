import type { HTMLAttributes, PropsWithChildren } from "react";
import type { ModalVariants } from "@/shared/modules";
import { Icon } from "@/shared/components";
import { BaseButton } from "@/shared/components";
export interface ModalProps extends PropsWithChildren, HTMLAttributes<HTMLElement & HTMLDivElement> {
  variant?: ModalVariants;
  id?: string;
  title?: string;
  subtitle?: string;
  type?: string;

  openCancelAlert?: () => void;
  closeModal?: (uid: string) => void;
  closeAllModals?: () => void;
}

export const GroupModal = (props: ModalProps) => {
  const { variant = "default", id, title, subtitle, type, openCancelAlert, closeModal, children, ...restProps } = props;
  if (!id) return null;
  return (
    <div className={type === "large" ? `modal_box ${id ? "on overflow_y" : ""}` : `modal_box ${id ? "on" : ""}`}>
      {/* 모달 컨텐츠 */}
      <div className={`modal__contents ${type}`} style={props.style}>
        {children}
        <BaseButton />
        <BaseButton />
      </div>
    </div>
  );
};
