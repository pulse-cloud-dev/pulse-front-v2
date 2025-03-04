import * as R from 'react';

import type { Any } from '../../types';
import { EditorViewModel } from '../../layers/viewModels';

export interface ExtractObjectButtonProps extends R.HTMLAttributes<HTMLButtonElement> {
  editorViewModel: EditorViewModel;
  onClick?: (e: R.MouseEvent) => void;

  setState?: R.Dispatch<R.SetStateAction<Any>>;
}

export const ExtractObjectButton: R.FC<ExtractObjectButtonProps> = ({
  editorViewModel,
  setState = undefined,
  onClick = undefined,
  style,
  children,
  ...rest
}) => {
  const _onClick = (e: R.MouseEvent) => {
    const objectFromRte = editorViewModel.handleExtractObjectFromRTE();

    const extractedCoord = editorViewModel.handleExtractCoord();

    const mergedList = editorViewModel.handleMergeArray<Any, Any>(objectFromRte, extractedCoord);

    if (setState && typeof setState === 'function') {
      setState(mergedList);
    }

    if (onClick && typeof onClick === 'function') {
      onClick(e);
    }
  };

  return (
    <button onClick={_onClick} style={style} {...rest}>
      {children}
    </button>
  );
};
