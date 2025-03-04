import { forwardRef } from 'react';

import type { GroupWrapperProps } from './wrapper.type';
import { utils } from '../../../shared';

interface Props extends GroupWrapperProps {}

export const ButtonWrapper = forwardRef<HTMLDivElement, Props>((props, forwardedRef) => {
  const { className = 'edit_btline', options, style, children, ...rest } = props;

  return (
    <div ref={forwardedRef!} className={utils.classNames(className, options)} style={style} {...rest}>
      {children}
    </div>
  );
});
