import { CheckField, useCheckFieldGroup } from "@/shared/modules/select-ui";
import type { HTMLAttributes, PropsWithChildren } from "react";
import { useState, useEffect } from "react";
import { categoryApis } from "@/networks";

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

interface BodyProps extends HTMLAttributes<HTMLDivElement>, PropsWithChildren {
  selected: string | null;
  onOptionSelect: (option: string ) => void;
  lectureTypes: string[];
}

const Body = ({
  selected,
  onOptionSelect,
  lectureTypes = [],
}: BodyProps) => {
  const labelMap : Record<string, string> ={
    ONLINE: "온라인",
    OFFLINE: "오프라인",
  }
 
  return (
    <div className="popup-online__body" aria-labelledby="lecture-type-group">
      {lectureTypes.map((type) => (
      <CheckField key = {type} className="check-field-module" variant="circle">
        <CheckField.Input
          checkId= {type}
          name={type}
          isChecked={selected === type}
          onChange={() => onOptionSelect(type)}
          aria-checked={selected === type}
          role="radio"
        />
        <CheckField.Label checkId={type}>
          {labelMap[type] || type}
        </CheckField.Label>
      </CheckField>
      ))}
    </div>
  );
};






export function OnlineStatusPopup({ 
  onOnlineSelected,
  closeModal,
}: {
  onOnlineSelected?: (isOnline: boolean) => void;
  closeModal?: () => void; }) {
  const { checkedItems, toggle, reset } = useCheckFieldGroup({
    initialValues: {
      option1: false,
      option2: false,
    },
  });

const [lectureTypes, setLectureTypes] = useState<string[]>([]);
const [selected, setSelected] = useState<string | null>(null);


useEffect(() => {
  categoryApis.lectureTypes().then(setLectureTypes);
}, []);

const handleReset = () => {
  reset();              // 내부 hook 값 초기화
  setSelected(null);    // local state도 초기화
};

const handleSelect = (option: string) => {
  const next = selected === option ? null : option;
  setSelected(next);
};

  const handleApply = () => {
    onOnlineSelected?.(selected === "ONLINE");
    closeModal?.();
  };

  const handleClose = () => {
    closeModal?.();
    console.log("모달 닫기");
  };

  return (
    <div 
      className="popup-online"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <Header />
      <Body selected={selected} onOptionSelect={handleSelect} lectureTypes={lectureTypes} />
      <Footer onReset={handleReset} onClose={handleClose} onApply={handleApply} />
    </div>
  );
}

