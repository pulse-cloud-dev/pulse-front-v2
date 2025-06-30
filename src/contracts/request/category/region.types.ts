
export interface RegionItem {
  name: string;
  description: string;
  code: string;
}

export interface RegionItemListResponse {
  body: RegionItem[];
  message: string;
}