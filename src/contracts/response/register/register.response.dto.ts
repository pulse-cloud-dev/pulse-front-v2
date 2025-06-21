export interface CodeItem {
  name: string;
  description: string;
  code: string;
}

export interface NameDescription {
  name: string;
  description: string;
}

export interface ApiResponse<T> {
  body: T;
  message: string;
}
