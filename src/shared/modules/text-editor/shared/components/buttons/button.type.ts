import type { ButtonVariant, TextEditorOptionProps } from '../../../types';

export interface TextEditorButtonProps {
  id?: string;
  value?: string | number;
  variant?: ButtonVariant;

  selected?: boolean;
  disabled?: boolean;

  /*
   * Key : class-name ,
   * value : active state
   *  - true : active,
   *  -false : inactive
   */
  options: TextEditorOptionProps;
}
