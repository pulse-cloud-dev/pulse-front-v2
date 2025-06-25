import type { Dispatch, SetStateAction } from "react";
import type { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import type { ViewEventProps } from "@/shared/types";
import { TextEditorView, useTextEditor } from "@/shared/modules/text-editor";
import { BaseButton, Typography } from "@/shared/components";
import { DatePickerField } from "@/shared/components/blocks/datepicker/DatePickerField";
import { useState, useRef, useEffect } from "react";
import { FormField } from "@/shared/components";
import { Dropdown, DropdownItem } from "@/shared/components/blocks/dropdown/dropdown";
import { MentoringPostRequestDTO } from "@/contracts/request/post/post.request.dto";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import DaumPostcodeEmbed from "react-daum-postcode";

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
  dueDate: FieldState<Date | null>;
  dueTime: FieldState<string | null>;
  startDate: FieldState<Date | null>;
  endDate: FieldState<Date | null>;
  lectureFormat: FieldState<"ONLINE" | "OFFLINE">;
  onlinePlatform: FieldState<string>;
  offlineAddress: FieldState<string>;
  offlineDetailAddress: FieldState<string>;
  recruitCount: FieldState<string>;
  mentorFee: FieldState<string>;
};

interface PostsViewProps extends ViewEventProps {
  requestPostMentoring: (payload: MentoringPostRequestDTO) => void;
  textEditorState: [EditorState, Dispatch<SetStateAction<EditorState>>];
}

const textFieldClass = "m-t-30 m-b-30 gap_12 ";

const lectureFormatOptions = [
  { value: "ONLINE" as const, label: "온라인" },
  { value: "OFFLINE" as const, label: "오프라인" },
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
      value: null,
      errorMessage: "마감일은 현재보다 늦어야 합니다.",
      state: "pending",
      dependsOn: ["dueTime"],
      customValidator: (value: Date) => value > new Date(),
    },
    dueTime: {
      value: null,
      errorMessage: "마감 시간을 입력해주세요.",
      state: "pending",
      dependsOn: ["dueDate"],
      customValidator: (value: string, formData: FormState) => {
        const dueDate = formData.dueDate?.value as Date;

        if (!dueDate || !value) return false;

        const [hours, minutes] = value.split(":").map(Number);

        const dueDateTime = new Date(dueDate);
        dueDateTime.setHours(hours, minutes, 0, 0);

        const now = new Date();

        return dueDateTime > now;
      },
    },
    startDate: {
      value: null,
      errorMessage: "시작일은 모집 마감 기한보다 늦어야 합니다",
      state: "pending",
      dependsOn: ["dueDate", "endDate"],
      customValidator: (value: Date, formData: FormState) => {
        const dueDate = formData.dueDate.value as Date;
        return value >= dueDate;
      },
    },
    endDate: {
      value: null,
      errorMessage: "종료일은 시작일보다 늦어야 합니다.",
      state: "pending",
      dependsOn: ["startDate"],
      customValidator: (value: Date, formData: FormState) => {
        const startDate = formData.startDate.value as Date;
        return value >= startDate;
      },
    },
    lectureFormat: {
      value: "ONLINE",
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
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    const errors: Record<string, boolean> = {};

    const hasError = Object.entries(formData).some(([key, field]) => {
      const isValid = validateField(key as keyof FormState, field, formData);
      errors[key] = !isValid;
      return !isValid;
    });

    setIsFormValid(!hasError);
  }, [formData]);

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

  // 개별 필드 유효성 검사 함수  ->dependsOn 필드도 검해야 함
  const validateField = (key: keyof FormState, field: FieldState<any>, formData: FormState): boolean => {
    const { value, pattern, customValidator } = field;

    // lectureFormat에 따른 조건부 검사
    const isOnline = formData.lectureFormat.value === "ONLINE";
    const isOffline = formData.lectureFormat.value === "OFFLINE";

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
      return finalFormData;
    });
  };

  // DatePickerField용 onBlur 핸들러
  const handleBlur = (fieldKey: keyof FormState) => {
    const currentValue = formData[fieldKey].value;
    validateAndUpdate(fieldKey, currentValue);
  };

  return {
    formData,
    updateField,
    validateAndUpdate,
    handleBlur,
    isFormValid,
    setFormData,
  };
};

