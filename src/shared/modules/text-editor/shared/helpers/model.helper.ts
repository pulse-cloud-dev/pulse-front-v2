import type { FontAlign, Point, ReStructInLineStyles } from '../../types';

export class TextEditorModelHelper {
  /**
   * Input으로 입력된 길이만큼의 이중배열 만드는 함수
   * @key {number} length
   * @returns {[][]} 이중 배열
   */
  public create2DArray(length: number): [][] {
    return Array(length)
      .fill(undefined)
      .map(() => []);
  }

  /**
   * 이중배열의 형태를 중복값을 제외한 객체 형태로 만드는 함수
   * @key {string[][]} input2dArray 이중배열
   * @returns { ReStructInLineStyles []}
   */

  public covert2DArrayToObject(input2dArray: string[][]): ReStructInLineStyles[] {
    const result: ReStructInLineStyles[] = [];
    let start: number = 0;
    let currentStyles: string[] = [];

    for (let i = 0; i < input2dArray.length; i++) {
      if (JSON.stringify(input2dArray[i]) !== JSON.stringify(currentStyles)) {
        if (i > start) {
          result.push({ start: start, end: i, styles: currentStyles });
        }
        start = i;
        currentStyles = input2dArray[i];
      }
    }

    if (start < input2dArray.length) {
      result.push({ start: start, end: input2dArray.length, styles: currentStyles });
    }

    return result;
  }

  public convertColorToUpperCase(color: string): string | undefined {
    if (!color) return undefined;

    return color.replace('#', '').toUpperCase();
  }

  /**
   * align에 대한 변수를 선택하는 함수
   * @param {"left" | "center" | "right" | "justify" | ""} type
   * @returns {"left" | "center" | "right" | "justify" | ""}
   */

  public pickBlockStyle(type: FontAlign | '') {
    switch (type) {
      // Default
      case 'left':
        return 'text-align-left';
      case 'center':
        return 'text-align-center';
      case 'right':
        return 'text-align-right';
      case 'justify':
        return 'text-align-justify';
      // Custom
      case 'FONT_ALIGN_LEFT':
        return 'text-align-left';
      case 'FONT_ALIGN_RIGHT':
        return 'text-align-right';
      case 'FONT_ALIGN_CENTER':
        return 'text-align-center';
      case 'FONT_ALIGN_JUSTIFY':
        return 'text-align-justify';
      default:
        return '';
    }
  }
}
