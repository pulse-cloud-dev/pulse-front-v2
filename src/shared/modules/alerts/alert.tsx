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


/** 사용 예제제 */
// import { Alert, useAlert, AlertInterface } from "@/shared/modules";

// export const Example = () => {

//   const { isOpen, alertProps, showAlert, hideAlert } = useAlert();

//   const handleDeleteClick = () => {
//     showAlert({
//       title: '삭제 확인',
//       body: '정말로 이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
//       cancelText: '취소',
//       confirmText: '삭제',
//       onCancel: () => {
//         console.log('삭제가 취소되었습니다.');
//       },
//       onConfirm: () => {
//         console.log('삭제가 완료되었습니다!');
//       }
//     });
//   };
  
//   return (
//     <>
//     <button onClick={handleDeleteClick}>버튼</button>
//     {isOpen && <Alert {...alertProps} />}
//   </>
//   )  
// };
