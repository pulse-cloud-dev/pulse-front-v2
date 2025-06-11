// 리팩토링된 PostsView 컴포넌트
import type { Dispatch, SetStateAction } from "react";
import type { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import type { ViewEventProps } from "@/shared/types";
import { TextEditorView, useTextEditor } from "@/shared/modules/text-editor";
import { BaseButton, BaseTextField, Typography } from "@/shared/components";
import { DatePickerField } from "@/shared/components/blocks/datepicker/DatePickerField";
import { useState } from "react";

interface FormState {
  title: string;
  content: string;
  dueDate: Date | null;
  dueTime: string;
  startDate: Date | null;
  endDate: Date | null;
  lectureFormat: "온라인" | "오프라인";
  onlinePlatform: string;
  offlineAddress: string;
  offlineDetailAddress: string;
  recruitCount: string;
  mentorFee: string;
}

interface PostsViewProps extends ViewEventProps {
  textEditorState: [EditorState, Dispatch<SetStateAction<EditorState>>];
}

const textFieldClass = "m-t-30 m-b-30 gap_12";

const lectureFormatOptions = [
  { value: "온라인" as const, label: "온라인" },
  { value: "오프라인" as const, label: "오프라인" },
];

const useFormState = () => {
  const [formData, setFormData] = useState<FormState>({
    title: "",
    content: "",
    dueDate: new Date(),
    dueTime: "00:00",
    startDate: new Date(),
    endDate: new Date(),
    lectureFormat: "온라인",
    onlinePlatform: "",
    offlineAddress: "",
    offlineDetailAddress: "",
    recruitCount: "",
    mentorFee: "",
  });

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const isDueDateValid = !formData.dueDate || formData.dueDate > new Date();
  const isValidDateRange = !formData.startDate || !formData.endDate || formData.startDate <= formData.endDate;

  const isFormValid = formData.title && formData.recruitCount && formData.mentorFee && isDueDateValid && isValidDateRange;

  return { formData, updateField, isDueDateValid, isValidDateRange, isFormValid };
};

export const PostsView = (props: PostsViewProps) => {
  const { event, textEditorState } = props;
  const [editorState, setEditorState] = textEditorState;

  // 폼 상태 관리 훅 사용
  const { formData, updateField, isValidDateRange, isDueDateValid, isFormValid } = useFormState();

  const { editorRef, editorState: editorStatess, editorModel, onChange, toggleBlockType, toggleInlineStyle, handleKeyCommand, keyBindingFn, changeHandler } = useTextEditor({ editorState, setEditorState });

  const handleSubmit = () => {
    if (!isFormValid) {
      alert("모든 필드를 올바르게 입력해주세요.");
      return;
    }
    // 폼 제출 로직
    console.log("Form Data:", formData);
  };

  return (
    <article className="sub-layout__content">
      <header>
        <Typography variant="title" size="24" weight="bold">
          멘티 모집글 등록
        </Typography>
      </header>

      <section className="m-t-30">
        <BaseTextField label="제목" labelSize="md" className={textFieldClass} placeholder="제목을 입력해주세요" value={formData.title} onChange={(value) => updateField("title", value)} error={formData.title === "" ? "제목을 입력해주세요" : ""} />
      </section>

      <section className="m-t-30">
        <Typography variant="title" size="16" weight="bold">
          내용
        </Typography>
        <div className="flex_r m-t-10 border-gray p-10 gap_5 items-center justify-center">
          <button onClick={() => toggleInlineStyle("BOLD")}>B</button>
          <button onClick={() => toggleInlineStyle("ITALIC")}>I</button>
          <button onClick={() => toggleInlineStyle("STRIKETHROUGH")}>S</button>
          <button onClick={() => toggleInlineStyle("UNDERLINE")}>
            <U />
          </button>
          <button onClick={() => toggleBlockType("header-one")}>
            <H1 />
          </button>
          <button onClick={() => toggleBlockType("header-two")}>
            <H2 />
          </button>
          <button onClick={() => toggleBlockType("header-three")}>
            <H3 />
          </button>
          <button onClick={() => toggleBlockType("unordered-list-item")}>
            <Bullet />
          </button>
          <button onClick={() => toggleBlockType("ordered-list-item")}>
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

      <section className="m-t-30">
        <Typography variant="title" size="16" weight="bold">
          모집 마감 기한
        </Typography>
        <div className="flex_r m-t-12">
          <DatePickerField name="duedate " id="duedate" selected={formData.dueDate} onChange={(date) => updateField("dueDate", date)} placeholderText="모집 마감 기한을 선택해 주세요." />
          {/* <TimeSelector value={formData.dueTime} onChange={(time) => updateField("dueTime", time)} /> */}
        </div>

        {!isDueDateValid && formData.dueDate && <p className="text-red-500 text-sm m-t-8">마감 기한은 현재 시간 이후여야 합니다.</p>}

        <div className="flex_c m-t-32">
          <div>
            <Typography variant="title" size="16" weight="bold">
              멘토링 기간
            </Typography>
          </div>
          <div className="flex_r ai_center m-t-12">
            <DatePickerField name="startdate" id="startdate" selected={formData.startDate} onChange={(date) => updateField("startDate", date)} placeholderText="시작일을 선택해 주세요." />
            <div className="m-r-16 m-l-16">~</div>
            <DatePickerField name="enddate" id="enddate" selected={formData.endDate} onChange={(date) => updateField("endDate", date)} placeholderText="종료일을 선택해 주세요." />
          </div>

          {!isValidDateRange && <p className="text-red-500 text-sm m-t-8">종료일은 시작일보다 늦어야 합니다.</p>}
        </div>

        <div className="m-t-32">
          <Typography variant="title" size="16" weight="bold">
            강의형식
          </Typography>
          <div className="m-t-10 m-b-30">{/* <ToggleButtonGroup options={lectureFormatOptions} value={formData.lectureFormat} onChange={(value) => updateField("lectureFormat", value)} /> */}</div>
        </div>

        {formData.lectureFormat === "온라인" && (
          <div>
            <BaseTextField
              label="온라인 플랫폼"
              className={textFieldClass}
              placeholder="온라인 플랫폼(ex. Zoom, Discord, Google Meets)을 입력해 주세요. 입력하지 않을 경우 '미정'으로 등록됩니다."
              value={formData.onlinePlatform}
              onChange={(value) => updateField("onlinePlatform", value)}
              error={""}
            />
          </div>
        )}

        {formData.lectureFormat === "오프라인" && (
          <div className={textFieldClass}>
            <div className="flex_r ai_end gap_8">
              <BaseTextField
                className="gap_12 flex1"
                label="오프라인 주소"
                placeholder="일반 주소"
                value={formData.offlineAddress}
                onChange={(value) => updateField("offlineAddress", value)}
                error={formData.offlineAddress === "" ? "주소를 입력해주세요" : ""}
              />
              <BaseButton color="reverse" size="md">
                주소 검색
              </BaseButton>
            </div>
            <div className="flex_r m-t-30">
              <BaseTextField className="flex1" placeholder="상세주소를 입력해주세요." value={formData.offlineDetailAddress} onChange={(value) => updateField("offlineDetailAddress", value)} error={""} />
            </div>
          </div>
        )}

        <BaseTextField
          label="모집인원"
          labelSize="md"
          className={textFieldClass}
          placeholder="모집인원을 입력해주세요"
          value={formData.recruitCount}
          onChange={(value) => updateField("recruitCount", value)}
          error={formData.recruitCount === "" ? "모집인원을 입력해주세요" : ""}
        />

        <BaseTextField
          labelSize="md"
          label="1인 기준 멘토링 비용"
          className={textFieldClass}
          placeholder="금액을 입력해주세요"
          value={formData.mentorFee}
          onChange={(value) => updateField("mentorFee", value)}
          error={formData.mentorFee === "" ? "멘토링 비용을 입력해주세요" : ""}
        />

        <div className="m-t-30 flex_r flex_jend gap_4">
          <BaseButton color="reverse">취소</BaseButton>
          <BaseButton className={isFormValid ? "primary" : "disabled"} onClick={handleSubmit}>
            신청
          </BaseButton>
        </div>
      </section>
    </article>
  );
};

// 아이콘 컴포넌트들 (기존과 동일)
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
