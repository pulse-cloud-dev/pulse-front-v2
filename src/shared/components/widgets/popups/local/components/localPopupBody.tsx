import { CheckField } from "@/shared/modules/select-ui";
import type { HTMLAttributes } from "react";
import { useState, useEffect } from "react";
import { categoryApis } from "@/networks/apis/category.api";



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
  const [cities, setCities] = useState<{ name: string; code: string }[]>([]);
  const [districts, setDistricts] = useState<{ name: string; code: string }[]>([]);

  // 시/도 목록 
  useEffect(() => {
    categoryApis.regionItems().then(setCities).catch(console.error);
  }, []);

  // 시/도 선택 시 구/군 로드
  useEffect(() => {
  if (!selectedCity || cities.length === 0) return;

  const selected = cities.find((city) => city.name === selectedCity);

  setDistricts([]); // 초기화

  if (selected) {
    categoryApis.subRegions(selected.code)
      .then((res) => {
        // 세종/전국은 수동으로 하위 항목 지정
        if (res.length === 0) {
          if (selectedCity === "세종") {
            setDistricts([{ name: "전체", code: "SEJONG-전체" }]);
          } else if (selectedCity === "전국") {
            setDistricts([{ name: "전국", code: "ALL-전국" }]);
          } else {
            setDistricts([]); // 기타 지역
          }
        } else {
          setDistricts(res);
        }
      })
      .catch(console.error);
  }
}, [selectedCity, cities]);


  return (
    <div className={`popup-local__body ${className}`} {...props}>
      <div className="popup-local__column popup-local__column-left">
        {cities.map(({ name }) => (
          <div
            key={name}
            className={`popup-local__item ${selectedCity === name ? "active" : ""}`}
            onClick={() => setSelectedCity(name)}
          >
            {name}
          </div>
        ))}
      </div>

      <div className="popup-local__column popup-local__column-right">
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
