// 리팩토링된 PostsView 컴포넌트 (onBlur 유효성 검사 추가)
import type { Dispatch, SetStateAction, useMemo } from "react";
import type { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import type { ViewEventProps } from "@/shared/types";
import { TextEditorView, useTextEditor } from "@/shared/modules/text-editor";
import { BaseButton, Typography } from "@/shared/components";
import { DatePickerField } from "@/shared/components/blocks/datepicker/DatePickerField";
import { useEffect, useState } from "react";
import { FormField } from "@/shared/components";
import { Dropdown, DropdownItem } from "@/shared/components/blocks/dropdown/dropdown";

type FieldState<value> = {
  value: value;
  errorMessage: string;
  pattern?: RegExp;
  state: "valid" | "invalid" | "pending";
  dependsOn?: string[];
  customValidator?: (value: any, formData: FormState) => boolean;
};
const formfieldlayout: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
};

type FormState = {
  title: FieldState<string>;
  dueDate: FieldState<Date>;
  dueTime: FieldState<string>;
  startDate: FieldState<Date>;
  endDate: FieldState<Date>;
  lectureFormat: FieldState<"온라인" | "오프라인">;
  onlinePlatform: FieldState<string>;
  offlineAddress: FieldState<string>;
  offlineDetailAddress: FieldState<string>;
  recruitCount: FieldState<string>;
  mentorFee: FieldState<string>;
};

interface PostsViewProps extends ViewEventProps {
  textEditorState: [EditorState, Dispatch<SetStateAction<EditorState>>];
}

const textFieldClass = "m-t-30 m-b-30 gap_12 ";

const lectureFormatOptions = [
  { value: "온라인" as const, label: "온라인" },
  { value: "오프라인" as const, label: "오프라인" },
];

