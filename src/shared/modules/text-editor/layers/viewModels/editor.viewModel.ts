import type { KeyboardEvent } from 'react';
import type { DraftStyleMap, DraftInlineStyle, DraftBlockType, DraftEditorCommand, ContentBlock, EditorState, Editor } from 'draft-js';
import type { RefObject } from 'react';

import type { Any } from '../../types';
import { EditorModel } from '../models';
import { TextEditorViewModelHelper } from '../../shared';

export class EditorViewModel {
  editorModel: EditorModel;
  editorRef: RefObject<Editor>;

  private _helper: TextEditorViewModelHelper;

  constructor(editorRef: RefObject<Editor>) {
    this.editorModel = new EditorModel();
    this._helper = new TextEditorViewModelHelper();
    this.editorRef = editorRef;

    this.handleChangeState = this.handleChangeState.bind(this);
    this.handleBlockStyleFn = this.handleBlockStyleFn.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleMappingKeyToCommand = this.handleMappingKeyToCommand.bind(this);
    this.handleToggleInlineStyle = this.handleToggleInlineStyle.bind(this);
    this.handleToggleBlockType = this.handleToggleBlockType.bind(this);
    this.handleFocusEditor = this.handleFocusEditor.bind(this);
    this.handleMergeArray = this.handleMergeArray.bind(this);
    this.handleChangeFontSize = this.handleChangeFontSize.bind(this);
    this.handleChangeFontColor = this.handleChangeFontColor.bind(this);
  }

  get helper() {
    return this._helper;
  }

  get editorState() {
    return this.editorModel.editorState;
  }

  get customStyleMap() {
    return this.editorModel.styleMap;
  }

  handleFocusEditor(): void {
    if (!this?.helper?.isCheckRef(this.editorRef)) return;
    this.editorRef.current?.focus();
  }

  handleKeyCommand(command: DraftEditorCommand, editorState: EditorState) {
    return this.editorModel.onKeyCommand(command, editorState);
  }

  handleMappingKeyToCommand(e: KeyboardEvent): DraftEditorCommand | null {
    return this.editorModel?.onMappingKeyToCommand(e);
  }

  handleToggleInlineStyle(inlineStyle: DraftInlineStyle) {
    return this.editorModel.onToggleInlineStyle(inlineStyle);
  }

  handleToggleBlockType(blockType: DraftBlockType) {
    return this.editorModel.onToggleBlockType(blockType);
  }

  handleBlockStyleFn(contentBlock: ContentBlock) {
    return this.editorModel.onBlockStyleFn(contentBlock);
  }

  handleExtractObjectFromRTE() {
    return this.editorModel.onExtractObjectFromRTE();
  }

  handleExtractCoord() {
    return this._getFoundedCoordFromSpan(this._getTextBlockElement(this._getEditorContainer()));
  }

  handleMergeArray<S extends [], T extends []>(standardArr: S, targetArr: T) {
    return this._traversalListLength(standardArr, targetArr);
  }

  handleChangeFontSize(fontSize: string) {
    return this.editorModel.onChangeFontSize(fontSize);
  }

  handleChangeFontColor(fontColor: string) {
    return this.editorModel.onChangeFontColor(fontColor);
  }

  handleChangeState(newState: Partial<{ editorState: Any; styleMap: DraftStyleMap }>): void {
    if (newState.editorState !== undefined) {
      this.editorModel.setState({ editorState: newState.editorState });
    }
    if (newState.styleMap !== undefined) {
      this.editorModel.setState({ styleMap: newState.styleMap });
    }
  }

  /**
   * ==============================================================================================
   *                                          PRIVATE
   * ==============================================================================================
   */

  private _getEditorContainer() {
    if (!this.helper.isCheckRef(this.editorRef)) return;
    return this.editorRef.current?.editorContainer;
  }

  private _getTextBlockElement(element: HTMLElement | undefined | null) {
    if (!this.helper.isCheckValue(element)) return;
    return this.helper.findElementByClassName(element!, 'public-DraftStyleDefault-block');
  }

  private _getFoundedCoordFromSpan(textBlockElement: HTMLCollectionOf<Element> | undefined) {
    if (!this.helper.isCheckValue(textBlockElement)) return;
    return this.helper.findCoordFromSpan(textBlockElement!);
  }

  private _traversalListLength<S extends [], T extends []>(standardArr: S, targetArr: T) {
    const result = [];

    for (let i = 0; i < targetArr.length; i++) {
      const targetData = this.helper.removeDuplicatesByKey(targetArr[i]);
      const mergedArray = this.helper.mergeArrays(standardArr[i], targetData);
      result.push(mergedArray);
    }
    return result;
  }
}
