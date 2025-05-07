import type { HTMLAttributes, PropsWithChildren, ForwardedRef } from 'react';
import { forwardRef } from 'react';

export interface ToolbarViewProps extends HTMLAttributes<HTMLElement>, PropsWithChildren {}

const ToolbarContainer = <T extends HTMLDivElement>(
  { className, children, style, ...rest }: ToolbarViewProps,

  forwardedRef: ForwardedRef<T>,
) => {
  return (
    <div ref={forwardedRef} className={`text-editor-toolbar ${className}`} style={style} {...rest}>
      {children}
    </div>
  );
};

export const ToolbarView = Object.assign(forwardRef(ToolbarContainer), {});
