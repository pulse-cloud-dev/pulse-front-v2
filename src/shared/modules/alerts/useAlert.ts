import { useState, useCallback } from 'react';
import { AlertInterface } from './alertTypes';

export function useAlert() {
  const [isOpen, setIsOpen] = useState(false);
  const [alertProps, setAlertProps] = useState<AlertInterface>({});

  const showAlert = useCallback((props: AlertInterface) => {
    setAlertProps({
      ...props,
      onCancel: () => {
        setIsOpen(false);
        props.onCancel?.(); // 외부 콜백 실행
      },
      onConfirm: () => {
        setIsOpen(false);
        props.onConfirm?.(); // 외부 콜백 실행
      }
    });
    setIsOpen(true);
  }, []);

  const hideAlert = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    alertProps,
    showAlert,
    hideAlert
  };
}