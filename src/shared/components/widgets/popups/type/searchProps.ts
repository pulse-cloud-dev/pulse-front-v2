export type HeaderProps = {
  id?: string;
  onSearch: (keyword: string) => void;
  onToggle: (key: string) => void;
  checkedItems: Record<string, boolean>;
};

export type SubItemWithParent = {
  parent: string;
  name: string;
  code: string;
};