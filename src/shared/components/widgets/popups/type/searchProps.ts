export type HeaderProps = {
  id?: string;
  onToggle: (key: SubItemWithParent) => void;
  checkedItems: SubItemWithParent[];
};

export type SubItemWithParent = {
  parent: string;
  name: string;
  code: string;
};
