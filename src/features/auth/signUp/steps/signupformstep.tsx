import { CheckboxGroup, useCheckboxGroup } from "@/shared/components";
import { SignUpStepProps } from "./signupsteptype";
import { FormField } from "@/shared/components";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useNicknameCheck, useSignUp } from "../signUp.service";
// import { useQueryClient } from "@tanstack/react-query";
// import { SimplifiedUserlResponseDTO } from "@/contracts";

type SchemaFunction = (value: string, form?: FormState) => boolean;

type InputFieldState = {
  value: string;
  error: string;
  schema?: SchemaFunction;
  errormessage: string;
  dependencies?: (keyof FormState)[];
  isValid: boolean;
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
    let isValid = true;

    if (schema && typeof schema === "function") {
      isValid = schema(value, formState);
      if (!isValid) {
        errorlog = errormessage;
      }
    }

    const updatedFormState = {
      ...formState,
      [field]: {
        ...formState[field],
        error: errorlog,
        isValid,
      },
    };

    Object.entries(updatedFormState).forEach(([key, inputField]) => {
      if (inputField.dependencies?.includes(field)) {
        const depValid = inputField.schema?.(inputField.value, updatedFormState) ?? true;
        updatedFormState[key] = {
          ...inputField,
          error: depValid ? "" : inputField.errormessage,
          isValid: depValid,
        };
      }
    });

    setFormState(updatedFormState);
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
  nick_name: {
    isValid: false,
    value: "",
    error: "",
    errormessage: "닉네임은 2~10자 이내의 영문 또는 한글로 설정할 수 있으며, 특수문자는 사용할 수 없습니다",
    schema: (value) => /^[가-힣a-zA-Z]{2,10}$/.test(value),
  },
  password: {
    isValid: false,
    value: "",
    error: "",
    schema: (value) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value),
    errormessage: "비밀번호 형식이 올바르지 않습니다.",
  },
  confirmPassword: {
    isValid: false,
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
  const { checknickname } = useNicknameCheck();

  //debounce를 사용하여 닉네임 중복체크 api 호출
  useEffect(() => {
    //닉네임이 변경될 때마다 검증 로직 실행
    if (formState.nick_name.schema && formState.nick_name.schema(formState.nick_name.value)) {
      const timer = setTimeout(() => {
        //닉네임이 schema 통과하고 일정시간이 지난다면 닉네임 중복 api 호출
        checknickname.mutate(formState.nick_name.value);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [formState.nick_name.value]);
  // const queryClient = useQueryClient();
  // const { name, phone_number, email } = queryClient.getQueryData(["auth", "signup", "userinfo"]) as SimplifiedUserlResponseDTO;

  const { name, phone_number, email } = { name: "김펄스", phone_number: "010-1234-1234", email: "id@pulse.com" };
  const { requestSignUp } = useSignUp();

  const onsubmit = (e: FormEvent) => {
    e.preventDefault();
    requestSignUp.mutate(
      {
        name,
        phone_number,
        email,
        nick_name: formState.nick_name.value,
        password: formState.password.value,
      },
      { onSuccess: onNext }
    );
  };

  return (
    <form className="form__auth" onSubmit={onsubmit}>
      <FormField type={"text"} label={"이름"} name={name} value={name} required={true} style={{ backgroundColor: "var(--palette-gray-100)" }} />
      <FormField type={"text"} label={"휴대폰번호"} name={phone_number} value={phone_number} required={true} style={{ backgroundColor: "var(--palette-gray-100)" }} />
      <FormField type={"text"} label={"이메일"} name={email} value={email} required={true} style={{ backgroundColor: "var(--palette-gray-100)" }} />
      <FormField
        type={"text"}
        label={"닉네임"}
        name={"이름"}
        value={formState.nick_name.value}
        placeholder="사용할 닉네임을 작성해 주세요."
        required={true}
        onChange={
          //닉네임에 대한 state변경 + 변화후 debounce를 통한 api 호출
          handleInputChange("nick_name")
        }
        onBlur={handleBlur("nick_name")}
        onFocus={() => {
          /*Nickname에 대한 클라이언트 데이터 초기화 */
          handleFocus("nick_name")();
          //닉네임 중복체크 서버 데이터 초기화
          checknickname.reset();
        }}
        errorMessage={
          //닉네임 에러 메세지 + 서버에서 온 메세지 노출-> 검증
          formState.nick_name.error || (checknickname.isError ? checknickname.error.message : "")
        }
        successMessage={
          //서버에서 온 메세지 노출
          checknickname.data?.message
        }
        isInvalid={
          //검증 성공: 프론트 스키마 검증 성공(formState.nick_name.isValid===false )이고 서버 중복 검증성공(checknickname.success===true)):isvalid:true
          !(formState.nick_name.isValid && checknickname.isSuccess)
        }
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

        <button type="submit" className="auth__button" disabled={!isFormValid}>
          다음
        </button>
      </div>
    </form>
  );
};
