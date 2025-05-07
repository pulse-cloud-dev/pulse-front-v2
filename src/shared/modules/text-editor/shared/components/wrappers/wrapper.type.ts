import type { HTMLAttributes } from 'react';
import type { TextEditorOptionProps } from '../../../types';

export interface GroupWrapperProps extends HTMLAttributes<HTMLDivElement> {
  options: TextEditorOptionProps;
}
