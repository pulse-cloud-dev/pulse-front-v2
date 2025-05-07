export type TextStyle = typeof textStyle;
export type ListStyle = typeof listStyle;
export type ColorStyle = typeof colorStyle;
export type AlignStyle = typeof alignStyle;
export type CustomStyleMap = typeof customStyleMap;
export type TextEditorConfig = typeof textEditorConfig;

const textStyle = {
  bold: '굵기',
  italic: '기울림',
  underline: '밑줄',
};

const listStyle = {
  bullet: 'bullet',
  number: 'number',
};

const colorStyle = {
  red: 'red',
  blue: 'blue',
  green: 'green',
};

const alignStyle = {
  left: '왼쪽정렬',
  right: '오른쪽정렬',
  center: '가운데 정렬',
  justify: '양쪽 정렬',
};

const customStyleMap = {
  RED: { color: 'red' },
  BLUE: { color: 'blue' },
  GREEN: { color: 'green' },
  SIZE_12: { fontSize: '12px' },
  SIZE_16: { fontSize: '16px' },
  SIZE_24: { fontSize: '24px' },
  SIZE_32: { fontSize: '32px' },
};

const toolbarLabel = {
  text: textStyle,
  color: colorStyle,
  align: alignStyle,
  list: listStyle,
};

export const textEditorConfig = {
  customStyleMap,
  toolbarLabel,
};
