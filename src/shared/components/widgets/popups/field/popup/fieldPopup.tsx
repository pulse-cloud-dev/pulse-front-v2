import { useCheckFieldGroup } from "@/shared/modules/select-ui";
import { useState, useMemo, useEffect } from "react";
import { useKey } from "@/shared/modules/modals/shared/hooks/useKey";

import { Header } from "../components/fieldPopupHeader";
import { Body } from "../components/fieldPopupBody";
import { SelectedItems } from "../../selectedBox";
import { Footer } from "../../popupFooter";

export function FieldPopup({ closeModal, onApply, initialCheckedItems = {} }: { closeModal?: () => void; onApply?: (selected: string[], checkedItems: Record<string, boolean>) => void; initialCheckedItems?: Record<string, boolean> }) {
  const { reset } = useCheckFieldGroup({
    initialValues: { option: false },
  });

  const [selectedField, setSelectedField] = useState("기획/경영/마케팅");
  const [_, setSelected] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(initialCheckedItems);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [fields] = useState<{ name: string; code: string }[]>([]);

  const handleReset = () => {
    reset();
    setCheckedItems({});
    setSelected(null);
    setSelectedField("기획/경영/마케팅");
    setSearchKeyword("");
  };

  const handleClose = () => {
    closeModal?.();
  };

  useKey("Escape", handleClose);

  const handleToggle = (key: string) => {
    const selectedCount = Object.values(checkedItems).filter(Boolean).length;
    if (!checkedItems[key] && selectedCount >= 3) {
      alert("최대 3개까지 선택 가능합니다.");
      return;
    }
    setCheckedItems({ ...checkedItems, [key]: !checkedItems[key] });
  };

  const selectedItems = useMemo(() => {
    return Object.entries(checkedItems)
      .filter(([, isChecked]) => isChecked)
      .map(([key]) => {
        const [field, subField] = key.split("-");
        return { key, label: `${field} > ${subField}` };
      });
  }, [checkedItems]);

  const handleApply = () => {
    const selectedLabels = selectedItems.map((item) => item.label);
    onApply?.(selectedLabels, checkedItems);
    closeModal?.();
  };

  // 검색어로 필드 자동 선택
  useEffect(() => {
    if (!searchKeyword) return;
    const matched = fields.find((f) => f.name.toLowerCase().includes(searchKeyword.toLowerCase()));
    if (matched) setSelectedField(matched.name);
  }, [searchKeyword, fields]);

  return (
    <div className="popup-field" role="dialog" aria-modal="true" aria-labelledby="popup-title">
      <Header id="popup-title" onSearch={setSearchKeyword} onToggle={handleToggle} checkedItems={checkedItems} />
      <Body selectedField={selectedField} setSelectedField={setSelectedField} checkedItems={checkedItems} handleToggle={handleToggle} />
      <SelectedItems selectedItems={selectedItems} handleToggle={handleToggle} />
      <Footer onReset={handleReset} onClose={handleClose} onApply={handleApply} />
    </div>
  );
}
