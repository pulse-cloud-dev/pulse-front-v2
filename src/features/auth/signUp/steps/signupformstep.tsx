import { CheckboxGroup, useCheckboxGroup } from "@/shared/components";
import { SignUpStepProps } from "./signupsteptype";
import { FormField } from "@/shared/components";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useNicknameCheck, useSignUp } from "../signUp.service";
import { useQueryClient } from "@tanstack/react-query";
import { SimplifiedUserlResponseDTO } from "@/contracts";

type ValidationSchema = {
  [key: string]: {
    validate: (value: string, form?: FormState) => boolean;
    message: string;
  };
};

type InputFieldState = {
  value: string;
  errors: string[]; // 여러 에러 메시지를 저장하는 배열
  schema: ValidationSchema; // 스키마와 에러 메시지를 하나로 묶음
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

  const validateField = (field: keyof FormState, updatedFormState?: FormState) => {
    const currentState = updatedFormState || formState;
    const fieldState = currentState[field];
    const { value, schema } = fieldState;

    // 첫 번째 에러만 반환
    for (const [key, rule] of Object.entries(schema)) {
      if (!rule.validate(value, currentState)) {
        return {
          errors: [rule.message],
          isValid: false,
        };
      }
    }

    return { errors: [], isValid: true };
  };

  const handleBlur = (field: keyof FormState) => () => {
    const { errors, isValid } = validateField(field);

    const updatedFormState = {
      ...formState,
      [field]: {
        ...formState[field],
        errors,
        isValid,
      },
    };

    // 의존성이 있는 필드들도 재검증
    Object.entries(updatedFormState).forEach(([key, inputField]) => {
      if (inputField.dependencies?.includes(field)) {
        const { errors: depErrors, isValid: depValid } = validateField(key, updatedFormState);
        updatedFormState[key] = {
          ...inputField,
          errors: depErrors,
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
        errors: [],
      },
    }));
  };

  const isFormValid = Object.values(formState).every((field) => {
    return Object.values(field.schema).every((rule) => rule.validate(field.value, formState));
  });

  return {
    formState,
    setFormState,
    handleInputChange,
    handleBlur,
    handleFocus,
    isFormValid,
    validateField,
  };
};

