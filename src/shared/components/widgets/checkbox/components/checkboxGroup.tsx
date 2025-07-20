import { useCheckboxGroup } from "../context/checkboxProvider";
import { CheckField } from "@/shared/modules/select-ui";

export interface CheckboxGroupAllProps extends ReturnType<typeof useCheckboxGroup> {
  id?: string;
}

const CheckboxForAll = ({ items, toggleCheckbox }: CheckboxGroupAllProps) => (
  <>
    {items
      .filter((item) => item.id === "all")
      .map((item) => (
        <CheckField key={item.id} variant="circle" className="check-field-module">
          <CheckField.Input checkId={item.id} name={item.id} isChecked={item.checked} onChange={() => toggleCheckbox(item.id)} />
          <CheckField.Label checkId={item.id}>
            <span style={{ visibility: "hidden" }}>.</span>
          </CheckField.Label>
        </CheckField>
      ))}
  </>
);

export interface CheckboxGroupItemProps extends ReturnType<typeof useCheckboxGroup> {
  id?: Id;
}

const CheckboxForItem = ({ items, id, toggleCheckbox }: CheckboxGroupItemProps) => (
  <>
    {items.map((item) =>
      item.id === id ? (
        <CheckField key={item.id} variant="circle" className="check-field-module">
          <CheckField.Input checkId={item.id} name={item.id} isChecked={item.checked} onChange={() => toggleCheckbox(item.id)} />
          <CheckField.Label checkId={item.id}>
            <span style={{ visibility: "hidden" }}>.</span>
          </CheckField.Label>
        </CheckField>
      ) : null
    )}
  </>
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
