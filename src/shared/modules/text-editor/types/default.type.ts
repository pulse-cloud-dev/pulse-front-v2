/**
 * @description
 *  - start : when moving
 *  - end : when moved
 */

export type Point = {
  start: number;
  end: number;
};

/**
 *
 *
 */

export type OffsetLength = {
  offset: number;
  length: number;
};

/**
 * Represents the direction and distance in four cardinal directions.
 * This type is typically used to define the offset at which an object is located within the editor's Viewer.
 *
 * Properties:
 * - `left`: Distance or offset from the left. Optional.
 * - `right`: Distance or offset from the right. Optional.
 * - `top`: Distance or offset from the top. Optional.
 * - `bottom`: Distance or offset from the bottom. Optional.
 *
 * Example:
 * ```ts
 * const margin: Direction = { top: 10, left: 20 };
 * ```
 */
export interface Direction {
  left?: number; // Optional. Offset from the left, in pixels.
  right?: number; // Optional. Offset from the right, in pixels.
  top?: number; // Optional. Offset from the top, in pixels.
  bottom?: number; // Optional. Offset from the bottom, in pixels.
}

export interface Size {
  width: number;
  height: number;
}

export interface Coord {
  x: number;
  y: number;
}

export interface Style {
  style: string;
}
export interface Styles {
  styles: string[];
}

export type ElementRect = Direction & Size & Coord;

export type ReStructInLineStyle = Point & Style;

export type ReStructInLineStyles = Point & Styles;

export type OriginInLineStyleType = OffsetLength & Style;

export type Align = 'left' | 'center' | 'right' | 'justify' | '';

export type FontAlign = 'FONT_ALIGN_LEFT' | 'FONT_ALIGN_CENTER' | 'FONT_ALIGN_RIGHT' | 'FONT_ALIGN_JUSTIFY' | Align;
