export type SetAction<T> = (partial: (state: T) => T | Partial<T>, replace?: false) => void;
