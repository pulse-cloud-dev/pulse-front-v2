import { CheckboxGroup, useCheckboxGroup } from "@/shared/components";
import { SignUpStepProps } from "./signupsteptype";
import { FormField } from "@/shared/components";

// Step 3
export const SignUpFormStep = ({ onPrev, onNext }: SignUpStepProps) => {
  const { items: checkboxItems } = useCheckboxGroup();
  const onSubmit = () => console.log("submitted");
  const { name, phonenumber, email } = { name: "김펄스", phonenumber: "010-1234-1234", email: "id@pulse.com" };

  return (
    <form className="form__auth" onSubmit={onSubmit}>
      <FormField type={"text"} label={"이름"} name={"이름"} value={name} required={true} style={{ backgroundColor: "var(--palette-gray-100)" }} />
      <FormField type={"text"} label={"휴대폰번호"} name={phonenumber} value={phonenumber} required={true} style={{ backgroundColor: "var(--palette-gray-100)" }} />
      <FormField type={"text"} label={"이름"} name={"이메일"} value={email} required={true} labelClass={"labelClass"} style={{ backgroundColor: "var(--palette-gray-100)" }} />
      <FormField type={"text"} label={"닉네임"} name={"이름"} value={""} placeholder="사용할 닉네임을 작성해 주세요." required={true} labelClass={"labelClass"} />
      <FormField type={"password"} label={"비밀번호"} name={"비밀번호"} value={""} required={true} placeholder="숫자, 영문, 특수문자 포함 8자 이상 작성해 주세요" />
      <FormField type={"password"} label={"비밀번호확인"} name={"비밀번호확인"} value={""} required={true} labelClass={"labelClass"} placeholder="입력한 비밀번호를 입력해주세요." />
      <div className="signUp__step3">
        {checkboxItems.map((item) => (
          <div>
            <CheckboxGroup type="item" id={item.id} />
            <span>
              <p>{item.label}</p>
              <span>{item.desc}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="flex_r align_center justify_center gap_8 m-t-40 w200" style={{ margin: "auto" }}>
        <button type="button" className="auth__button cancel" onClick={onPrev}>
          취소
        </button>

        <button type="submit" className="auth__button" onClick={onNext}>
          다음
        </button>
      </div>
    </form>
  );
};
