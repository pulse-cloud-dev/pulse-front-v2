import { useCheckFieldGroup } from "@/shared/modules/select-ui";
import { useState } from "react";
import { useKey } from "@/shared/modules/modals/shared/hooks/useKey";

import { Header } from "../components/fieldPopupHeader";
import { Body } from "../components/fieldPopupBody";
import { SelectedItems } from "../../selectedBox";
import { Footer } from "../../popupFooter";

export type CheckedItemData = {
  code: string;
  name: string;
  parent: string;
};
export function FieldPopup({ closeModal, onApply, initialCheckedItems = [] }: { closeModal?: () => void; onApply?: (heckedItems: CheckedItemData[]) => void; initialCheckedItems?: CheckedItemData[] }) {
  const { reset } = useCheckFieldGroup({
    initialValues: { option: false },
  });
  const [selectedField, setSelectedField] = useState("기획/경영/마케팅");
  const [_, setSelected] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<CheckedItemData[]>(initialCheckedItems);

  const handleReset = () => {
    reset();
    setCheckedItems([]);
    setSelected(null);
    setSelectedField("기획/경영/마케팅");
  };

  const handleClose = () => {
    closeModal?.();
  };

  useKey("Escape", handleClose);

  const handleToggle = ({ code, name, parent }: CheckedItemData) => {
    const isAlreadySelected = checkedItems.some((item) => item.name === name);

    if (!isAlreadySelected && checkedItems.length >= 3) {
      alert("최대 3개까지 선택 가능합니다.");
      return;
    }

    setCheckedItems((prev) => {
      if (isAlreadySelected) {
        // 이미 선택된 항목 삭제
        return prev.filter((item) => item.name !== name);
      } else {
        // 새 항목 추가
        return [...prev, { code, name, parent }];
      }
    });
  };

  const handleApply = () => {
    onApply?.(checkedItems);
    closeModal?.();
  };

  return (
    <div className="popup-field" role="dialog" aria-modal="true" aria-labelledby="popup-title">
      <Header id="popup-title" onToggle={handleToggle} checkedItems={checkedItems} />
      <Body selectedField={selectedField} setSelectedField={setSelectedField} checkedItems={checkedItems} handleToggle={handleToggle} />
      <SelectedItems selectedItems={checkedItems} handleToggle={handleToggle} />
      <Footer onReset={handleReset} onClose={handleClose} onApply={handleApply} />
    </div>
  );
}