export const PostsView = (props: PostsViewProps) => {
  const { textEditorState, requestPostMentoring } = props;
  const [editorState, setEditorState] = textEditorState;
  const [isPostcodeOpen, setIsPostcodeOpen] = useState<boolean>(false);

  // 폼 상태 관리 훅 사용
  const { formData, updateField, validateAndUpdate, handleBlur, isFormValid } = useFormState();

  const { editorRef, editorModel, onChange, toggleBlockType, toggleInlineStyle, handleKeyCommand, keyBindingFn } = useTextEditor({ editorState, setEditorState });

  // 다음 우편번호 API 완료 핸들러
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // 주소 필드 업데이트 및 유효성 검사
    validateAndUpdate("offlineAddress", fullAddress);

    // 우편번호 창 닫기
    setIsPostcodeOpen(false);

    console.log("Selected address:", fullAddress);
  };

  // 주소 검색 버튼 클릭 핸들러
  const handleAddressSearchClick = () => {
    setIsPostcodeOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formatDateYYMMDD = (date: Date): string => {
      const yy = String(date.getFullYear()).slice(2);
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      return `${yy}${mm}${dd}`;
    };

    if (isFormValid) {
      const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      const requestData: MentoringPostRequestDTO = {
        title: formData.title.value,
        content: htmlContent,
        deadline_date: formatDateYYMMDD(formData.dueDate.value as Date),
        deadline_time: formData.dueTime.value as string,
        start_date: formatDateYYMMDD(formData.startDate.value as Date),
        end_date: formatDateYYMMDD(formData.endDate.value as Date),
        lecture_type: formData.lectureFormat.value,
        online_platform: formData.onlinePlatform.value,
        address: formData.offlineAddress.value,
        detail_address: formData.offlineDetailAddress.value,
        recruit_number: Number(formData.recruitCount.value),
        cost: Number(formData.mentorFee.value),
      };
      requestPostMentoring(requestData);
    } else {
      alert("입력값을 다시 확인해주세요.");
    }
  };

  return (
    <div className="sub-layout__content">
      <form className="postform" onSubmit={handleSubmit}>
        <header>
          <Typography variant="title" size="24" weight="bold">
            멘티 모집글 등록
          </Typography>
        </header>
        <section>
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
        <section>
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

        <div className="flex_r m-t-12" style={{ gap: "8px" }}>
          <DatePickerField
            labelSize="sm"
            label=" 모집 마감 기한"
            name="duedate"
            isValid={formData.dueDate.state === "invalid" ? false : true}
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
              value={formData.dueTime.value === null ? "선택해주세요" : formData.dueTime.value}
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

        <div>
          <div style={{ height: "70px", display: "flex", flexDirection: "row", alignItems: "start" }}>
            <DatePickerField
              labelSize="md"
              label="멘토링기간"
              name="startdate"
              selected={formData.startDate.value}
              onChange={(date) => updateField("startDate", date || new Date())}
              onBlur={() => handleBlur("startDate")}
              placeholderText="시작일을 선택해 주세요."
              isValid={formData.startDate.state === "invalid" ? false : true}
              error={formData.startDate.errorMessage}
            />
            <div className="m-r-16 m-l-16 m-t-35">~</div>
            <DatePickerField
              className="m-t-20"
              isValid={formData.endDate.state === "invalid" ? false : true}
              name="enddate"
              selected={formData.endDate.value}
              onChange={(date) => updateField("endDate", date || new Date())}
              onBlur={() => handleBlur("endDate")}
              error={formData.endDate.errorMessage}
              placeholderText="종료일을 선택해 주세요."
            />
          </div>
        </div>

        <div>
          <Typography variant="compact" size="16" weight="semi-bold">
            강의형식
          </Typography>
          <div className="m-t-10">
            {lectureFormatOptions.map((option) => {
              const { value, label } = option;
              return (
                <BaseButton
                  key={value}
                  type="button"
                  color="reverse"
                  className={`m-r-8 ${formData.lectureFormat.value === value ? "primary" : "reverse"}`}
                  onClick={() => {
                    updateField("lectureFormat", (value as "ONLINE") || "OFFLINE");
                  }}
                >
                  {label}
                </BaseButton>
              );
            })}
          </div>
        </div>
        {formData.lectureFormat.value === "ONLINE" && (
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

        {formData.lectureFormat.value === "OFFLINE" && (
          <div className={textFieldClass}>
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start", gap: "4px" }}>
              <div style={formfieldlayout}>
                <FormField
                  name="오프라인 주소"
                  labelClass="form-field__label"
                  errorClass="text-field__error"
                  inputClass="form-field__input"
                  label="오프라인 주소"
                  placeholder="주소 검색 버튼을 클릭해서 주소를 선택해주세요"
                  value={formData.offlineAddress.value}
                  onChange={(e) => updateField("offlineAddress", e.target.value)}
                  onBlur={(e) => validateAndUpdate("offlineAddress", e.target.value)}
                  isInvalid={formData.offlineAddress.state === "invalid"}
                  errorMessage={formData.offlineAddress.errorMessage}
                  readOnly={true}
                />
              </div>
              <BaseButton type="button" color="reverse" size="lg" style={{ marginTop: "22px" }} onClick={handleAddressSearchClick}>
                주소 검색
              </BaseButton>
            </div>

            {/* 우편번호 검색 모달 */}
            {isPostcodeOpen && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 1000,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    width: "500px",
                    height: "600px",
                    position: "relative",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setIsPostcodeOpen(false)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      border: "none",
                      background: "none",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </button>
                  <DaumPostcodeEmbed onComplete={handleComplete} style={{ width: "100%", height: "100%" }} />
                </div>
              </div>
            )}

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
        <div style={{ ...formfieldlayout }}>
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
        <div style={{ ...formfieldlayout }}>
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
        <div className="flex_r flex_jend gap_4">
          <BaseButton color="reverse">취소</BaseButton>
          <BaseButton type="submit" className={isFormValid ? "primary " : "disabled"} disabled={!isFormValid}>
            신청
          </BaseButton>
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
