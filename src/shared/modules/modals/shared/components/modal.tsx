import type { HTMLAttributes, PropsWithChildren } from "react";
import type { ModalVariants } from "../../types";
import { Icon } from "@/shared/components";

export interface ModalProps extends PropsWithChildren, HTMLAttributes<HTMLElement & HTMLDivElement> {
  variant?: ModalVariants;
  id?: string;
  title?: string;
  type?: string;

  openCancelAlert?: () => void;
  closeModal?: (uid: string) => void;
  closeAllModals?: () => void;
}

export const Modal = (props: ModalProps) => {
  const { variant = "default", id, title, type, openCancelAlert, closeModal, children, ...restProps } = props;
  if (!id) return null;
  return (
    <div className={type === "large" ? `modal_box ${id ? "on overflow_y" : ""}` : `modal_box ${id ? "on" : ""}`}>
      {/* 모달 컨텐츠 */}
      <div className={`modal__contents ${type}`} style={props.style}>
        <div className="modal_top m-b-20">
          <p className="modal_title">{title || "제목없음"}</p>
          <button type="button" className="modal_close w24 h24" onClick={() => closeModal?.(id)}>
            <Icon src="close_line_fff_20" alt="검색 닫기" />
          </button>
        </div>

        {children}

        {variant !== "default" && (
          <div className="keyword_selection gap_8">
            {[
              variant === "confirm" && (
                <button key="cancel" className="btn_secondary btn_l w160" type="button" onClick={openCancelAlert}>
                  취소
                </button>
              ),
              <button key="confirm" className="btn_primary btn_l w160" type="submit" onClick={() => closeModal?.(id)}>
                확인
              </button>,
            ].filter(Boolean)}
          </div>
        )}
      </div>
    </div>
  );
};
