import { useState, useMemo, useEffect } from "react";
import { useKey } from "@/shared/modules/modals/shared/hooks/useKey";

import { Header } from "../components/localPopupHeader";
import { Body } from "../components/localPopupBody";
import { SelectedItems } from "../../selectedBox";
import { Footer } from "../../popupFooter";
import { useCheckFieldGroup } from "@/shared/modules/select-ui";

export function LocalPopup({ closeModal, onApply, initialCheckedItems = {} }: { closeModal?: () => void; onApply?: (selected: string[], checkedItems: Record<string, boolean>) => void; initialCheckedItems?: Record<string, boolean> }) {
  const { reset } = useCheckFieldGroup({
    initialValues: {
      option: false,
    },
  });

  const [selectedCity, setSelectedCity] = useState("서울");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(initialCheckedItems);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [cities] = useState<{ name: string; code: string }[]>([]);

  const handleReset = () => {
    reset();
    setCheckedItems({});
    setSelectedCity("서울");
    setSearchKeyword("");
  };

  const handleClose = () => {
    closeModal?.();
  };

  useKey("Escape", handleClose);

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

        if (key === "전국-전국") {
          return { key, label: "전국" };
        }

        return { key, label: `${city} > ${district}` };
      });
  }, [checkedItems]);

  const handleApply = () => {
    const regionList = selectedItems.map((item) => item.label);
    onApply?.(regionList, checkedItems);
    // setRegionChecked(checkedItems);
    closeModal?.();
  };

  // 검색어 변경 시 도시 선택
  useEffect(() => {
    if (!searchKeyword) return;
    const matched = cities.find((city) => city.name.toLowerCase().includes(searchKeyword.toLowerCase()));
    if (matched) setSelectedCity(matched.name);
  }, [searchKeyword, cities]);

  return (
    <div className="popup-local" role="dialog" aria-modal="true" aria-labelledby="popup-title">
      <Header id="popup-title" onSearch={setSearchKeyword} onToggle={handleToggle} checkedItems={checkedItems} />
      <Body
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        checkedItems={checkedItems}
        handleToggle={handleToggle}
        // searchKeyword={searchKeyword}
      />
      <SelectedItems selectedItems={selectedItems} handleToggle={handleToggle} />
      <Footer onReset={handleReset} onClose={handleClose} onApply={handleApply} />
    </div>
  );
}
