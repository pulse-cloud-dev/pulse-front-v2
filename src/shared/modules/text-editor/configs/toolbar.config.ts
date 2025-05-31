export type ButtonGroupList = { label: string; eventLabel: string }[];
export type SelectOptionList = { type: string; label: string; style: string; value: string }[];

const selectEditorSizes: SelectOptionList = [
  { type: 'editorSize', label: 'EDITOR_SIZE', style: '40_16', value: '40_16' },
  { type: 'editorSize', label: 'EDITOR_SIZE', style: '384_96', value: '384_96' },
  { type: 'editorSize', label: 'EDITOR_SIZE', style: '384_96', value: '384_96' },
  { type: 'editorSize', label: 'EDITOR_SIZE', style: '480_96', value: '480_96' },
  { type: 'editorSize', label: 'EDITOR_SIZE', style: '64_32', value: '64_32' },
  { type: 'editorSize', label: 'EDITOR_SIZE', style: '176_32', value: '176_32' },
  { type: 'editorSize', label: 'EDITOR_SIZE', style: '1440_192', value: '1440_192' },
  { type: 'editorSize', label: 'EDITOR_SIZE', style: '384_288', value: '384_288' },
  { type: 'editorSize', label: 'EDITOR_SIZE', style: '416_320', value: '416_320' },
];

const selectFontAligns: SelectOptionList = [
  { type: 'fontAligns', label: 'FONT_ALIGN_LEFT', style: 'left', value: 'left' },
  { type: 'fontAligns', label: 'FONT_ALIGN_RIGHT', style: 'right', value: 'right' },
  { type: 'fontAligns', label: 'FONT_ALIGN_CENTER', style: 'center', value: 'center' },
];

const selectFontStyles: SelectOptionList = [
  { type: 'fontStyle', label: 'FONT_STYLE_UNDERLINE', style: 'underline', value: 'underline' },
  { type: 'fontStyle', label: 'FONT_STYLE_ITALIC', style: 'italic', value: 'italic' },
  { type: 'fontStyle', label: 'FONT_STYLE_BOLD', style: 'bold', value: 'bold' },
];

// 글꼴
const selectFontFamilies: SelectOptionList = [
  { type: 'fontFamily', label: 'FONT_FAMILY_MYEONGJO', style: 'myeongjo', value: "'myeongjo', serif" },
  { type: 'fontFamily', label: 'FONT_FAMILY_GOTHIC', style: 'gothic', value: "'Gothic', sans-serif" },
  { type: 'fontFamily', label: 'FONT_FAMILY_GULIM', style: 'gulim', value: "'Gulim', sans-serif" },
  { type: 'fontFamily', label: 'FONT_FAMILY_BATANG', style: 'batang', value: "'Batang', serif" },
  { type: 'fontFamily', label: 'FONT_FAMILY_DOTUM', style: 'dotum', value: "'Dotum', sans-serif" },
  { type: 'fontFamily', label: 'FONT_FAMILY_GUGSUH', style: 'gungsuh', value: "'Gungsuh', serif" },
  { type: 'fontFamily', label: 'FONT_FAMILY_HANGIL', style: 'hangil', value: "'HangilSC', sans-serif" },
  { type: 'fontFamily', label: 'FONT_FAMILY_NANUMGOTHIC-LIGHT', style: 'nanumgothic-light', value: "'Nanum Gothic', sans-serif" },
  { type: 'fontFamily', label: 'FONT_FAMILY_NANUMGOTHIC', style: 'nanumgothic', value: "'Nanum Gothic', sans-serif" },
  { type: 'fontFamily', label: 'FONT_FAMILY_NANUMGOTHIC-BOLD', style: 'nanumgothic-bold', value: "'Nanum Gothic', sans-serif" },
  { type: 'fontFamily', label: 'FONT_FAMILY_NANUMGOTHIC-EXTRABOLD', style: 'nanumgothic-extrabold', value: "'Nanum Gothic', sans-serif" },
];

