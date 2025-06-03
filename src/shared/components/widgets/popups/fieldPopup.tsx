import { CheckField, useCheckFieldGroup } from "@/shared/modules/select-ui";
import { BaseButton, Typography } from "@/shared/components/atoms";
import type { HTMLAttributes, PropsWithChildren } from "react";


const Header = () => {
  return <header className="popup--field__header"></header>;
};

const Body = ({
  options,
  checkedItems,
  toggle,
}: {
  options: { key: string; label: string }[];
  checkedItems: Record<string, boolean>;
  toggle: (key: string) => void;
}) => {
  const selectedCount = Object.values(checkedItems).filter(Boolean).length;

  const handleToggle = (key: string) => {
    if (checkedItems[key]) {
      toggle(key);
    } else if (selectedCount < 3) {
      toggle(key);
    } else {
      alert("최대 3개까지 선택 가능합니다.");
    }
  };

  const selectedItems = options.filter(({ key }) => checkedItems[key]);

  return (
    <div className="popup--field__body">
      <div className="popup--field__body--top">
        {options.map(({ key, label }) => (
          <CheckField key={key} className="check-field-module" variant="circle">
            <CheckField.Input
              checkId={key}
              name={key}
              isChecked={checkedItems[key] ?? false}
              onChange={() => handleToggle(key)}
              hidden={false}
            />
            <CheckField.Label checkId={key}>{label}</CheckField.Label>
          </CheckField>
        ))}
      </div>

      <div className="popup--field__body--bottom">
        {selectedItems.length > 0 ? (
          <div className="data">
            {selectedItems.map(({ key, label }) => (
              //style: 글자수가 12를 넘어가면 자동 축소
              <span key={key} style={{ fontSize: label.length > 12 ? "10px" : "13px"}}> 
                {label}
                <button onClick={() => toggle(key)} className="ml-1 text-sm ">
                  <svg
                    width={12}
                    height={11}
                    viewBox="0 0 12 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M10.9227 1.42465C11.157 1.19034 11.157 0.810441 10.9227 0.576127C10.6884 0.341812 10.3085 0.341812 10.0742 0.576127L5.99844 4.65186L1.9227 0.576127C1.68839 0.341812 1.30849 0.341812 1.07417 0.576127C0.839859 0.810441 0.839859 1.19034 1.07417 1.42465L5.14991 5.50039L1.07417 9.57613C0.839859 9.81044 0.839859 10.1903 1.07417 10.4247C1.30849 10.659 1.68839 10.659 1.9227 10.4247L5.99844 6.34892L10.0742 10.4247C10.3085 10.659 10.6884 10.659 10.9227 10.4247C11.157 10.1903 11.157 9.81044 10.9227 9.57613L6.84697 5.50039L10.9227 1.42465Z"
                      fill="#9E9E9E"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        ) : (
          <Typography className="no-data" variant="body" size="14" color="grayscale">
            분야를 선택해주세요
          </Typography>
        )}
      </div>
    </div>
  );
};

// ✅ 풋터: reset 함수 props로 받아서 초기화 동작
import { ResetSelection } from "../../atoms/reset/resetSelection";
interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  onReset: () => void;
}

const Footer = ({ className = "field", onReset, ...restProps }: FooterProps) => {
  
  return (
    <footer className="popup--field__footer">
      <ResetSelection className={className}/>
      <div className="popup--field__footer--right">
        <BaseButton color="reverse">닫기</BaseButton>
        <BaseButton color="teal">적용</BaseButton>
      </div>
    </footer>
  );
};

// ✅ FieldPopup: 상태를 관리하고 자식에게 props로 전달
export const FieldPopup = () => {
  const options = Array.from({ length: 18 }, (_, i) => ({
    key: `option${i + 1}`,
    label: `분야 텍스트 ${i + 1}`,
  }));

  const initialValues = options.reduce((acc, { key }) => {
    acc[key] = false;
    return acc;
  }, {} as Record<string, boolean>);

  const { checkedItems, toggle, reset } = useCheckFieldGroup({ initialValues });

  return (
    <div className="popup--field">
      <Header />
      <Body options={options} checkedItems={checkedItems} toggle={toggle} />
      <Footer onReset={reset} />
    </div>
  );
};