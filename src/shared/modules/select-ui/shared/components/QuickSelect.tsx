import type { HTMLAttributes, PropsWithChildren } from 'react';
import { forwardRef } from 'react';

import type { SelectOptionGroup } from '../../types';

interface QuickSelectProps extends HTMLAttributes<HTMLSelectElement>, PropsWithChildren {
  defaultText?: string;
  items: SelectOptionGroup;
}

export const QuickSelect = forwardRef<HTMLSelectElement, QuickSelectProps>((props, forwardedRef) => {
  const { className, defaultText, items, children, ...restProps } = props;

  if (items.length === 0) return null;

  return (
    <div className={`quick-select--wrap ${className}`}>
      <select
        ref={forwardedRef}
        // Props
        className="quick-select select"
        defaultValue=""
        {...restProps}
      >
        <option value="" selected disabled>
          {defaultText || '-- 선택 --'}
        </option>
        {items.map((item, index) => (
          <option key={`${item.value}-${index}`} value={item.value}>
            {item.display}
          </option>
        ))}
      </select>
    </div>
  );
});