// 글씨 기본 색상
const selectFontColors: SelectOptionList = [
  { type: 'fontColor', label: 'FONT_COLOR_RED', style: 'red', value: 'red' },
  { type: 'fontColor', label: 'FONT_COLOR_BLUE', style: 'blue', value: 'blue' },
  { type: 'fontColor', label: 'FONT_COLOR_GREEN', style: 'green', value: 'green' },
  { type: 'fontColor', label: 'FONT_COLOR_YELLOW', style: 'yellow', value: 'yellow' },
];

// 글씨 사이즈
const selectFontSizes: SelectOptionList = [
  { type: 'fontSize', label: 'FONT_SIZE_10', style: '10px', value: '10px' },
  { type: 'fontSize', label: 'FONT_SIZE_12', style: '12px', value: '12px' },
  { type: 'fontSize', label: 'FONT_SIZE_14', style: '14px', value: '14px' },
  { type: 'fontSize', label: 'FONT_SIZE_16', style: '16px', value: '16px' },
  { type: 'fontSize', label: 'FONT_SIZE_18', style: '18px', value: '18px' },
  { type: 'fontSize', label: 'FONT_SIZE_20', style: '20px', value: '20px' },
  { type: 'fontSize', label: 'FONT_SIZE_22', style: '22px', value: '22px' },
  { type: 'fontSize', label: 'FONT_SIZE_24', style: '24px', value: '24px' },
  { type: 'fontSize', label: 'FONT_SIZE_26', style: '26px', value: '26px' },
  { type: 'fontSize', label: 'FONT_SIZE_28', style: '28px', value: '28px' },
  { type: 'fontSize', label: 'FONT_SIZE_32', style: '32px', value: '32px' },
  { type: 'fontSize', label: 'FONT_SIZE_34', style: '34px', value: '34px' },
  { type: 'fontSize', label: 'FONT_SIZE_36', style: '36px', value: '36px' },
  { type: 'fontSize', label: 'FONT_SIZE_38', style: '38px', value: '38px' },
  { type: 'fontSize', label: 'FONT_SIZE_40', style: '40px', value: '40px' },
  { type: 'fontSize', label: 'FONT_SIZE_42', style: '42px', value: '42px' },
  { type: 'fontSize', label: 'FONT_SIZE_44', style: '44px', value: '44px' },
  { type: 'fontSize', label: 'FONT_SIZE_46', style: '46px', value: '46px' },
  { type: 'fontSize', label: 'FONT_SIZE_48', style: '48px', value: '48px' },
  { type: 'fontSize', label: 'FONT_SIZE_50', style: '50px', value: '50px' },
  { type: 'fontSize', label: 'FONT_SIZE_52', style: '52px', value: '52px' },
  { type: 'fontSize', label: 'FONT_SIZE_54', style: '54px', value: '54px' },
  { type: 'fontSize', label: 'FONT_SIZE_56', style: '56px', value: '56px' },
  { type: 'fontSize', label: 'FONT_SIZE_58', style: '58px', value: '58px' },
  { type: 'fontSize', label: 'FONT_SIZE_60', style: '60px', value: '60px' },
  { type: 'fontSize', label: 'FONT_SIZE_62', style: '62px', value: '62px' },
  { type: 'fontSize', label: 'FONT_SIZE_64', style: '64px', value: '64px' },
  { type: 'fontSize', label: 'FONT_SIZE_66', style: '66px', value: '66px' },
  { type: 'fontSize', label: 'FONT_SIZE_68', style: '68px', value: '68px' },
  { type: 'fontSize', label: 'FONT_SIZE_70', style: '70px', value: '70px' },
  { type: 'fontSize', label: 'FONT_SIZE_72', style: '72px', value: '72px' },
  { type: 'fontSize', label: 'FONT_SIZE_74', style: '74px', value: '74px' },
  { type: 'fontSize', label: 'FONT_SIZE_76', style: '76px', value: '76px' },
  { type: 'fontSize', label: 'FONT_SIZE_78', style: '78px', value: '78px' },
  { type: 'fontSize', label: 'FONT_SIZE_80', style: '80px', value: '80px' },
  { type: 'fontSize', label: 'FONT_SIZE_82', style: '82px', value: '82px' },
  { type: 'fontSize', label: 'FONT_SIZE_84', style: '84px', value: '84px' },
  { type: 'fontSize', label: 'FONT_SIZE_86', style: '86px', value: '86px' },
  { type: 'fontSize', label: 'FONT_SIZE_88', style: '88px', value: '88px' },
  { type: 'fontSize', label: 'FONT_SIZE_90', style: '90px', value: '90px' },
  { type: 'fontSize', label: 'FONT_SIZE_92', style: '92px', value: '92px' },
  { type: 'fontSize', label: 'FONT_SIZE_94', style: '94px', value: '94px' },
];

