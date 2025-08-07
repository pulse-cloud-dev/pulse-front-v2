import { CheckField } from "@/shared/modules/select-ui";
import type { HTMLAttributes } from "react";
import { fieldQuerys } from "../../../Mentor/hooks/useFieldItems";
import { SubItemWithParent } from "../../type/searchProps";

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
  checkedItems: SubItemWithParent[];
  handleToggle: (key: SubItemWithParent) => void;
}) => {
  const { data: fields = [] } = fieldQuerys.useFieldItems();

  const selectedFieldObj = fields.find((field) => field.name === selectedField);
  const selectedFieldCode = selectedFieldObj?.code;

  const { data: originalSubFields = [] } = fieldQuerys.useSubFields(selectedFieldCode);

  const subFields =
    selectedField !== "전체"
      ? [
          {
            name: "전체",
            code: selectedFieldObj?.code || "all",
          },
          ...originalSubFields,
        ]
      : originalSubFields;

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
        {selectedField !== "전체" &&
          subFields.map(({ name, code }) => (
            <CheckField key={`${selectedField}-${name}`} className="check-field-module" variant="circle">
              <CheckField.Input
                checkId={`${selectedField}-${name}`}
                name={`${selectedField}-${name}`}
                isChecked={checkedItems.some((item) => item.code === code && item.parent === selectedField)}
                onChange={() =>
                  handleToggle({
                    code,
                    name,
                    parent: selectedField,
                  })
                }
              />
              <CheckField.Label checkId={`${selectedField}-${name}`}>{name}</CheckField.Label>
            </CheckField>
          ))}
      </div>
    </div>
  );
};
