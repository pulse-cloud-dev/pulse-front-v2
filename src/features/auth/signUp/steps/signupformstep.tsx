import { CheckboxGroup, useCheckboxGroup } from "@/shared/components";
import { SignUpStepProps } from "./signupsteptype";
import { FormField } from "@/shared/components";
import { useState, FormEvent, ChangeEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { SimplifiedUserlResponseDTO } from "@/contracts";
type SchemaFunction = (value: string, form?: FormState) => boolean;

type InputFieldState = {
  value: string;
  error: string;
  schema?: SchemaFunction;
  errormessage: string;
  dependencies?: (keyof FormState)[];
};

type FormState = {
  [key: string]: InputFieldState;
};

const useFormFields = (initialState: FormState) => {
  const [formState, setFormState] = useState<FormState>(initialState);

  const handleInputChange = (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormState((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
      },
    }));
  };

  const handleBlur = (field: keyof FormState) => () => {
    const { value, schema, errormessage } = formState[field];
    let errorlog = "";

    if (schema && typeof schema === "function") {
      const isValid = schema(value, formState);
      if (!isValid) {
        errorlog = errormessage;
      }
    }
    Object.entries(formState).forEach(([key, inputField]) => {
      if (inputField.dependencies?.includes(field)) {
        const isValid = inputField.schema?.(inputField.value, formState);
        formState[key] = {
          ...inputField,
          error: isValid ? "" : inputField.errormessage,
        };
      }
    });
    setFormState((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        error: errorlog,
      },
    }));
  };

  const handleFocus = (field: keyof FormState) => () => {
    setFormState((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        error: "",
      },
    }));
  };
  const isFormValid = Object.values(formState).every((field) => (field.schema ? field.schema(field.value, formState) : true));

  return {
    formState,
    setFormState,
    handleInputChange,
    handleBlur,
    handleFocus,
    isFormValid,
  };
};
const initialFields: FormState = {
  nickname: {
    value: "",
    error: "",
    errormessage: "닉네임은 2~10자 이내의 영문 또는 한글로 설정할 수 있으며, 특수문자는 사용할 수 없습니다",
    schema: (value) => /^[가-힣a-zA-Z]{2,10}$/.test(value),
  },
  password: {
    value: "",
    error: "",
    schema: (value) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value),
    errormessage: "비밀번호 형식이 올바르지 않습니다.",
  },
  confirmPassword: {
    value: "",
    error: "",
    schema: (value, form) => value === form?.password.value,
    errormessage: "비밀번호가 일치하지 않습니다.",
    dependencies: ["password"],
  },
};

// Step 3
export const SignUpFormStep = ({ onPrev, onNext }: SignUpStepProps) => {
  const { items: checkboxItems } = useCheckboxGroup();

  const { formState, handleInputChange, handleBlur, handleFocus, isFormValid } = useFormFields(initialFields);
  //usedebounceutil입력값:시간,onchange,두번쨰 인자값이 시간지난후에 발동되는 함수 출력값:state:성공,실패,->이건 Utill함수로 해도 좋을듯
  //usemitation함수의 mutate를 usedebouncutil입력값으로 넣음
  //여기서 나온 에러(실패시:mutationerror,성공시:mutation success.data.message)와 formState.nickname.error를 통해서 나온 에러를 통헤 나온값을 formfield에 전달 인데 좀 다듬어줘
  //아래 두줄은 무시해도 됨

  // const queryClient = useQueryClient();
  // const { name, phone_number, email } = queryClient.getQueryData(["auth", "signup", "userinfo"]) as SimplifiedUserlResponseDTO;

  const { name, phone_number, email } = { name: "김펄스", phone_number: "010-1234-1234", email: "id@pulse.com" };
  const onsubmit = (e: FormEvent) => {
    alert("submitted");
  };

  /*
   onblur:스키마 검사
   onfocus:에러 초기화
  */
  return (
    <form className="form__auth" onSubmit={onsubmit}>
      <FormField type={"text"} label={"이름"} name={name} value={name} required={true} style={{ backgroundColor: "var(--palette-gray-100)" }} />
      <FormField type={"text"} label={"휴대폰번호"} name={phone_number} value={phone_number} required={true} style={{ backgroundColor: "var(--palette-gray-100)" }} />
      <FormField type={"text"} label={"이메일"} name={email} value={email} required={true} style={{ backgroundColor: "var(--palette-gray-100)" }} />
      <FormField
        type={"text"}
        label={"닉네임"}
        name={"이름"}
        value={formState.nickname.value}
        placeholder="사용할 닉네임을 작성해 주세요."
        required={true}
        onChange={handleInputChange("nickname")} //닉네임에 대한 state변경 + 변화후 debounce를 통한 api call
        onBlur={handleBlur("nickname")}
        onFocus={handleFocus("nickname")} /*Nickname에 대한 클라이언트 데이터 서버 데이터 초기화 */
        errorMessage={formState.nickname.error} //성공 메세지도 추가할듯
        isInvalid={true} //status로 바꾸어야 할듯
      />
      <FormField
        type={"password"}
        label={"비밀번호"}
        name={"비밀번호"}
        value={formState.password.value}
        required={true}
        placeholder="숫자, 영문, 특수문자 포함 8자 이상 작성해 주세요"
        onChange={handleInputChange("password")}
        onBlur={handleBlur("password")}
        onFocus={handleFocus("password")}
        errorMessage={formState.password.error}
        isInvalid={true}
      />
      <FormField
        type={"password"}
        label={"비밀번호확인"}
        name={"비밀번호확인"}
        value={formState.confirmPassword.value}
        required={true}
        placeholder="입력한 비밀번호를 입력해주세요."
        onChange={handleInputChange("confirmPassword")}
        onBlur={handleBlur("confirmPassword")}
        onFocus={handleFocus("confirmPassword")}
        errorMessage={formState.confirmPassword.error}
        isInvalid={true}
      />
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

        <button type="submit" className="auth__button" onClick={onNext} disabled={!isFormValid}>
          다음
        </button>
      </div>
    </form>
  );
};