const buttonGroupEditorSizes: ButtonGroupList = [
  { label: '40x16', eventLabel: 'EDITOR_SIZE_40_16' },
  { label: '384x96', eventLabel: 'EDITOR_SIZE_384_96' },
  { label: '384x96', eventLabel: 'EDITOR_SIZE_384_96' },
  { label: '480x96', eventLabel: 'EDITOR_SIZE_480_96' },
  { label: '64x32', eventLabel: 'EDITOR_SIZE_64_32' },
  { label: '176x32', eventLabel: 'EDITOR_SIZE_176_32' },
  { label: '1440x192', eventLabel: 'EDITOR_SIZE_1440_192' },
  { label: '384x288', eventLabel: 'EDITOR_SIZE_384_288' },
  { label: '416x320', eventLabel: 'EDITOR_SIZE_416_320' },
];

// 글자 정렬
const buttonGroupFontAligns: ButtonGroupList = [
  { label: '왼쪽', eventLabel: 'FONT_ALIGN_LEFT' },
  { label: '가운데', eventLabel: 'FONT_ALIGN_CENTER' },
  { label: '오른쪽', eventLabel: 'FONT_ALIGN_RIGHT' },
];

// 글자 색상
const buttonGroupFontColors: ButtonGroupList = [
  { label: 'red', eventLabel: 'FONT_COLOR_RED' },
  { label: 'blue', eventLabel: 'FONT_COLOR_BLUE' },
  { label: 'green', eventLabel: 'FONT_COLOR_GREEN' },
  { label: 'yellow', eventLabel: 'FONT_COLOR_YELLOW' },
];

// 글자 사이즈
const buttonGroupFontSizes: ButtonGroupList = [
  { label: '12', eventLabel: 'FONT_SIZE_12' },
  { label: '16', eventLabel: 'FONT_SIZE_16' },
  { label: '24', eventLabel: 'FONT_SIZE_24' },
  { label: '32', eventLabel: 'FONT_SIZE_32' },
  { label: '40', eventLabel: 'FONT_SIZE_40' },
];

// 글꼴 형태
const buttonGroupFontStyles: ButtonGroupList = [
  { label: '굵기', eventLabel: 'FONT_STYLE_BOLD' },
  { label: '기울림', eventLabel: 'FONT_STYLE_ITALIC' },
  { label: '밑줄', eventLabel: 'FONT_STYLE_UNDERLINE' },
];

export const textEditorToolbarConfig = {
  select: {
    fontFamilies: selectFontFamilies,
    fontColors: selectFontColors,
    fontSizes: selectFontSizes,
    fontStyles: selectFontStyles,
    fontAligns: selectFontAligns,

    editorSizes: selectEditorSizes,
  },
  button: {
    fontAlign: buttonGroupFontAligns,
    fontSize: buttonGroupFontSizes,
    fontColor: buttonGroupFontColors,
    fontStyle: buttonGroupFontStyles,

    editorSize: buttonGroupEditorSizes,
  },
};
