
export interface CategoryItem {
  name: string;
  description: string;
  code: string;
}

export interface CategoryResponse {
  body: CategoryItem[];
  message: string;
}

