// components/DatePickerField.tsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Icon } from "@/shared/components";

interface DatePickerFieldProps {
  id?: string;
  className?: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  dateFormat?: string;
  placeholderText?: string;
  width?: string;
  showIcon?: boolean;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

const Calendar = ({ className = "", ...props }) => {
  return <Icon src="calendar_bk_16" alt="달력" className={`w24 h24 ${className}`} {...props} />;
};

export const DatePickerField: React.FC<DatePickerFieldProps> = ({ id, className = "dateinput", selected, onChange, dateFormat = "yyyy년MM월dd일", placeholderText, width = "w300", showIcon = true, disabled = false, minDate, maxDate, ...props }) => {
  return (
    <label htmlFor={id} className="relative">
      <DatePicker id={id} className={`${className} ${width}`} selected={selected} onChange={onChange} dateFormat={dateFormat} placeholderText={placeholderText} disabled={disabled} minDate={minDate} maxDate={maxDate} {...props} />
      {showIcon && <Calendar className="absolute" style={{ right: "10px", top: "10px" }} />}
    </label>
  );
};

// hooks/useDatePickers.ts - 상태 관리 훅
import { useState } from "react";

interface DatePickersState {
  dueDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
}

export const useDatePickers = (initialState?: Partial<DatePickersState>) => {
  const [dueDate, setDueDate] = useState<Date | null>(initialState?.dueDate || new Date());
  const [startDate, setStartDate] = useState<Date | null>(initialState?.startDate || new Date());
  const [endDate, setEndDate] = useState<Date | null>(initialState?.endDate || new Date());

  // 유효성 검사 함수들
  const isValidDateRange = () => {
    if (!startDate || !endDate) return true;
    return startDate <= endDate;
  };

  const isDueDateValid = () => {
    if (!dueDate) return false;
    return dueDate > new Date();
  };

  // 날짜 포맷팅 유틸리티
  const formatDate = (date: Date | null, format: string = "yyyy-MM-dd") => {
    if (!date) return "";
    // 간단한 포맷팅 로직 (실제 프로젝트에서는 date-fns나 dayjs 사용 권장)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return format.replace("yyyy", String(year)).replace("MM", month).replace("dd", day);
  };

  // 초기화 함수
  const resetDates = () => {
    const today = new Date();
    setDueDate(today);
    setStartDate(today);
    setEndDate(today);
  };

  return {
    // 상태
    dueDate,
    startDate,
    endDate,

    // 세터 함수들
    setDueDate,
    setStartDate,
    setEndDate,

    // 유틸리티 함수들
    isValidDateRange,
    isDueDateValid,
    formatDate,
    resetDates,

    // 계산된 값들
    isRangeValid: isValidDateRange(),
    isDueValid: isDueDateValid(),
  };
};

// 리팩토링된 PostsView 컴포넌트
import type { Dispatch, SetStateAction } from "react";
import type { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import type { ViewEventProps } from "@/shared/types";
import { TextEditorView, useTextEditor } from "@/shared/modules/text-editor";
import { BaseButton, BaseTextField, Typography } from "@/shared/components";
import { useState } from "react";
import { DatePickerField } from "./components/DatePickerField";
import { useDatePickers } from "./hooks/useDatePickers";

interface PostsViewProps extends ViewEventProps {
  textEditorState: [EditorState, Dispatch<SetStateAction<EditorState>>];
}

const textFieldClass = "m-t-30 m-b-30 gap_12";

export const PostsView = (props: PostsViewProps) => {
  const { event, textEditorState } = props;
  const [editorState, setEditorState] = textEditorState;
  const [lectureType, setLectureType] = useState<"온라인" | "오프라인">("온라인");

  // 날짜 관리 훅 사용
  const { dueDate, startDate, endDate, setDueDate, setStartDate, setEndDate, isRangeValid, isDueValid } = useDatePickers();

  // 강의 형식 토글 핸들러들
  const handleLectureTypeChange = (type: "온라인" | "오프라인") => {
    setLectureType(type);
  };

  const { editorRef, editorState: editorStatess, editorModel, onChange, toggleBlockType, toggleInlineStyle, handleKeyCommand, keyBindingFn, changeHandler } = useTextEditor({ editorState, setEditorState });

  return (
    <article className="sub-layout__content">
      <header>
        <Typography variant="title" size="24" weight="bold">
          멘티 모집글 등록
        </Typography>
      </header>

      <section className="m-t-30">
        <BaseTextField label="제목" labelSize="md" className={textFieldClass} placeholder="제목을 입력해주세요" value={""} onChange={() => {}} error={""} />
      </section>

      <section className="m-t-30">
        <Typography variant="title" size="16" weight="bold">
          내용
        </Typography>
        <div className="flex_r m-t-10 border-gray p-10 gap_5 items-center justify-center">
          {/* 텍스트 에디터 툴바 버튼들 */}
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
          {/* 컴포넌트화된 DatePicker 사용 */}
          <DatePickerField
            id="duedate"
            selected={dueDate}
            onChange={setDueDate}
            placeholderText="모집 마감 기한을 선택해 주세요."
            width="w300"
            minDate={new Date()} // 오늘 이후만 선택 가능
          />
          <select className="select m-l-16">
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                {i.toString().padStart(2, "0")}시 00분
              </option>
            ))}
          </select>
        </div>

