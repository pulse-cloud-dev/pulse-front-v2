import type { Any, ElementRect } from '../../types';
import { TextEditorModelHelper } from './model.helper';

export class TextEditorViewModelHelper {
  _helper: TextEditorModelHelper;

  constructor() {
    this._helper = new TextEditorModelHelper();
  }

  get helper() {
    return this._helper;
  }

  public isCheckValue(value: unknown): boolean {
    return value ? true : false;
  }

  public isCheckRef(ref: React.RefObject<unknown>): boolean {
    return ref.current ? true : false;
  }

  public findElementByClassName(element: HTMLElement, className: string) {
    if (!element || !className) return;
    return element.getElementsByClassName(className);
  }

  /**
   * 문단(Block)의 좌표 찾기
   * @key {HTMLCollectionOf<Element>} elements
   * @returns {null | BlocksRectType[]} 문단(Block)의 좌표를 담은 배열
   * Ex)
      {
        bottom: 180.8000030517578,
        height: 24,
        left: 32.63999938964844,
        right: 833.2799530029297,
        top: 156.8000030517578,
        width: 800.6399536132812,
        x: 32.63999938964844,
        y: 156.8000030517578,
      }[]
   */
  public findCoordFromSpan(elements: HTMLCollectionOf<Element>): null | ElementRect[][] {
    const result: ElementRect[][] = this.helper.create2DArray(elements.length);
    let temp: ElementRect[] = [];

    const parentElement = document.getElementsByClassName('DraftEditor-editorContainer')[0];

    const parentRect = parentElement.getBoundingClientRect();

    if (elements.length === 0) {
      return null;
    }
    for (let i = 0; i < elements.length; i++) {
      const block = elements[i]; // 문단

      // const blockRect = block.getBoundingClientRect();

      const spans = block.getElementsByTagName('span'); // 문단안의 Span 태그 배열

      for (let j = 0; j < spans.length; j++) {
        const span = spans[j];
        const spanRect = span.getBoundingClientRect(); // 각 글자 Span의 범위
        const newData = {
          x: this.getDecimalPoint(spanRect.x),
          y: this.getDecimalPoint(spanRect.y),
          top: this.getDecimalPoint(Math.abs(spanRect.top - parentRect.top)),
          bottom: this.getDecimalPoint(spanRect.bottom),
          left: this.getDecimalPoint(Math.abs(spanRect.left - parentRect.left)),
          right: this.getDecimalPoint(spanRect.right),
          width: this.getDecimalPoint(spanRect.width),
          height: this.getDecimalPoint(spanRect.height),
        };
        temp.push(newData);
      }
      result[i] = temp;
      temp = [];
    }

    return result;
  }

  /**
   * 소수점 자리수를 자르는 함수
   * @key {number} data - 실수
   * @key {number} points - 소숫점 자리수
   * @returns - 원하는 소숫점을 갖는 정수
   */
  public getDecimalPoint(data: number, points: number = 0) {
    if (typeof data === 'undefined' || data === null) {
      throw Error('Data is not property type');
    }

    return Number(data.toFixed(points));
  }

  public removeDuplicatesByKey(items: Any[], uniqueKey: string = 'left'): Any[] {
    // uniqueKey를 제외한 객체를 문자열로 변환하여 비교하기 위한 함수
    const getObjectFingerprint = (obj: Any): string => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [uniqueKey]: excluded, ...rest } = obj;
      return JSON.stringify(rest);
    };

    // uniqueKey 값을 기준으로 객체들을 그룹화
    const groupedByUniqueKey = items.reduce((groups: { [key: string]: Any[] }, item: Any) => {
      const groupKey = item[uniqueKey]?.toString() ?? 'undefined';
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    }, {});

    // 각 uniqueKey 그룹 내에서 중복 제거
    const deduplicatedItems = Object.values(groupedByUniqueKey).flatMap((group: Any[]) => {
      const uniqueFingerprints = new Set<string>();
      return group.filter((item: Any) => {
        const fingerprint = getObjectFingerprint(item);
        if (!uniqueFingerprints.has(fingerprint)) {
          uniqueFingerprints.add(fingerprint);
          return true;
        }
        return false;
      });
    });

    return deduplicatedItems;
  }

  public mergeArrays(array1: Any[], array2: Any[]): Any[] {
    return array1.map((item, index) => {
      return { ...item, ...array2[index] };
    });
  }
}
