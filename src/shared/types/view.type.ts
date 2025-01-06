export interface ViewEventProps {
  event?: { [key in string]: (param?: any) => void };
}
