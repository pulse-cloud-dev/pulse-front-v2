import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import type { TextEditorButtonProps } from './button.type';
import { utils } from '../../../shared';

interface Props extends HTMLAttributes<HTMLButtonElement>, TextEditorButtonProps {}

export const TextEditorDefaultButton = forwardRef<HTMLButtonElement, Props>((props, forwardedRef) => {
  const {
    // Props...
    id,
    value,
    variant = 'secondary',
    className = 'btn',
    selected = false,
    disabled = false,
    options,
    style,
    children,
    ...rest
  } = props;
  return (
    <button
      id={id}
      value={value}
      ref={forwardedRef}
      className={utils.classNames(`${className}_${variant}`, ['btn_ms', { editor: true, selected, disabled, ...options }])}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
});
