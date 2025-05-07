import type { DraftStyleMap } from 'draft-js';

type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null | boolean;
interface ClassDictionary {
  [key: string]: boolean | undefined | null;
}
interface ClassArray extends Array<ClassValue> {}

function textStyleFn(style: 'bold' | 'italic' | 'underline') {
  let result;

  if (style === 'bold') {
    result = { fontWeight: 'bold' };
  } else if (style === 'italic') {
    result = { fontStyle: 'italic' };
  } else if (style === 'underline') {
    result = { textDecoration: 'underline' };
  }
  return result;
}

function classNames(...args: ClassValue[]): string {
  const classes: string[] = [];

  args.forEach((arg) => {
    if (!arg) return;

    const argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg.toString());
    } else if (Array.isArray(arg)) {
      classes.push(classNames(...arg));
    } else if (argType === 'object') {
      Object.keys(arg).forEach((key) => {
        // Type assertion to tell TypeScript that arg is a ClassDictionary
        if ((arg as ClassDictionary)[key]) {
          classes.push(key);
        }
      });
    }
  });

  return classes.join(' ');
}

/**
 * 객체를 배열로 변경하는 Helper
 * @param obj
 * @param keyName
 * @param valueName
 * @returns
 */

function objectToArray(
  obj: Record<string, unknown>,

  keyName: string | undefined = 'key',

  valueName: string | undefined = 'value',
) {
  return Object.keys(obj).map((key) => ({ [keyName]: key, [valueName]: obj[key] }));
}

/**
 * This is Function that helps create Custom Style Map
 * @param {StyleMapOptionType[]} styleMapConfig 설정할 CSS형태의 Style Map
 * @returns {CustomStyleMapType}
 *
 * styleMapConfig의 형태는 다음과 같다.
 *
 * 1. 글꼴
  { type: "fontFamily", label: "명조체", style: "myeongjo", value: "'myeongjo', serif" },
 *
 * 2. 글씨 색상
  { type: "fontColor", label: "FONT_COLOR_RED", style: "red", value: "red" },
 *
 *
 * 3. 글씨 사이즈
  { type: "fontSize", label: "FONT_SIZE_10", style: "10px", value: "10px" },
 *
 * 위의 객체들로 이루어진 배열의 형태
 */

function styledMap(styleMapConfig: Record<'type' | 'label' | 'style' | 'value', string>[]): DraftStyleMap {
  return styleMapConfig.reduce<DraftStyleMap>((map, option) => {
    let key: string;
    let value: { [key in 'fontFamily' | 'fontSize' | 'fontWeight' | 'fontColor' | 'fontStyle' | 'fontAlign' | string]: string };

    // Font Family Option
    if ('fontFamily' === option.type) {
      key = `FONT_FAMILY_${option.style?.toUpperCase()}`;
      value = { fontFamily: option.value! };
    }
    // Font Color Option
    else if ('fontColor' === option.type) {
      key = `FONT_COLOR_${option.style?.toUpperCase()}`;
      value = { color: option.value! };
    }
    // Font Size Option
    else if ('fontSize' === option.type) {
      key = `FONT_SIZE_${option.style?.replace('px', '')}`;
      value = { fontSize: option.value! };
    }
    // Font Style Option
    else if ('fontStyle' === option.type) {
      key = `FONT_STYLE_${option.style?.toUpperCase()}`;
      value = textStyleFn(option.style as 'bold' | 'italic' | 'underline')! as unknown as Record<string, string>;
    }
    // Font Align Option
    else if (option.type === 'fontAlign') {
      key = `FONT_ALIGN_${option.style?.toUpperCase()}`;
      value = { textAlign: option.value };
    }
    // None
    else {
      return map;
    }

    map[key] = value;

    return map;
  }, {});
}

export const utils = {
  classNames,
  objectToArray,
  styledMap,
};
