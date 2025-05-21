import { CheckboxGroup, useCheckboxGroup } from "@/shared/components";
import { SignUpStepProps } from "./signupsteptype";
import { FormField } from "@/shared/components";
import { useState, FormEvent, ChangeEvent } from "react";

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
    errormessage: "닉네임을 입력해주세요.",
    schema: (value) => value.length >= 2,
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

  const { name, phonenumber, email } = { name: "김펄스", phonenumber: "010-1234-1234", email: "id@pulse.com" };
  const onsubmit = (e: FormEvent) => {
    alert("submitted");
  };
  return (
    <form className="form__auth" onSubmit={onsubmit}>
      <FormField type={"text"} label={"이름"} name={"이름"} value={name} required={true} style={{ backgroundColor: "var(--palette-gray-100)" }} />
      <FormField type={"text"} label={"휴대폰번호"} name={phonenumber} value={phonenumber} required={true} style={{ backgroundColor: "var(--palette-gray-100)" }} />
      <FormField type={"text"} label={"이름"} name={"이메일"} value={email} required={true} style={{ backgroundColor: "var(--palette-gray-100)" }} />
      <FormField
        type={"text"}
        label={"닉네임"}
        name={"이름"}
        value={formState.nickname.value}
        placeholder="사용할 닉네임을 작성해 주세요."
        required={true}
        onChange={handleInputChange("nickname")}
        onBlur={handleBlur("nickname")}
        onFocus={handleFocus("nickname")}
        errorMessage={formState.nickname.error}
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
