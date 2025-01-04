import { CheckboxItem, CheckboxProvider } from "@/shared/components";

import { SignUpView } from "./signUp.view";

const initialCheckboxItems: CheckboxItem[] = [
  { id: "all", label: "전체 선택", checked: false },
  { id: "1", label: "항목 1", checked: false },
  { id: "2", label: "항목 2", checked: false },
  { id: "3", label: "항목 3", checked: false },
];

export const SignUpController = () => {
  return (
    <CheckboxProvider initialItems={initialCheckboxItems}>
      <SignUpView checkboxItems={initialCheckboxItems} />
    </CheckboxProvider>
  );
};
