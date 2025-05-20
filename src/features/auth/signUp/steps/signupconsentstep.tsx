import { usePageNavigation } from "@/shared/lib/hooks";
import { Accordion, CheckboxGroup, Icon, useCheckboxGroup } from "@/shared/components";
import { SignUpStepProps } from "./signupsteptype";

// Step 1
export const SignUpConsentStep = ({ onNext }: SignUpStepProps) => {
  const { items: checkboxItems } = useCheckboxGroup();
  const { goBack } = usePageNavigation();

  const isActiveNext = checkboxItems[0].checked;
  return (
    <div className="p-30">
      <div className="border-b m-t-10">
        <div className="flex_r align_center gap_8 p-8">
          <CheckboxGroup type="all" id={checkboxItems[0].id} />
          <span>모두 동의합니다</span>
        </div>
      </div>

      <div className="flex1 flex_c">
        {checkboxItems.slice(1).map((item) => (
          <Accordion key={item.id}>
            <Accordion.Item>
              {({ toggle, isActive }) => (
                <>
                  <div className={`accordion__toggle m-t-8`}>
                    <div className="flex_r align_center p-8 gap_8">
                      <CheckboxGroup type="item" id={item.id} />
                      <span>{item.label}</span>
                    </div>
                    <button type="button" className="accordion__toggle-arrow more" onClick={toggle}>
                      <Icon className={`icon__arrow img_to_bk80 ${isActive ? "on" : ""}`} src="chevron_down_bk_16" alt="화살표" />
                    </button>
                  </div>
                  {isActive && (
                    <div className="accordion__item-content">
                      <span className="fs_12 color__grayscale-50">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                        type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem
                        Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
                        typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
                        including versions of Lorem Ipsum.
                      </span>
                    </div>
                  )}
                </>
              )}
            </Accordion.Item>
          </Accordion>
        ))}
      </div>

      <div className="w-60 m-t-40 flex_r align_center justify_center gap_8" style={{ margin: "auto" }}>
        <button className="fs_16 btn__line gray btn_xl flex1" onClick={goBack}>
          취소
        </button>
        <button
          className={`fs_16 btn__primary btn_xl flex1 ${isActiveNext ? "" : "disabled"}`}
          onClick={() => {
            const uncheckedItem = checkboxItems.filter((item) => item.id !== "all").find((item) => !item.checked);
            if (uncheckedItem === undefined) {
              onNext?.();
            } else if (uncheckedItem?.id === "1") {
              alert("이용약관 동의는 필수로 동의해야 회원가입이 가능합니다.");
            } else if (uncheckedItem?.id === "2") {
              alert("개인정보 수집 이용에 대한 동의는 필수로 동의해야 회원가입이 가능합니다.");
            }
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
};
