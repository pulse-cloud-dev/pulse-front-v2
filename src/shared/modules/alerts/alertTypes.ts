export interface AlertInterface {
  title?: string;
  body?: string;
  cancelBtn?: boolean;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;    //취소 클릭 후 로직
  onConfirm?: () => void;   //확인 클릭 후 로직
}