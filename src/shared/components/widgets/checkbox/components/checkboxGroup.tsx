import { useCheckboxGroup } from "../context/checkboxProvider";

export interface CheckboxGroupAllProps extends ReturnType<typeof useCheckboxGroup> {
  id?: string;
}

const CheckboxForAll = ({ items, toggleCheckbox }: CheckboxGroupAllProps) => (
  <>
    {items
      .filter((item) => item.id === "all")
      .map((item) => (
        <input key={item.id} type="checkbox" checked={item.checked} onChange={() => toggleCheckbox(item.id)} />
      ))}
  </>
);

export interface CheckboxGroupItemProps extends ReturnType<typeof useCheckboxGroup> {
  id?: Id;
}
const CheckboxForItem = ({ items, id, toggleCheckbox }: CheckboxGroupItemProps) => (
  <>{items.map((item) => (item.id === id ? <input key={item.id} type="checkbox" checked={item.checked} onChange={() => toggleCheckbox(item.id)} /> : null))}</>
);

export interface CheckboxGroupProps {
  id?: string;
  type: "all" | "item";
}

export const CheckboxGroup = (props: CheckboxGroupProps) => {
  const { id, type } = props;

  const checkboxGroups = useCheckboxGroup();

  return (
    <>
      {type === "all" && <CheckboxForAll id={id} {...checkboxGroups} />}
      {type === "item" && <CheckboxForItem id={id} {...checkboxGroups} />}
    </>
  );
};
