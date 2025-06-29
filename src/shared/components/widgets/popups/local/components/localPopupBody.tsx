import { CheckField } from "@/shared/modules/select-ui";
import type { HTMLAttributes } from "react";
import { localQeurys } from "../../../Mentor/hooks/useLocals";


export const Body = ({
  selectedCity,
  setSelectedCity,
  checkedItems,
  handleToggle,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  checkedItems: Record<string, boolean>;
  handleToggle: (key: string) => void;
}) => {
  const { data: cities = [] } = localQeurys.useCities();
  const selectedCityObj = cities.find(city => city.name === selectedCity);
  const { data: districts = [] } = localQeurys.useDistricts(selectedCityObj?.code, selectedCity);

  return (
    <div className={`popup-local__body ${className}`} {...props}>
      <div
        role="listbox"
        aria-label="지역 선택"
        className="popup-local__column popup-local__column-left"
      >
        {cities.map(({ name }) => (
          <div
            key={name}
            role="option"
            aria-selected={selectedCity === name}
            tabIndex={0}
            className={`popup-local__item ${selectedCity === name ? "active" : ""}`}
            onClick={() => setSelectedCity(name)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSelectedCity(name);
            }}
          >
            {name}
          </div>
        ))}
      </div>

      <div 
        className="popup-local__column popup-local__column-right"
        aria-labelledby="subregion-group-label"
      >
        {districts.map(({ name }) => (
          <CheckField key={name} className="check-field-module" variant="circle">
            <CheckField.Input
              checkId={`${selectedCity}-${name}`}
              name={`${selectedCity}-${name}`}
              isChecked={!!checkedItems[`${selectedCity}-${name}`]}
              onChange={() => handleToggle(`${selectedCity}-${name}`)}
            />
            <CheckField.Label checkId={`${selectedCity}-${name}`}>{name}</CheckField.Label>
          </CheckField>
        ))}
      </div>
    </div>
  );
};
