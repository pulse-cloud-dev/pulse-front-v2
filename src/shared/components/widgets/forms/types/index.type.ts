export interface IFormData {
  [key: string]: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type?: string; // 입력 타입 (예: text, email, password)
  required?: boolean;
  placeholder?: string;
}
