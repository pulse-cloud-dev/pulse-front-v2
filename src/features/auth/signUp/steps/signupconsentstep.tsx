import { usePageNavigation } from "@/shared/lib/hooks";
import { Accordion, CheckboxGroup, Icon, useCheckboxGroup } from "@/shared/components";
import { SignUpStepProps } from "./signupsteptype";
import { Typography } from "@/shared/components";
import { BaseButton } from "@/shared/components";
// Step 1
export const SignUpConsentStep = ({ onNext }: SignUpStepProps) => {
  const { items: checkboxItems } = useCheckboxGroup();
  const { goBack } = usePageNavigation();
  const isActiveNext = checkboxItems[0].checked;

  return (
    <div className="w-100" style={{ paddingLeft: "18px", paddingRight: "18px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "start", marginTop: "30px" }}>
        <CheckboxGroup type="all" id={checkboxItems[0].id} />
        <Typography variant="compact" size="14" weight="semi-bold" color="grayscale" colorscale="90">
          모두 동의합니다
        </Typography>
      </div>
      <Bar />
      <div className="flex1 flex_c m-t-10 gap_8">
        {checkboxItems.slice(1).map((item) => (
          <Accordion key={item.id}>
            <Accordion.Item>
              {({ toggle, isActive }) => (
                <>
                  <div className={`accordion__toggle m-t-8`} style={{ justifyContent: "space-between", display: "flex" }}>
                    <div className="flex_r align_center  gap_1" style={{ justifyContent: "start", alignItems: "center" }}>
                      <CheckboxGroup type="item" id={item.id} />
                      <Typography variant="compact" size="14" weight="regular" color="grayscale" colorscale="90" onClick={toggle}>
                        {item.label}
                      </Typography>
                    </div>
                    <button type="button" className="accordion__toggle-arrow more" onClick={toggle}>
                      <Icon style={{ width: "16px", height: "16px", padding: "0px" }} className={`icon__arrow img_to_bk80 ${isActive ? "" : "on"}`} src="chevron_down_bk_16" alt="화살표" />
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

      <div style={{ marginLeft: "auto", marginRight: "auto", display: "flex", gap: "8px", alignItems: "center", justifyContent: "center", width: "200px", marginTop: "50px" }}>
        <BaseButton size="md" color="gray" onClick={goBack} style={{ flex: 1 }}>
          <Typography variant="compact" size="14" weight="semi-bold" color="grayscale" colorscale="90">
            취소
          </Typography>
        </BaseButton>

        <BaseButton
          size="md"
          color="primary"
          style={{ flex: 1 }}
          className={` ${isActiveNext ? "" : "disabled"}`}
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
          <Typography variant="compact" size="14" weight="semi-bold" color="grayscale" colorscale="90">
            다음
          </Typography>
        </BaseButton>
      </div>
    </div>
  );
};

const Bar = () => <div className="w-100 border-b m-t-10" />;
