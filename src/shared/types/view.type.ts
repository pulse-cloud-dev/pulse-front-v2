export interface ViewEventProps {
  count?: number;
  event?: { [key in string]: (param?: any) => void };
}
