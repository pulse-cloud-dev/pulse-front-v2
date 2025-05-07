import type { KeyboardEvent } from 'react';
import type { DraftStyleMap, DraftInlineStyle, DraftBlockType, DraftEditorCommand, ContentBlock, ContentState, SelectionState } from 'draft-js';
import { convertToRaw, EditorState, getDefaultKeyBinding, Modifier, RichUtils } from 'draft-js';

import type { OriginInLineStyleType, Any, ReStructInLineStyle } from '../../types';
import { TextEditorModelHelper } from '../../shared';

export interface EditorModelState {
  editorState: EditorState;
  styleMap: DraftStyleMap;
}

export class EditorModel {
  _state: EditorModelState;

  private _helper: TextEditorModelHelper;

  constructor() {
    this._helper = new TextEditorModelHelper();
    this._state = {
      editorState: EditorState.createEmpty(),
      styleMap: {},
    };
  }
  private get helper() {
    return this._helper;
  }

  get editorState(): EditorState {
    return this._state.editorState;
  }

  set editorState(editorState: EditorState) {
    this._state.editorState = editorState;
  }

  get styleMap(): DraftStyleMap {
    return this._state.styleMap;
  }

  set styleMap(styleMap: DraftStyleMap) {
    this._state.styleMap = styleMap;
  }

  /**
   *  키 바인딩 기능에서 제공하는 키 명령 문자열을 지정된 동작을 수행합니다.
   */
  onKeyCommand(command: DraftEditorCommand, editorState: EditorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.setState({ editorState: newState });
      return newState;
    }
    return editorState;
  }

  /**
   * 특정 키보드 동작에 대한 키바인딩하여 명령어를 커스텀
   */
  onMappingKeyToCommand(e: KeyboardEvent): DraftEditorCommand | null {
    if (e.key === 'Tab') {
      const newStateFromKeyCommand = RichUtils.onTab(e, this._state.editorState, 4 /* maxDepth */);
      if (newStateFromKeyCommand !== this._state.editorState) {
        this.editorState = newStateFromKeyCommand;
      }
      return null;
    }

    return getDefaultKeyBinding(e);
  }

  /**
   * 인라인(inline) 스타일 적용
   */

  onToggleInlineStyle(inlineStyle: DraftInlineStyle | string) {
    return (this.editorState = RichUtils.toggleInlineStyle(this._state.editorState, inlineStyle as unknown as string));
  }

  /**
   * 블록(Block) 스타일 적용
   */
  onToggleBlockType(blockType: DraftBlockType) {
    return (this.editorState = RichUtils.toggleBlockType(this._state.editorState, blockType));
  }

  onBlockStyleFn(contentBlock: ContentBlock): string {
    return this.helper.pickBlockStyle(contentBlock.getType() as 'left' | 'center' | 'right' | 'justify' | '');
  }

  onExtractObjectFromRTE() {
    const result: unknown[] = [];

    // GET Raw Data
    const rawContentState = this._convertToRaw();

    // Blocks를 배열의 역순으로 재배치
    const blockSnapshots = [...rawContentState.blocks].reverse();

    while (blockSnapshots.length > 0) {
      // 데이터 꺼내기
      const { inlineStyleRanges, text, type } = blockSnapshots.pop() as { inlineStyleRanges: Any; text: string; type: string };

      // 텍스트의 길이만큼 2차원 배열 생성
      const create2DArray: string[][] = this.helper.create2DArray(text.length);

      // Offset이 낮은 순으로 정렬
      inlineStyleRanges.sort((a: { offset: number }, b: { offset: number }) => a.offset - b.offset);

      // InlineStyle 데이터 형식 재구조화
      const restructedInlineStyleRanges: ReStructInLineStyle[] = this._restructureInlineStyle(inlineStyleRanges);

      // 재구성된 InlineStyle 범위만큼 순회
      for (let i = 0; i < restructedInlineStyleRanges.length; i++) {
        // Inline 스타일 범위의 순회당 index범위가 [시작 : 끝] 기준에 맞게 스타일을 넣기
        for (let j = restructedInlineStyleRanges[i].start; j < restructedInlineStyleRanges[i].end!; j++) {
          create2DArray[j].push(restructedInlineStyleRanges[i].style);
        }
      }

      // 2차원 배열에서 시작 지점과 끝 지점에 따라 객체 형태로 전환
      const convertedObject = this.helper.covert2DArrayToObject(create2DArray);

      result.push(convertedObject.map((object) => ({ ...object, text: text.slice(object.start, object.end), type })));
    }

    return result;
  }

  onChangeFontSize(fontSize: string) {
    const currentContent = this.editorState.getCurrentContent();
    const selection = this.editorState.getSelection();

    const contentWithoutOldStyles = Object.keys(this.styleMap!)
      .filter((key) => key.startsWith('FONT_SIZE'))
      .reduce((contentState, key) => Modifier.removeInlineStyle(contentState, selection, key), currentContent);

    // 선택한 범위의 텍스트 크기 스타일 업데이트
    const contentWithNewStyle = Modifier.applyInlineStyle(contentWithoutOldStyles, selection, fontSize);

    // 업데이트된 컨텐츠로 새로운 EditorState 생성
    const newEditorState = EditorState.push(this.editorState, contentWithNewStyle, 'change-inline-style');

    // Model의 instance 중 editorState를 업데이트
    this.editorState = newEditorState;
  }

  onChangeFontColor(fontColor: string) {
    const currentContent = this.editorState.getCurrentContent();
    const selection = this.editorState.getSelection();

    // 색상 스타일을 적용하기 전에 기존 색상 스타일을 제거합니다.
    const nextContentState = Object.keys(this.styleMap!)
      .filter((key) => key.startsWith('FONT_COLOR'))
      .reduce((content, colorKey) => {
        return Modifier.removeInlineStyle(content, selection, colorKey);
      }, currentContent);

    // 새로운 스타일 적용
    const colorStyle = `FONT_COLOR_${this.helper.convertColorToUpperCase(fontColor) || ''}`;

    // 스타일 맵에 색상 스타일 추가
    if (!this.styleMap![colorStyle]) {
      this.styleMap![colorStyle] = { color: `${fontColor}` };
    }

    // 선택한 범위의 텍스트 색상 스타일 업데이트
    const contentWithNewStyle = Modifier.applyInlineStyle(nextContentState, selection, colorStyle);

    // 업데이트된 콘텐츠로 새 EditorState로 생성
    const newEditorState = EditorState.push(this.editorState, contentWithNewStyle, 'change-inline-style');

    // Model의 instance 중 editorState를 업데이트
    this.editorState = newEditorState;

    return this.editorState;
  }

  /** Set State  */
  setState(newState: Partial<EditorModelState>): void {
    this._state = { ...this._state, ...newState };
  }

  /**
   * ==============================================================================================
   *                                          PRIVATE
   * ==============================================================================================
   */
  private _convertToRaw() {
    return convertToRaw(this._state.editorState.getCurrentContent());
  }

  private _restructureInlineStyle(inlineArray: []) {
    return inlineArray?.map(({ offset, length, style }: OriginInLineStyleType) => ({ start: offset, end: offset + length, style }));
  }

  private _deletePrevStyle(currentContent: ContentState, selection: SelectionState, targetStyle: string): ContentState | null {
    if (!currentContent && !selection && !targetStyle) return null;
    return Object.keys(this.styleMap!)
      .filter((key) => key.startsWith(targetStyle))
      .reduce((content, colorKey) => Modifier.removeInlineStyle(content, selection, colorKey), currentContent);
  }
}
