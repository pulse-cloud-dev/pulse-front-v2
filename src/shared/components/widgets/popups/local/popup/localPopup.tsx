import { useState, useMemo } from "react";
import { useKey } from "@/shared/modules/modals/shared/hooks/useKey";

import { Header } from "../components/localPopupHeader";
import { Body } from "../components/localPopupBody";
import { SelectedItems } from "../../selectedBox";
import { Footer } from "../../popupFooter";
import { useCheckFieldGroup } from "@/shared/modules/select-ui";
import { SubItemWithParent } from "../../type/searchProps";

export function LocalPopup({ closeModal, onApply, initialCheckedItems = [] }: { closeModal?: () => void; onApply?: (checkedItems: SubItemWithParent[]) => void; initialCheckedItems?: SubItemWithParent[] }) {
  const { reset } = useCheckFieldGroup({
    initialValues: {
      option: false,
    },
  });

  const [selectedCity, setSelectedCity] = useState("서울");
  const [checkedItems, setCheckedItems] = useState<SubItemWithParent[]>(initialCheckedItems);

  const handleReset = () => {
    reset();
    setCheckedItems([]);
    setSelectedCity("서울");
  };

  const handleClose = () => {
    closeModal?.();
  };

  useKey("Escape", handleClose);
  const handleToggle = ({ code, name, parent }: SubItemWithParent) => {
    const isAlreadySelected = checkedItems.some((item) => item.code === code);

    if (!isAlreadySelected && checkedItems.length >= 10) {
      alert("최대 10개까지 선택 가능합니다.");
      return;
    }

    setCheckedItems((prev) => (isAlreadySelected ? prev.filter((item) => item.code !== code) : [...prev, { code, name, parent }]));
  };

  const handleApply = () => {
    onApply?.(checkedItems);
    closeModal?.();
  };

  return (
    <div className="popup-local" role="dialog" aria-modal="true" aria-labelledby="popup-title">
      <Header id="popup-title" onToggle={handleToggle} checkedItems={checkedItems} />
      <Body selectedCity={selectedCity} setSelectedCity={setSelectedCity} checkedItems={checkedItems} handleToggle={handleToggle} />
      <SelectedItems selectedItems={checkedItems} handleToggle={handleToggle} />
      <Footer onReset={handleReset} onClose={handleClose} onApply={handleApply} />
    </div>
  );
}
