import { AlertInterface } from './alertTypes';

export const Alert = (props: AlertInterface) => {
  // 기본값 설정
  const {
    title = '알림',
    body = '',
    cancelBtn = true,
    cancelText = '취소',
    confirmText = '확인',
    onCancel,
    onConfirm
  } = props;

  return (
    <div className="alert-overlay">
      <div className="alert">
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