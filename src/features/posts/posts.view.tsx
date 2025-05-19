import type { Dispatch, SetStateAction } from "react";
import type { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import type { ViewEventProps } from "@/shared/types";
import { TextEditorView, useTextEditor } from "@/shared/modules/text-editor";
import { BaseButton, BaseTextField, Typography } from "@/shared/components";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface PostsViewProps extends ViewEventProps {
  textEditorState: [EditorState, Dispatch<SetStateAction<EditorState>>];
}

const textFieldClass = "m-t-30 m-b-30 gap_12";

export const PostsView = (props: PostsViewProps) => {
  const { event, textEditorState } = props;
  const [editorState, setEditorState] = textEditorState;
  const [State, setState] = useState<"온라인" | "오프라인">("온라인");
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [enddate, setendDate] = useState(new Date());
  const handleoffState = () => {
    setState("오프라인");
  };
  const handleonState = () => {
    setState("온라인");
  };

  const toggle = {
    State,
    handleoffState,
    handleonState,
  };
  const {
    editorRef,
    editorState: editorStatess,
    editorModel,
    onChange,
    toggleBlockType,

    toggleInlineStyle,
    handleKeyCommand,
    keyBindingFn,
    changeHandler,
  } = useTextEditor({ editorState, setEditorState });

  return (
    <article className="sub-layout__content">
      <header>
        <Typography variant="title" size="24" weight="bold">
          멘티 모집글 등록
        </Typography>
      </header>

      <section className="m-t-30">
        <BaseTextField
          // 모집인원
          label="제목"
          labelSize="md"
          className={textFieldClass}
          placeholder="제목을 입력해주세요"
          value={""}
          onChange={() => {}}
          error={""}
        />
      </section>

      <section className="m-t-30">
        <Typography variant="title" size="16" weight="bold">
          내용
        </Typography>
        <div className="flex_r m-t-10 border-gray  p-10 gap_5 items-center justify-center">
          <button
            onClick={() => {
              toggleInlineStyle("BOLD");
            }}
          >
            B
          </button>
          <button
            onClick={() => {
              toggleInlineStyle("ITALIC");
            }}
          >
            I
          </button>
          <button
            onClick={() => {
              toggleInlineStyle("STRIKETHROUGH");
            }}
          >
            S
          </button>
          <button
            onClick={() => {
              toggleInlineStyle("UNDERLINE");
            }}
          >
            <U />
          </button>

          <button
            onClick={() => {
              toggleBlockType("header-one");
            }}
          >
            <H1 />
          </button>
          <button
            onClick={() => {
              toggleBlockType("header-two");
            }}
          >
            <H2 />
          </button>
          <button
            onClick={() => {
              toggleBlockType("header-three");
            }}
          >
            <H3 />
          </button>
          <button
            onClick={() => {
              toggleBlockType("unordered-list-item");
            }}
          >
            <Bullet />
          </button>
          <button
            onClick={() => {
              toggleBlockType("ordered-list-item");
            }}
          >
            <Orderelistitem />
          </button>
        </div>
        <div className="border-gray  p-10 h502">
          <TextEditorView
            ref={editorRef}
            editorState={editorState!}
            handleChange={onChange}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={keyBindingFn}
            blockStyleFn={editorModel.handleBlockStyleFn}
            // customStyleMap={customStyleMap}
            placeholder={"내용을 입력해주세요."}
            style={{ height: "504px", overflowY: "auto" }}
          />
        </div>
      </section>

      <section className="m-t-30">
        <Typography variant="title" size="16" weight="bold">
          모집 마감 기한
        </Typography>
        <div className="flex_r m-t-12 ">
          <label htmlFor="duedate" className="relative">
            <DatePicker id="duedate" className="dateinput w300" selected={date} onChange={(date) => setDate(date)} dateFormat="yyyy년MM월dd일" placeholderText="모집 마감 기한을 선택해 주세요." />
            <Calendar className="absolute" style={{ right: "10px", top: "10px" }} />
          </label>
          <select className="select m-l-16">
            <option value="00:00">00시 00분</option>
            <option value="01:00">01시 00분</option>
            <option value="02:00">02시 00분</option>
            <option value="03:00">03시 00분</option>
            <option value="04:00">04시 00분</option>
            <option value="05:00">05시 00분</option>
            <option value="06:00">06시 00분</option>
            <option value="07:00">07시 00분</option>
            <option value="08:00">08시 00분</option>
            <option value="09:00">09시 00분</option>
            <option value="10:00">10시 00분</option>
            <option value="11:00">11시 00분</option>
            <option value="12:00">12시 00분</option>
            <option value="13:00">13시 00분</option>
            <option value="14:00">14시 00분</option>
            <option value="15:00">15시 00분</option>
            <option value="16:00">16시 00분</option>
            <option value="17:00">17시 00분</option>
            <option value="18:00">18시 00분</option>
            <option value="19:00">19시 00분</option>
            <option value="20:00">20시 00분</option>
            <option value="21:00">21시 00분</option>
            <option value="22:00">22시 00분</option>
            <option value="23:00">23시 00분</option>
          </select>
        </div>
        <div className="flex_c m-t-32">
          <div>
            <Typography variant="title" size="16" weight="bold">
              멘토링 기간
            </Typography>
          </div>
          <div className="flex_r ai_center m-t-12 ">
            <label htmlFor="startdate" className="relative">
              <DatePicker id="startdate" className="dateinput w220" selected={startDate} onChange={(startDate) => setStartDate(startDate)} dateFormat="yyyy년MM월dd일" placeholderText="시작일을 선택해 주세요." />
              <Calendar className="absolute" style={{ right: "10px", top: "10px" }} />
            </label>
            <div className="m-r-16 m-l-16">~</div>
            <label htmlFor="enddate" className="relative">
              <DatePicker id="enddate" className="dateinput w230" selected={enddate} onChange={(enddate) => setendDate(enddate)} dateFormat="yyyy년MM월dd일" placeholderText="종료일을 선택해 주세요." />
              <Calendar className="absolute" style={{ right: "10px", top: "10px" }} />
            </label>
          </div>
        </div>
        <div className="m-t-32">
          <Typography variant="title" size="16" weight="bold">
            강의형식
          </Typography>
          <div className="m-t-10 m-b-30 flex_r gap_4">
            <BaseButton color="reverse" onClick={(e) => toggle.handleonState()}>
              온라인
            </BaseButton>
            <BaseButton color="reverse" onClick={(e) => toggle.handleoffState()}>
              오프라인
            </BaseButton>
          </div>
        </div>
        {toggle.State === "온라인" && (
          <div>
            <BaseTextField label="온라인 플랫폼" className={textFieldClass} placeholder="온라인 플랫폼(ex. Zoom, Discord, Google Meets)을 입력해 주세요. 입력하지 않을 경우 '미정'으로 등록됩니다." value={""} onChange={() => {}} error={""} />
          </div>
        )}
        {toggle.State === "오프라인" && (
          <span className={textFieldClass}>
            <div className="flex_r ai_end gap_8">
              <BaseTextField className="gap_12 flex1" label="오프라인 주소" placeholder="일반 주소" value={""} onChange={() => {}} error={""} />
              <BaseButton color="reverse" size="md">
                주소 검색
              </BaseButton>
            </div>
            <div className="flex_r m-t-30">
              <BaseTextField className="flex1" placeholder="상세주소를 입력해주세요." value={""} onChange={() => {}} error={""} />
            </div>
          </span>
        )}

        <BaseTextField
          // 모집인원
          label="모집인원"
          labelSize="md"
          className={textFieldClass}
          placeholder="모집인원을 입력해주세요"
          value={""}
          onChange={() => {}}
          error={""}
        />
        <BaseTextField
          // 1인기준 멘토링 비용
          labelSize="md"
          label="1인 기준 멘토링 비용"
          className={textFieldClass}
          placeholder="금액을 입력해주세요"
          value={""}
          onChange={() => {}}
          error={""}
        />
        <div className="m-t-30 flex_r flex_jend gap_4">
          <BaseButton color="reverse">취소</BaseButton>
          <BaseButton className="primary">신청</BaseButton>
        </div>
      </section>
    </article>
  );
};

import { Icon } from "@/shared/components";

const Calendar = ({ className = "", ...props }) => {
  return <Icon src="calendar_bk_16" alt="달력 " className={`w24 h24 ${className}`} {...props} />;
};

const Bullet = ({ className = "", ...props }) => {
  return <Icon src="bullet" alt="불릿 " className={`w24 h24 ${className}`} {...props} />;
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
