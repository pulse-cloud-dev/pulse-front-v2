import { CheckField, useCheckFieldGroup } from "@/shared/modules/select-ui";
import type { HTMLAttributes, PropsWithChildren } from "react";
import { useState, useEffect } from "react";
import { useLectureTypes } from "../Mentor/hooks/useLectureTypes";
import { useKey } from "@/shared/modules/modals/shared/hooks/useKey";

import { Footer } from "./popupFooter";

interface HeaderProps extends HTMLAttributes<HTMLElement>, PropsWithChildren {}
const Header = (props: HeaderProps) => {
  const { className, children, ...restProps } = props;
  return (
    <header className={`popup-online__header ${className}`} {...restProps}>
      {children}
    </header>
  );
};

import { LectureType } from "@/features";
interface BodyProps extends HTMLAttributes<HTMLDivElement>, PropsWithChildren {
  selected: LectureType[];
  onOptionSelect: (option: LectureType) => void;
}
const labelMap: Record<string, LectureType> = {
  ONLINE: "온라인",
  OFFLINE: "오프라인",
};
const Body = ({ selected, onOptionSelect }: BodyProps) => {
  const { data: lectureTypes = [] } = useLectureTypes();

  return (
    <div className="popup-online__body" aria-labelledby="lecture-type-group">
      {lectureTypes.map((type) => (
        <CheckField key={type} className="check-field-module" variant="circle">
          <CheckField.Input checkId={type} name={type} isChecked={selected.includes(labelMap[type])} onChange={() => onOptionSelect(labelMap[type])} aria-checked={selected.includes(labelMap[type])} role="radio" />
          <CheckField.Label checkId={type}>{labelMap[type] || type}</CheckField.Label>
        </CheckField>
      ))}
    </div>
  );
};

export function OnlineStatusPopup({ onOnlineSelected, closeModal, initialValue }: { onOnlineSelected: (isOnline: LectureType[]) => void; closeModal?: () => void; initialValue: LectureType[] }) {
  const { reset } = useCheckFieldGroup({
    initialValues: {
      option1: false,
      option2: false,
    },
  });

  const [selected, setSelected] = useState<LectureType[]>(initialValue);

  useEffect(() => {
    setSelected(initialValue ?? null);
  }, [initialValue]);

  const handleReset = () => {
    reset(); // 내부 hook 값 초기화
    setSelected(["온라인", "오프라인"]); // local state도 초기화
  };

  const handleSelect = (option: LectureType) => {
    setSelected((prev) => {
      if (prev.includes(option)) {
        // 배열에 있으면 제거
        return prev.filter((item) => item !== option);
      } else {
        // 없으면 추가
        return [...prev, option];
      }
    });
  };

  const handleApply = () => {
    onOnlineSelected(selected);
    closeModal?.();
  };

  const handleClose = () => {
    closeModal?.();
  };

  useKey("Escape", handleClose);

  return (
    <div className="popup-online" role="dialog" aria-modal="true" aria-labelledby="popup-title">
      <Header />
      <Body selected={selected} onOptionSelect={handleSelect} />
      <Footer onReset={handleReset} onClose={handleClose} onApply={handleApply} />
    </div>
  );
}