const initialFields: FormState = {
  nick_name: {
    isValid: false,
    value: "",
    errors: [],
    schema: {
      required: {
        validate: (value) => value.trim().length > 0,
        message: "닉네임을 입력해주세요.",
      },
      length: {
        validate: (value) => value.length >= 2 && value.length <= 10,
        message: "닉네임은 2~10자 이내로 입력해주세요.",
      },
      format: {
        validate: (value) => /^[가-힣a-zA-Z]+$/.test(value),
        message: "닉네임은 영문 또는 한글만 사용할 수 있습니다.",
      },
      noSpecialChars: {
        validate: (value) => !/[^가-힣a-zA-Z]/.test(value),
        message: "특수문자는 사용할 수 없습니다.",
      },
    },
  },
  password: {
    isValid: false,
    value: "",
    errors: [],
    schema: {
      required: {
        validate: (value) => value.trim().length > 0,
        message: "비밀번호를 입력해주세요.",
      },
      minLength: {
        validate: (value) => value.length >= 8,
        message: "비밀번호는 8자 이상이어야 합니다.",
      },
      hasUppercase: {
        validate: (value) => /[A-Z]/.test(value),
        message: "대문자를 포함해야 합니다.",
      },
      hasLowercase: {
        validate: (value) => /[a-z]/.test(value),
        message: "소문자를 포함해야 합니다.",
      },
      hasNumber: {
        validate: (value) => /\d/.test(value),
        message: "숫자를 포함해야 합니다.",
      },
      hasSpecial: {
        validate: (value) => /[@$!%*?&]/.test(value),
        message: "특수문자(@$!%*?&)를 포함해야 합니다.",
      },
      notStartWithSpecial: {
        validate: (value) => !/^[@$!%*?&]/.test(value),
        message: "특수문자로 시작할 수 없습니다.",
      },
    },
  },
  confirmPassword: {
    isValid: false,
    value: "",
    errors: [],
    schema: {
      required: {
        validate: (value) => value.trim().length > 0,
        message: "비밀번호 확인을 입력해주세요.",
      },
      match: {
        validate: (value, form) => value === form?.password.value,
        message: "비밀번호가 일치하지 않습니다.",
      },
    },
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
    const isNickNameValid = Object.values(formState.nick_name.schema).every((rule) => rule.validate(formState.nick_name.value));

    if (isNickNameValid && formState.nick_name.value.trim()) {
      const timer = setTimeout(() => {
        //닉네임이 모든 규칙을 통과하고 일정시간이 지난다면 닉네임 중복 api 호출
        checknickname.mutate(formState.nick_name.value);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [formState.nick_name.value]);

  const queryClient = useQueryClient();
  //const { name, phone_number, email } = queryClient.getQueryData(["auth", "sign-up", "userinfo"]) as SimplifiedUserlResponseDTO;
  const { name, phone_number, email } = { name: "김펄스", phone_number: "010-1234-1224", email: "mrki23@pulse.com" };
  const { requestSignUp } = useSignUp({ onSuccess: onNext, onError: () => "error" });

  const onsubmit = (e: FormEvent) => {
    e.preventDefault();
    requestSignUp.mutate({
      name: name,
      phone_number: phone_number.replace(/-/g, ""), //전화번호 형식 -없이
      email: email,
      nick_name: formState.nick_name.value,
      password: formState.password.value,
    });
  };

  // 에러 메시지들을 하나의 문자열로 결합하는 헬퍼 함수
  const getErrorMessage = (errors: string[], serverError?: string) => {
    const allErrors = [...errors];
    if (serverError) {
      allErrors.push(serverError);
    }
    return allErrors.join("\n"); // 줄바꿈으로 구분하거나 ', '로 구분할 수 있음
  };

  return (
    <form className="form__signUp" onSubmit={onsubmit}>
      <FormField wrapperClass="sign-up-wrapper" labelClass="sign-up-label" inputClass="sign-up-input readonly" type={"text"} label={"이름"} name={name} value={name} required={true} />
      <FormField wrapperClass="sign-up-wrapper" labelClass="sign-up-label" inputClass="sign-up-input readonly" type={"text"} label={"휴대폰번호"} name={phone_number} value={phone_number} required={true} />
      <FormField wrapperClass="sign-up-wrapper" labelClass="sign-up-label" inputClass="sign-up-input readonly" type={"text"} label={"이메일"} name={email} value={email} required={true} />
      <FormField
        wrapperClass="sign-up-wrapper"
        labelClass="sign-up-label"
        inputClass="sign-up-input "
        type={"text"}
        label={"닉네임"}
        name={"닉네임"}
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
        //닉네임 에러 메세지 + 서버에서 온 메세지 노출-> 검증
        errorMessage={getErrorMessage(formState.nick_name.errors, checknickname.isError ? checknickname.error.message : undefined)}
        //서버에서 온 메세지 노출
        successMessage={checknickname.data?.message}
        isInvalid={
          //검증 성공: 프론트 스키마 검증 성공(formState.nick_name.isValid===false )이고 서버 중복 검증성공(checknickname.success===true)):isvalid:true
          !(formState.nick_name.isValid && checknickname.isSuccess)
        }
        style={{ backgroundColor: "#f4f4f4" }}
      />
      <FormField
        wrapperClass="sign-up-wrapper"
        labelClass="sign-up-label"
        inputClass="sign-up-input"
        type={"password"}
        label={"비밀번호"}
        name={"비밀번호"}
        value={formState.password.value}
        required={true}
        placeholder="숫자, 영문, 특수문자 포함 8자 이상 작성해 주세요"
        onChange={handleInputChange("password")}
        onBlur={handleBlur("password")}
        onFocus={handleFocus("password")}
        errorMessage={getErrorMessage(formState.password.errors)}
        isInvalid={formState.password.errors.length > 0}
      />
      <FormField
        wrapperClass="sign-up-wrapper"
        labelClass="sign-up-label"
        inputClass="sign-up-input"
        type={"password"}
        label={"비밀번호확인"}
        name={"비밀번호확인"}
        value={formState.confirmPassword.value}
        required={true}
        placeholder="입력한 비밀번호를 입력해주세요."
        onChange={handleInputChange("confirmPassword")}
        onBlur={handleBlur("confirmPassword")}
        onFocus={handleFocus("confirmPassword")}
        errorMessage={getErrorMessage(formState.confirmPassword.errors)}
        isInvalid={formState.confirmPassword.errors.length > 0}
      />
      <div className="signUp__step3">
        {checkboxItems.map((item) => (
          <div key={item.id}>
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

        <button type="submit" className={`auth__button ${!isFormValid || checknickname.isError ? "disabled" : ""}`} disabled={!isFormValid || checknickname.isError}>
          확인
        </button>
      </div>
    </form>
  );
};
