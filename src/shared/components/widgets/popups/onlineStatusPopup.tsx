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
    <div className="popup-online__body">
      {lectureTypes.map((type) => (
      <CheckField key = {type} className="check-field-module" variant="circle">
        <CheckField.Input
          checkId= {type}
          name={type}
          isChecked={selected === type}
          onChange={() => onOptionSelect(type)}
        />
        <CheckField.Label checkId={type}>
          {labelMap[type] || type}
        </CheckField.Label>
      </CheckField>
      ))}
    </div>
  );
};






export function OnlineStatusPopup({ onOnlineSelected,
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

useEffect(() => {
  categoryApis.lectureTypes().then(setLectureTypes);
}, []);

const handleReset = () => {
  reset();              // 내부 hook 값 초기화
  setSelected(null);    // local state도 초기화
};
  const [selected, setSelected] = useState<string | null>(null);

const handleSelect = (option: string) => {
  const next = selected === option ? null : option;
  setSelected(next);
  onOnlineSelected?.(next === "ONLINE");
};

  const handleApply = () => {
    closeModal?.();
    console.log("적용된 상태:", selected);
  };

  const handleClose = () => {
    closeModal?.();
    console.log("모달 닫기");
  };

  return (
    <div className="popup-online">
      <Header />
      <Body selected={selected} onOptionSelect={handleSelect} lectureTypes={lectureTypes} />
      <Footer onReset={handleReset} onClose={handleClose} onApply={handleApply} />
    </div>
  );
}

