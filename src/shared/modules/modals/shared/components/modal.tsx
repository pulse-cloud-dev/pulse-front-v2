import * as React from "react";
import { Icon } from "@/shared/components";

export interface ModalProps extends React.PropsWithChildren, React.HTMLAttributes<HTMLElement & HTMLDivElement> {
  variant?: "check" | "confirm";
  id?: string;
  title?: string;
  type?: string;

  openCancelAlert?: () => void;
  closeModal?: (uid: string) => void;
  closeAllModals?: () => void;
}
//type 추가 mini, medium, large, w524
export const Modal = (props: ModalProps) => {
  const { variant, id, title, type, openCancelAlert, closeModal, children } = props;
  if (!id) return null;
  return (
    <div className={type === "large" ? `modal_box ${id ? "on overflow_y" : ""}` : `modal_box ${id ? "on" : ""}`}>
      {/* 모달 컨텐츠 */}
      <div className={`modal__contents ${type}`} style={props.style}>
        <div className="modal_top m-b-20">
          <p className="modal_title">{title || "제목없음"}</p>
          <button type="button" className="modal_close w24 h24" onClick={() => openCancelAlert?.()}>
            <Icon src="close_line_fff_20" alt="검색 닫기" />
          </button>
        </div>

        {children}

        <div className="keyword_selection gap_8">
          {variant === "confirm" && (
            <button
              className="btn_secondary btn_l w160"
              type="button"
              onClick={() => {
                if (openCancelAlert && typeof openCancelAlert === "function") {
                  openCancelAlert();
                }
              }}
            >
              취소
            </button>
          )}

          <button
            className="btn_primary btn_l w160"
            type="submit"
            onClick={() => {
              if (closeModal && typeof closeModal === "function") {
                closeModal(id);
              }
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

// const Contents = styled.div`
//   width: max-content;
//   height: max-content;
// `;