        {!isDueValid && dueDate && <p className="text-red-500 text-sm m-t-8">마감 기한은 현재 시간 이후여야 합니다.</p>}

        <div className="flex_c m-t-32">
          <div>
            <Typography variant="title" size="16" weight="bold">
              멘토링 기간
            </Typography>
          </div>
          <div className="flex_r ai_center m-t-12">
            <DatePickerField
              id="startdate"
              selected={startDate}
              onChange={setStartDate}
              placeholderText="시작일을 선택해 주세요."
              width="w220"
              maxDate={endDate || undefined} // 종료일 이전까지만 선택 가능
            />
            <div className="m-r-16 m-l-16">~</div>
            <DatePickerField
              id="enddate"
              selected={endDate}
              onChange={setEndDate}
              placeholderText="종료일을 선택해 주세요."
              width="w230"
              minDate={startDate || undefined} // 시작일 이후부터 선택 가능
            />
          </div>

          {!isRangeValid && <p className="text-red-500 text-sm m-t-8">종료일은 시작일보다 늦어야 합니다.</p>}
        </div>

        <div className="m-t-32">
          <Typography variant="title" size="16" weight="bold">
            강의형식
          </Typography>
          <div className="m-t-10 m-b-30 flex_r gap_4">
            <BaseButton color={lectureType === "온라인" ? "primary" : "reverse"} onClick={() => handleLectureTypeChange("온라인")}>
              온라인
            </BaseButton>
            <BaseButton color={lectureType === "오프라인" ? "primary" : "reverse"} onClick={() => handleLectureTypeChange("오프라인")}>
              오프라인
            </BaseButton>
          </div>
        </div>

        {/* 조건부 렌더링 */}
        {lectureType === "온라인" && (
          <div>
            <BaseTextField label="온라인 플랫폼" className={textFieldClass} placeholder="온라인 플랫폼(ex. Zoom, Discord, Google Meets)을 입력해 주세요. 입력하지 않을 경우 '미정'으로 등록됩니다." value={""} onChange={() => {}} error={""} />
          </div>
        )}

        {lectureType === "오프라인" && (
          <div className={textFieldClass}>
            <div className="flex_r ai_end gap_8">
              <BaseTextField className="gap_12 flex1" label="오프라인 주소" placeholder="일반 주소" value={""} onChange={() => {}} error={""} />
              <BaseButton color="reverse" size="md">
                주소 검색
              </BaseButton>
            </div>
            <div className="flex_r m-t-30">
              <BaseTextField className="flex1" placeholder="상세주소를 입력해주세요." value={""} onChange={() => {}} error={""} />
            </div>
          </div>
        )}

        <BaseTextField label="모집인원" labelSize="md" className={textFieldClass} placeholder="모집인원을 입력해주세요" value={""} onChange={() => {}} error={""} />
        <BaseTextField labelSize="md" label="1인 기준 멘토링 비용" className={textFieldClass} placeholder="금액을 입력해주세요" value={""} onChange={() => {}} error={""} />
        <div className="m-t-30 flex_r flex_jend gap_4">
          <BaseButton color="reverse">취소</BaseButton>
          <BaseButton className="primary">신청</BaseButton>
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
