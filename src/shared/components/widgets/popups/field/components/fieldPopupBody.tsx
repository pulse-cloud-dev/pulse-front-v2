import { CheckField } from "@/shared/modules/select-ui";
import type { HTMLAttributes } from "react";
import { useState, useEffect } from "react";
import { categoryApis } from "@/networks/apis/category.api";

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
  const [fields, setFields] = useState<{ name: string; code: string }[]>([]);
  const [subFields, setSubFields] = useState<{ name: string; code: string }[]>([]);

  // 분야 불러오기
  useEffect(() => {
    categoryApis.fieldItems()
      .then(setFields)
      .catch(console.error);
  }, []);

  // 분야 세부항목 불러오기
  useEffect(() => {
    if (!selectedField || fields.length === 0) return;

    const selected = fields.find((field) => field.name === selectedField);
    setSubFields([]); // 초기화

    if (selected) {
      categoryApis.subFields(selected.code)
        .then((res) => {
          if (res.length === 0) {
            setSubFields([]);
          } else {
            setSubFields(res);
          }
        })
        .catch(console.error);
    }
  }, [selectedField, fields]);

  return (
    <div className={`popup-local__body ${className}`} {...props}>
      <div
        role="listbox"
        aria-label="분야 선택"
        className="popup-local__column popup-local__column-left"
      >
        {fields.map(({ name }) => (
          <div
            role="option"
            aria-selected={selectedField === name}
            tabIndex={0}
            key={name}
            className={`popup-local__item ${selectedField === name ? "active" : ""}`}
            onClick={() => setSelectedField(name)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSelectedField(name);
            }}
          >
            {name}
          </div>
        ))}
      </div>

      <div 
        className="popup-local__column popup-local__column-right"
        aria-labelledby="subfield-group-label"
      >
        {subFields.map(({ name }) => (
          <CheckField key={name} className="check-field-module" variant="circle">
            <CheckField.Input
              checkId={`${selectedField}-${name}`}
              name={`${selectedField}-${name}`}
              isChecked={!!checkedItems[`${selectedField}-${name}`]}
              onChange={() => handleToggle(`${selectedField}-${name}`)}
            />
            <CheckField.Label checkId={`${selectedField}-${name}`}>{name}</CheckField.Label>
          </CheckField>
        ))}
      </div>
    </div>
  );
};
