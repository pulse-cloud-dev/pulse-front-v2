import { AlertInterface } from "./alertTypes";
import { useKey } from "../modals/shared/hooks/useKey";
/**
 * `Alert` 컴포넌트는 사용자에게 알림 메시지를 보여주고
 * 확인/취소 등 버튼을 통해 상호작용할 수 있도록 제공하는 공통 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <Alert
 *   title="삭제하시겠습니까?"
 *   body="삭제하면 복구할 수 없습니다."
 *   cancelText="취소"
 *   confirmText="삭제"
 *   onCancel={() => console.log("취소")}
 *   onConfirm={() => console.log("확인")}
 *   className="alert--wide"
 *   style={{ maxWidth: '600px' }}
 * />
 * ```
 *
 * @param {AlertInterface} props - 알림창에 전달되는 속성들
 * @param {string} [props.title='알림'] - 알림 제목
 * @param {string} [props.body=''] - 알림 본문
 * @param {boolean} [props.cancelBtn=true] - 취소 버튼 표시 여부
 * @param {string} [props.cancelText='취소'] - 취소 버튼 텍스트
 * @param {string} [props.confirmText='확인'] - 확인 버튼 텍스트
 * @param {() => void} [props.onCancel] - 취소 버튼 클릭 시 호출되는 콜백
 * @param {() => void} [props.onConfirm] - 확인 버튼 클릭 시 호출되는 콜백
 * @param {string} [props.className] - `.alert` 박스에 추가로 적용할 CSS 클래스명
 * @param {React.CSSProperties} [props.style] - `.alert` 박스에 인라인 스타일 지정
 *
 * @returns {JSX.Element} 알림 모달 JSX
 */
export const Alert = (props: AlertInterface): JSX.Element => {
  const { title = "알림", body = "", cancelBtn = true, cancelText = "취소", confirmText = "확인", onCancel, onConfirm, className, style } = props;

  useKey("Escape", onCancel!);

  return (
    <div className="alert-overlay">
      <div className={`alert ${className ?? ""}`} style={style}>
        <div className="alert__TextArea">
          <div className="alert__TextArea--title">{title}</div>
          <div className="alert__TextArea--body">{body}</div>
        </div>
        <div className="alert__buttonArea">
          {cancelBtn && (
            <button className="cancel" onClick={onCancel}>
              {cancelText}
            </button>
          )}
          <button className="confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
