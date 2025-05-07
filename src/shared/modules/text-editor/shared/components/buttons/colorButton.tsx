import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { utils } from '../../../shared';
import { TextEditorButtonProps } from './button.type';

interface Props extends HTMLAttributes<HTMLButtonElement>, TextEditorButtonProps {
  color?: string;
}

export const TextEditorButton = forwardRef<HTMLButtonElement, Props>((props, forwardedRef) => {
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
