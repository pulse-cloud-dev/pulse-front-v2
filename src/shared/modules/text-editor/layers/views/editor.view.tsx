import type { HTMLAttributes } from 'react';
import { Editor } from 'draft-js';
import { ContentBlock, DraftEditorCommand, DraftStyleMap, EditorState } from 'draft-js';

import { forwardRef } from 'react';

export interface EditorViewProps extends HTMLAttributes<HTMLElement> {
  onFocus?: () => void;
  editorState: EditorState;
  handleChange: (newEditorState: EditorState) => void;
  handleKeyCommand: (command: DraftEditorCommand, state: EditorState) => 'handled' | 'not-handled';
  keyBindingFn: (e: React.KeyboardEvent) => DraftEditorCommand | null;
  blockStyleFn: (contentBlock: ContentBlock) => string;
  customStyleMap?: DraftStyleMap;
  placeholder?: string;
  spellCheck?: boolean; // 타입 수정
}

export const TextEditorView = forwardRef<Editor, EditorViewProps>(
  (
    {
      editorState,
      handleChange = () => {},
      onFocus = () => {},
      handleKeyCommand,
      keyBindingFn,
      blockStyleFn,
      customStyleMap = {},
      placeholder = '내용을 입력해주세요...',

      className,
      style,
      children,
      ...rest
    },

    forwardedRef,
  ) => {
    const { onCopy, onCut, onPaste, ...filteredRest } = rest;

    return (
      <Editor
        {...filteredRest}
        ref={forwardedRef}
        editorState={editorState}
        onChange={handleChange}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={keyBindingFn}
        blockStyleFn={blockStyleFn}
        customStyleMap={customStyleMap}
        placeholder={placeholder}
      />
    );
  },
);