// 커스텀 훅 정의 (onBlur 유효성 검사 추가)
const useFormState = () => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormState>({
    title: {
      value: "",
      errorMessage: "제목은 1자 이상 100자 이하로 입력해주세요.",
      pattern: /^.{1,100}$/,
      state: "pending",
    },

    dueDate: {
      value: new Date(),
      errorMessage: "마감일을 입력해주세요.",
      state: "pending",
      customValidator: (value: Date) => value > new Date(),
    },
    dueTime: {
      value: "00:00",
      errorMessage: "마감 시간을 입력해주세요.",
      state: "pending",
    },
    startDate: {
      value: new Date(),
      errorMessage: "시작일을 입력해주세요.",
      state: "pending",
    },
    endDate: {
      value: new Date(),
      errorMessage: "종료일은 시작일보다 늦어야 합니다.",
      state: "pending",
      dependsOn: ["startDate"],
      customValidator: (value: Date, formData: FormState) => {
        const startDate = formData.startDate.value as Date;
        return value >= startDate;
      },
    },
    lectureFormat: {
      value: "온라인",
      errorMessage: "강의 형식을 선택해주세요.",
      state: "pending",
    },
    onlinePlatform: {
      value: "",
      errorMessage: "온라인 플랫폼을 입력해주세요.",
      state: "pending",
    },
    offlineAddress: {
      value: "",
      errorMessage: "오프라인 주소를 입력해주세요.",
      state: "pending",
    },
    offlineDetailAddress: {
      value: "",
      errorMessage: "상세 주소를 입력해주세요.",
      state: "pending",
    },
    recruitCount: {
      value: "",
      errorMessage: "1명 이상의 숫자를 입력해주세요.",
      pattern: /^[1-9][0-9]*$/,
      state: "pending",
    },
    mentorFee: {
      value: "",
      errorMessage: "숫자만 입력해주세요.",
      pattern: /^[0-9]+$/,
      state: "pending",
    },
  });

  console.log("formdata", formData);

  // formData 변화를 감지하여 isFormValid 업데이트
  useEffect(() => {
    const [hasError, updatedFormData] = checkError(formData);

    if (hasError) {
      const invalidFields = Object.entries(updatedFormData)
        .filter(([_, field]) => field.state === "invalid")
        .map(([key]) => key);

      console.log("유효하지 않은 필드들:", invalidFields);
    }

    setIsFormValid(!hasError);
  }, [formData]);

  // 필드 값 업데이트 함수
  const updateField = <Key extends keyof FormState>(key: Key, value: FormState[Key]["value"]) => {
    setFormData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        value,
        state: "pending",
      },
    }));
  };

  // 개별 필드 유효성 검사 함수
  const validateField = (key: keyof FormState, field: FieldState<any>, formData: FormState): boolean => {
    const { value, pattern, customValidator } = field;

    // lectureFormat에 따른 조건부 검사
    const isOnline = formData.lectureFormat.value === "온라인";
    const isOffline = formData.lectureFormat.value === "오프라인";

    // 온라인일 때 오프라인 필드는 검사하지 않음
    if (isOnline && (key === "offlineAddress" || key === "offlineDetailAddress")) {
      return true;
    }

    // 오프라인일 때 온라인 필드는 검사하지 않음
    if (isOffline && key === "onlinePlatform") {
      return true;
    }

    // 1. 필수 필드 검사 (빈 값 체크)
    if (typeof value === "string" && value.trim() === "") {
      return false;
    }

    // 2. 패턴 검사
    if (pattern && typeof value === "string" && !pattern.test(value)) {
      return false;
    }

    // 3. 커스텀 유효성 검사
    if (customValidator && !customValidator(value, formData)) {
      return false;
    }

    return true;
  };

  // 전체 폼 유효성 검사 함수
  const checkError = (formData: FormState): [boolean, FormState] => {
    let hasError = false;
    const newFormData = { ...formData };

    // lectureFormat에 따른 검사할 필드 결정
    const isOnline = formData.lectureFormat.value === "온라인";
    const excludeFields = isOnline ? ["offlineAddress", "offlineDetailAddress"] : ["onlinePlatform"];

    (Object.keys(formData) as Array<keyof FormState>).forEach((key) => {
      // 조건부로 제외할 필드는 검사하지 않음
      if (excludeFields.includes(key as string)) {
        (newFormData[key] as any) = {
          ...formData[key],
          state: "valid", // 제외된 필드는 valid로 설정
        };
        return;
      }

      const field = formData[key];
      const isValid = validateField(key, field, formData);

      if (!isValid) {
        (newFormData[key] as any) = {
          ...field,
          state: "invalid",
        };
        hasError = true;
      } else {
        (newFormData[key] as any) = {
          ...field,
          state: "valid",
        };
      }
    });

    return [hasError, newFormData];
  };

  // 실시간 유효성 검사 함수 (개별 필드용)
  const validateSingleField = (key: keyof FormState) => {
    setFormData((prev) => {
      const field = prev[key];
      const isValid = validateField(key, field, prev);

      return {
        ...prev,
        [key]: {
          ...field,
          state: isValid ? "valid" : "invalid",
        },
      };
    });
  };

  // 값을 받아서 상태 업데이트 + 에러 검증
  const validateAndUpdate = <Key extends keyof FormState>(key: Key, value: FormState[Key]["value"]) => {
    setFormData((prev) => {
      const newFormData = {
        ...prev,
        [key]: {
          ...prev[key],
          value,
        },
      };

      // 업데이트된 값으로 유효성 검사
      const field = newFormData[key];
      const isValid = validateField(key, field, newFormData);

      // 검증 결과 반영
      const finalFormData = {
        ...newFormData,
        [key]: {
          ...field,
          state: isValid ? "valid" : "invalid",
        },
      };

      // 의존성이 있는 필드들도 같이 검사
      const currentField = prev[key];
      if (currentField.dependsOn) {
        currentField.dependsOn.forEach((dependentKey) => {
          const depKey = dependentKey as keyof FormState;
          const depField = finalFormData[depKey];
          const depIsValid = validateField(depKey, depField, finalFormData);
          (finalFormData[depKey] as any) = {
            ...depField,
            state: depIsValid ? "valid" : "invalid",
          };
        });
      }

      // 현재 필드에 의존하는 다른 필드들도 검사
      (Object.keys(finalFormData) as Array<keyof FormState>).forEach((fieldKey) => {
        const fieldData = finalFormData[fieldKey];
        if (fieldData.dependsOn?.includes(key as string)) {
          const depIsValid = validateField(fieldKey, fieldData, finalFormData);
          (finalFormData[fieldKey] as any) = {
            ...fieldData,
            state: depIsValid ? "valid" : "invalid",
          };
        }
      });

      return finalFormData;
    });
  };

  // DatePickerField용 onBlur 핸들러
  const handleBlur = (fieldKey: keyof FormState) => {
    const currentValue = formData[fieldKey].value;
    validateAndUpdate(fieldKey, currentValue);
  };

  // 폼 제출 가능 여부 확인 (함수 제거됨 - 이제 isFormValid 변수 사용)

  return {
    formData,
    updateField,
    checkError,
    validateSingleField,
    validateAndUpdate,
    handleBlur,
    isFormValid,
    setFormData,
  };
};
export const PostsView = (props: PostsViewProps) => {
  const { event, textEditorState } = props;
  const [editorState, setEditorState] = textEditorState;

  // 폼 상태 관리 훅 사용
  const { formData, updateField, validateAndUpdate, handleBlur, isFormValid } = useFormState();

  const { editorRef, editorModel, onChange, toggleBlockType, toggleInlineStyle, handleKeyCommand, keyBindingFn } = useTextEditor({ editorState, setEditorState });

  const handleSubmit = () => {
    if (!isFormValid) {
      alert("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    console.log("Form Data:", formData, textEditorState);
  };
  return (
    <div className="sub-layout__content">
      <form className="postform">
        <header>
          <Typography variant="title" size="24" weight="bold">
            멘티 모집글 등록
          </Typography>
        </header>

        <section className="m-t-30">
          <div style={formfieldlayout}>
            <FormField
              labelClass="form-field__label"
              errorClass="text-field__error"
              inputClass="form-field__input"
              name="제목"
              label="제목"
              placeholder="제목을 입력해주세요"
              value={formData.title.value}
              onChange={(e) => updateField("title", e.target.value)}
              onBlur={(e) => validateAndUpdate("title", e.target.value)}
              isInvalid={formData.title.state === "invalid"}
              errorMessage={formData.title.errorMessage}
            />
          </div>
        </section>

        <section className="m-t-30">
          <Typography variant="compact" size="16" weight="semi-bold">
            내용
          </Typography>
          <div className="flex_r m-t-10 border-gray p-10 gap_5 items-center justify-center">
            <button type="button" onClick={() => toggleInlineStyle("BOLD")}>
              B
            </button>
            <button type="button" onClick={() => toggleInlineStyle("ITALIC")}>
              I
            </button>
            <button type="button" onClick={() => toggleInlineStyle("STRIKETHROUGH")}>
              S
            </button>
            <button type="button" onClick={() => toggleInlineStyle("UNDERLINE")}>
              <U />
            </button>
            <button type="button" onClick={() => toggleBlockType("header-one")}>
              <H1 />
            </button>
            <button type="button" onClick={() => toggleBlockType("header-two")}>
              <H2 />
            </button>
            <button type="button" onClick={() => toggleBlockType("header-three")}>
              <H3 />
            </button>
            <button type="button" onClick={() => toggleBlockType("unordered-list-item")}>
              <Bullet />
            </button>
            <button type="button" onClick={() => toggleBlockType("ordered-list-item")}>
              <Orderelistitem />
            </button>
          </div>
          <div className="border-gray p-10 h502">
            <TextEditorView
              ref={editorRef}
              editorState={editorState!}
              handleChange={onChange}
              handleKeyCommand={handleKeyCommand}
              keyBindingFn={keyBindingFn}
              blockStyleFn={editorModel.handleBlockStyleFn}
              placeholder={"내용을 입력해주세요."}
              style={{ height: "504px", overflowY: "auto" }}
            />
          </div>
        </section>

        <div className="m-t-30">
          <div className="flex_r m-t-12" style={{ gap: "8px" }}>
            <DatePickerField
              labelSize="sm"
              label=" 모집 마감 기한"
              name="duedate"
              isValid={formData.dueDate.state === "invalid"}
              error={formData.dueDate.errorMessage}
              selected={formData.dueDate.value}
              onChange={(date) => updateField("dueDate", date || new Date())}
              onBlur={() => handleBlur("dueDate")}
              placeholderText="모집 마감 기한을 선택해 주세요."
            />
            <div style={{ width: "180px" }}>
              <Dropdown
                id="hour-selector"
                label="시간 선택"
                value={formData.dueTime.value}
                onChange={(val) => updateField("dueTime", val)}
                onBlur={() => handleBlur("dueTime")}
                onFocus={() => console.log("HourSelector focused")}
                hasError={formData.dueTime.state === "invalid"}
                errorMessage={formData.dueTime.errorMessage}
              >
                {generateHours().map((hour) => (
                  <DropdownItem key={hour} value={hour}>
                    {hour}
                  </DropdownItem>
                ))}
              </Dropdown>
            </div>
          </div>

          <div className="flex_c m-t-32">
            <div style={{ height: "70px", display: "flex", flexDirection: "row", alignItems: "start" }}>
              <DatePickerField
                labelSize="md"
                label="멘토링기간"
                name="startdate"
                selected={formData.startDate.value}
                onChange={(date) => updateField("startDate", date || new Date())}
                onBlur={() => handleBlur("startDate")}
                placeholderText="시작일을 선택해 주세요."
                isValid={formData.startDate.state === "invalid"}
                error={formData.startDate.errorMessage}
              />
              <div className="m-r-16 m-l-16 m-t-35">~</div>
              <DatePickerField
                className="m-t-20"
                isValid={formData.endDate.state === "invalid"}
                name="enddate"
                selected={formData.endDate.value}
                onChange={(date) => updateField("endDate", date || new Date())}
                onBlur={() => handleBlur("endDate")}
                error={formData.endDate.errorMessage}
                placeholderText="종료일을 선택해 주세요."
              />
            </div>
          </div>

          <div className="m-t-32">
            <Typography variant="compact" size="16" weight="semi-bold">
              강의형식
            </Typography>
            <div className="m-t-10 m-b-30">
              {lectureFormatOptions.map((option) => {
                const { value, label } = option;
                return (
                  <BaseButton
                    key={value}
                    type="button"
                    color="reverse"
                    className={`m-r-8 ${formData.lectureFormat.value === value ? "primary" : "reverse"}`}
                    onClick={() => {
                      updateField("lectureFormat", value);

                      setTimeout(() => {
                        validateAndUpdate("lectureFormat", value);
                      }, 0);
                    }}
                  >
                    {label}
                  </BaseButton>
                );
              })}
            </div>

            {formData.lectureFormat.value === "온라인" && (
              <div style={formfieldlayout}>
                <FormField
                  name="온라인 플랫폼"
                  label="온라인 플랫폼"
                  labelClass="form-field__label"
                  errorClass="text-field__error"
                  inputClass="form-field__input"
                  placeholder="온라인 플랫폼(ex. Zoom, Discord, Google Meets)을 입력해 주세요. 입력하지 않을 경우 '미정'으로 등록됩니다."
                  value={formData.onlinePlatform.value}
                  onChange={(e) => updateField("onlinePlatform", e.target.value)}
                  onBlur={(e) => validateAndUpdate("onlinePlatform", e.target.value)}
                  isInvalid={formData.onlinePlatform.state === "invalid"}
                  errorMessage={formData.onlinePlatform.errorMessage}
                />
              </div>
            )}

            {formData.lectureFormat.value === "오프라인" && (
              <div className={textFieldClass}>
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", gap: "4px" }}>
                  <div style={formfieldlayout}>
                    <FormField
                      name="오프라인 주소"
                      labelClass="form-field__label"
                      errorClass="text-field__error"
                      inputClass="form-field__input"
                      label="오프라인 주소"
                      placeholder="일반 주소"
                      value={formData.offlineAddress.value}
                      onChange={(e) => updateField("offlineAddress", e.target.value)}
                      onBlur={(e) => validateAndUpdate("offlineAddress", e.target.value)}
                      isInvalid={formData.offlineAddress.state === "invalid"}
                      errorMessage={formData.offlineAddress.errorMessage}
                    />
                  </div>
                  <BaseButton type="button" color="reverse" size="lg">
                    주소 검색
                  </BaseButton>
                </div>
                <div className="flex_r m-t-30">
                  <div style={formfieldlayout}>
                    <FormField
                      label="상세주소"
                      name="상세주소"
                      labelClass="form-field__label"
                      errorClass="text-field__error"
                      inputClass="form-field__input"
                      placeholder="상세주소를 입력해주세요."
                      value={formData.offlineDetailAddress.value}
                      onBlur={(e) => validateAndUpdate("offlineDetailAddress", e.target.value)}
                      onChange={(e) => updateField("offlineDetailAddress", e.target.value)}
                      errorMessage={formData.offlineDetailAddress.errorMessage}
                      isInvalid={formData.offlineDetailAddress.state === "invalid"}
                    />
                  </div>
                </div>
              </div>
            )}
            <div style={{ ...formfieldlayout, marginTop: "16px" }}>
              <FormField
                name="모집인원"
                label="모집인원"
                labelClass="form-field__label"
                errorClass="text-field__error"
                inputClass="form-field__input"
                placeholder="모집인원을 입력해주세요"
                value={formData.recruitCount.value}
                onChange={(e) => updateField("recruitCount", e.target.value)}
                onBlur={(e) => validateAndUpdate("recruitCount", e.target.value)}
                isInvalid={formData.recruitCount.state === "invalid"}
                errorMessage={formData.recruitCount.errorMessage}
              />
            </div>
            <div style={{ ...formfieldlayout, marginTop: "16px" }}>
              <FormField
                name="1인 기준 멘토링 비용"
                label="1인 기준 멘토링 비용"
                labelClass="form-field__label"
                errorClass="text-field__error"
                inputClass="form-field__input"
                placeholder="금액을 입력해주세요"
                value={formData.mentorFee.value}
                onChange={(e) => updateField("mentorFee", e.target.value)}
                onBlur={(e) => validateAndUpdate("mentorFee", e.target.value)}
                isInvalid={formData.mentorFee.state === "invalid"}
                errorMessage={formData.mentorFee.errorMessage}
              />
            </div>
            <div className="m-t-30 flex_r flex_jend gap_4">
              <BaseButton color="reverse">취소</BaseButton>
              <BaseButton type="submit" className={isFormValid ? "primary " : "disabled"} onClick={handleSubmit} disabled={!isFormValid}>
                신청
              </BaseButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

// 아이콘 컴포넌트들
import { Icon } from "@/shared/components";

const Bullet = ({ className = "", ...props }) => {
  return <Icon src="bullet" alt="불릿" className={`w24 h24 ${className}`} {...props} />;
};

const Orderelistitem = ({ className = "", ...props }) => {
  return <Icon src="orderlist" alt="번호" className={`w24 h24 ${className}`} {...props} />;
};

const H1 = ({ className = "", ...props }) => {
  return <Icon src="h1" alt="h1" className={`w24 h24 ${className}`} {...props} />;
};

const H2 = ({ className = "", ...props }) => {
  return <Icon src="h2" alt="h2" className={`w24 h24 ${className}`} {...props} />;
};

const H3 = ({ className = "", ...props }) => {
  return <Icon src="h3" alt="h3" className={`w24 h24 ${className}`} {...props} />;
};

const U = ({ className = "", ...props }) => {
  return <Icon src="underline" alt="밑줄" className={`w15 h15 ${className}`} {...props} />;
};

const generateHours = () => {
  return Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0") + ":00");
};

export const HourSelector = (onsl) => {
  const [selectedHour, setSelectedHour] = useState("");

  return (
    <Dropdown
      id="hour-selector"
      label="시간 선택"
      value={selectedHour}
      onChange={(val) => setSelectedHour(val)}
      onBlur={() => console.log("HourSelector blurred")}
      onFocus={() => console.log("HourSelector focused")}
      hasError={selectedHour === ""}
      errorMessage="시간을 선택하세요"
    >
      {generateHours().map((hour) => (
        <DropdownItem key={hour} value={hour}>
          {hour}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};
