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
                        남폿불 밑에서 바느질감을 안고 있던 어머니가, 증손이라곤 계집애 그 애 하나뿐이었지요. 그렇지. 그 말에는 대꾸도 없이, 아버지는 안고 있는 닭의 무게를 겨냥해 보면서, 이만하면 될까. 어머니가 망태기를 내주며, 벌써 며칠째 걀걀 하고
                        알 날 자리를 보던데요. 그러나 다음 순간, 굵은 호두야 많이 떨어져라, 많이 떨어져라, 저도 모를 힘에 이끌려 마구 작대기를 내리치는 것이었다. 남폿불 밑에서 바느질감을 안고 있던 어머니가, 증손이라곤 계집애 그 애 하나뿐이었지요.
                        그렇지. 소녀는 소년이 개울둑에 앉아 있는 걸 아는지 모르는지 그냥 날쌔게 물만 움켜 낸다. 개울가에 다다르기 전에, 가을 하늘은 언제 그랬는가 싶게 구름 한 점 없이 쪽빛으로 개어 있었다. 오늘 같은 날은 일찍 집으로 돌아가 집안 일을
                        도와야 한다는 생각을 잊어버리기라도 하려는 듯이. 그 많던 전답을 다 팔아 버리고, 대대로 살아오던 집마저 남의 손에 넘기더니, 또 악상까지 당하는 걸 보면. 소녀의 흰 얼굴이, 분홍 스웨터가, 남색 스커트가, 안고 있는 꽃과 함께 범벅이
                        된다. 송진을 생채기에다 문질러 바르고는 그 달음으로 칡덩굴 있는 데로 내려가, 꽃 많이 달린 몇 줄기를 이빨로 끊어 가지고 올라온다. 그러한 어떤 날, 소년은 전에 소녀가 앉아 물장난을 하던 징검다리 한가운데에 앉아 보았다. 그런데,
                        나룻이 긴 농부는 소녀 편을 한 번 훑어보고는 그저 송아지 고삐를 풀어내면서, 어서들 집으로 가거라. 소녀는 비에 젖은 눈을 들어 한 번 쳐다보았을 뿐, 소년이 하는 대로 잠자코 있었다. 그러한 어떤 날, 소년은 전에 소녀가 앉아 물장난을
                        하던 징검다리 한가운데에 앉아 보았다. 소녀의 흰 얼굴이, 분홍 스웨터가, 남색 스커트가, 안고 있는 꽃과 함께 범벅이 된다. 개울가에 다다르기 전에, 가을 하늘은 언제 그랬는가 싶게 구름 한 점 없이 쪽빛으로 개어 있었다.
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
          <Typography variant="compact" size="14" weight="semi-bold" color="primary" colorscale="90">
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
          <Typography variant="compact" size="14" weight="semi-bold" color="primary" colorscale="90">
            다음
          </Typography>
        </BaseButton>
      </div>
    </div>
  );
};

const Bar = () => <div className="w-100 border-b m-t-10" />;
