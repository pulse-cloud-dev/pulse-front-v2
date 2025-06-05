import { useState, useMemo } from "react";

// 컴포넌트
import { Header } from "../components/localPopupHeader";
import { Body } from "../components/localPopupBody";
import { SelectedItems } from "../components/localSelected";
import { Footer } from "../components/localPopupFooter";


// 🔹 LocalPopup Wrapper
export function LocalPopup() {
  const [selectedCity, setSelectedCity] = useState("서울특별시");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleToggle = (key: string) => {
    const selectedCount = Object.values(checkedItems).filter(Boolean).length;
    if (!checkedItems[key] && selectedCount >= 10) {
      alert("최대 10개까지 선택 가능합니다.");
      return;
    }
    setCheckedItems({ ...checkedItems, [key]: !checkedItems[key] });
  };

  const selectedItems = useMemo(() => {
  return Object.entries(checkedItems)
    .filter(([, isChecked]) => isChecked)
    .map(([key]) => {
      const [city, district] = key.split("-");
      return { key, label: `${city} > ${district}` };
    });
}, [checkedItems]);

  return (
    <div className="popup-local">
      <Header />
      <Body
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        checkedItems={checkedItems}
        handleToggle={handleToggle}
      />
      <SelectedItems selectedItems={selectedItems} handleToggle={handleToggle} />
      <Footer />
    </div>
  );
}

