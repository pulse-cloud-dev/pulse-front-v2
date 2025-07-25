import { CheckField } from "@/shared/modules/select-ui";
import type { HTMLAttributes } from "react";
import { fieldQuerys } from "../../../Mentor/hooks/useFieldItems";

export const Body = ({
  selectedField,
  setSelectedField,
  checkedItems,
  handleToggle,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  selectedField: string;
  setSelectedField: (field: string) => void;
  checkedItems: Record<string, boolean>;
  handleToggle: (key: string) => void;
}) => {
  const { data: fields = [] } = fieldQuerys.useFieldItems();

  const selectedFieldObj = fields.find((f) => f.name === selectedField);
  const selectedFieldCode = selectedFieldObj?.code;

  const { data: subFields = [] } = fieldQuerys.useSubFields(selectedFieldCode);

  return (
    <div className={`popup-local__body ${className}`} {...props}>
      <div className="popup-local__column popup-local__column-left" role="listbox" aria-label="분야 선택">
        {fields.map(({ name }) => (
          <div
            role="option"
            aria-selected={selectedField === name}
            tabIndex={0}
            key={name}
            className={`popup-local__item ${selectedField === name ? "active" : ""}`}
            onClick={() => setSelectedField(name)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSelectedField(name)}
          >
            {name}
          </div>
        ))}
      </div>

      <div className="popup-local__column popup-local__column-right" aria-labelledby="subfield-group-label">
        {subFields.map(({ name }) => (
          <CheckField key={name} className="check-field-module" variant="circle">
            <CheckField.Input checkId={`${selectedField}-${name}`} name={`${selectedField}-${name}`} isChecked={!!checkedItems[`${selectedField}-${name}`]} onChange={() => handleToggle(`${selectedField}-${name}`)} />
            <CheckField.Label checkId={`${selectedField}-${name}`}>{name}</CheckField.Label>
          </CheckField>
        ))}
      </div>
    </div>
  );
};
