import { CheckField, useCheckFieldGroup } from "@/shared/modules/select-ui";
import { BaseButton, Typography } from "@/shared/components/atoms";

const Header = () => {
  return <header className="popup--field__header"></header>;
};
const Body = () => {
  const { checkedItems, toggle } = useCheckFieldGroup({
    initialValues: {
      option1: true,
      option2: false,
      option3: true,
      option4: false,
    },
  });

  return (
    <div className="popup--field__body">
      <div className="popup--field__body--top">
        <CheckField className="check-field-module" variant="circle">
          <CheckField.Input checkId="option1" name="option1" isChecked={checkedItems.option1} onChange={() => toggle("option1")} />
          <CheckField.Label checkId="option1">분야 텍스트</CheckField.Label>
        </CheckField>
        <CheckField className="check-field-module" variant="circle">
          <CheckField.Input checkId="option1" name="option1" isChecked={checkedItems.option1} onChange={() => toggle("option1")} />
          <CheckField.Label checkId="option1">분야 텍스트</CheckField.Label>
        </CheckField>
        <CheckField className="check-field-module" variant="circle">
          <CheckField.Input checkId="option1" name="option1" isChecked={checkedItems.option1} onChange={() => toggle("option1")} />
          <CheckField.Label checkId="option1">분야 텍스트</CheckField.Label>
        </CheckField>
        <CheckField className="check-field-module" variant="circle">
          <CheckField.Input checkId="option1" name="option1" isChecked={checkedItems.option1} onChange={() => toggle("option1")} />
          <CheckField.Label checkId="option1">분야 텍스트</CheckField.Label>
        </CheckField>
        <CheckField className="check-field-module" variant="circle">
          <CheckField.Input checkId="option1" name="option1" isChecked={checkedItems.option1} onChange={() => toggle("option1")} />
          <CheckField.Label checkId="option1">분야 텍스트</CheckField.Label>
        </CheckField>
        <CheckField className="check-field-module" variant="circle">
          <CheckField.Input checkId="option1" name="option1" isChecked={checkedItems.option1} onChange={() => toggle("option1")} />
          <CheckField.Label checkId="option1">분야 텍스트</CheckField.Label>
        </CheckField>
        <CheckField className="check-field-module" variant="circle">
          <CheckField.Input checkId="option1" name="option1" isChecked={checkedItems.option1} onChange={() => toggle("option1")} />
          <CheckField.Label checkId="option1">분야 텍스트</CheckField.Label>
        </CheckField>
        <CheckField className="check-field-module" variant="circle">
          <CheckField.Input checkId="option1" name="option1" isChecked={checkedItems.option1} onChange={() => toggle("option1")} />
          <CheckField.Label checkId="option1">분야 텍스트</CheckField.Label>
        </CheckField>
        <CheckField className="check-field-module" variant="circle">
          <CheckField.Input checkId="option1" name="option1" isChecked={checkedItems.option1} onChange={() => toggle("option1")} />
          <CheckField.Label checkId="option1">분야 텍스트</CheckField.Label>
        </CheckField>
        <CheckField className="check-field-module" variant="circle">
          <CheckField.Input checkId="option1" name="option1" isChecked={checkedItems.option1} onChange={() => toggle("option1")} />
          <CheckField.Label checkId="option1">분야 텍스트</CheckField.Label>
        </CheckField>
        <CheckField className="check-field-module" variant="circle">
          <CheckField.Input checkId="option1" name="option1" isChecked={checkedItems.option1} onChange={() => toggle("option1")} />
          <CheckField.Label checkId="option1">분야 텍스트</CheckField.Label>
        </CheckField>
        <CheckField className="check-field-module" variant="circle">
          <CheckField.Input checkId="option1" name="option1" isChecked={checkedItems.option1} onChange={() => toggle("option1")} />
          <CheckField.Label checkId="option1">분야 텍스트</CheckField.Label>
        </CheckField>
        <CheckField className="check-field-module" variant="circle">
          <CheckField.Input checkId="option1" name="option1" isChecked={checkedItems.option1} onChange={() => toggle("option1")} />
          <CheckField.Label checkId="option1">분야 텍스트</CheckField.Label>
        </CheckField>
        <CheckField className="check-field-module" variant="circle">
          <CheckField.Input checkId="option1" name="option1" isChecked={checkedItems.option1} onChange={() => toggle("option1")} />
          <CheckField.Label checkId="option1">분야 텍스트</CheckField.Label>
        </CheckField>
        <CheckField className="check-field-module" variant="circle">
          <CheckField.Input checkId="option1" name="option1" isChecked={checkedItems.option1} onChange={() => toggle("option1")} />
          <CheckField.Label checkId="option1">분야 텍스트</CheckField.Label>
        </CheckField>
        <CheckField className="check-field-module" variant="circle">
          <CheckField.Input checkId="option1" name="option1" isChecked={checkedItems.option1} onChange={() => toggle("option1")} />
          <CheckField.Label checkId="option1">분야 텍스트</CheckField.Label>
        </CheckField>
        <CheckField className="check-field-module" variant="circle">
          <CheckField.Input checkId="option1" name="option1" isChecked={checkedItems.option1} onChange={() => toggle("option1")} />
          <CheckField.Label checkId="option1">분야 텍스트</CheckField.Label>
        </CheckField>
      </div>

      <div className="popup--field__body--bottom">
        <Typography className="no-data" variant="body" size="14">
          분야를 선택해주세요
        </Typography>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="popup--field__footer">
      <div className="popup--field__footer--left">선택 초기화</div>
      <div className="popup--field__footer--right">
        <BaseButton color="reverse">닫기</BaseButton>
        <BaseButton color="primary">신청</BaseButton>
      </div>
    </footer>
  );
};

export const FieldPopup = () => {
  return (
    <div className="popup--field">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};
