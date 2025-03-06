import type { Dispatch, SetStateAction } from "react";
import type { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

import type { ViewEventProps } from "@/shared/types";
import { TextEditorView, useTextEditor } from "@/shared/modules/text-editor";
import { BaseButton, BaseTextField, Typography } from "@/shared/components";

interface PostsViewProps extends ViewEventProps {
  textEditorState: [EditorState, Dispatch<SetStateAction<EditorState>>];
}

const textFieldClass = "m-t-30 m-b-30 gap_12";

export const PostsView = (props: PostsViewProps) => {
  const { event, textEditorState } = props;
  const [editorState, setEditorState] = textEditorState;

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
      <header className="m-t-60">
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
        <div className="m-t-10 border-gray  p-10">툴바 위치</div>
        <div className="border-gray  p-10">
          <TextEditorView
            ref={editorRef}
            editorState={editorState!}
            handleChange={onChange}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={keyBindingFn}
            blockStyleFn={editorModel.handleBlockStyleFn}
            // customStyleMap={customStyleMap}
            placeholder={"내용을 입력해주세요."}
          />
        </div>
      </section>

      <section className="m-t-30">
        <BaseTextField label="모집 마감 기한" className={textFieldClass} placeholder="모집인원을 입력해주세요" value={""} onChange={() => {}} error={""} />

        <BaseTextField label="멘토링 기간" className={textFieldClass} placeholder="모집인원을 입력해주세요" value={""} onChange={() => {}} error={""} />

        <Typography variant="title" size="16" weight="bold">
          강의형식
        </Typography>
        <div className="m-t-10 m-b-30 flex_r gap_4">
          <BaseButton color="bk">온라인</BaseButton>
          <BaseButton color="reverse">오프라인</BaseButton>
        </div>

        <BaseTextField label="온라인 플랫폼" className={textFieldClass} placeholder="모집인원을 입력해주세요" value={""} onChange={() => {}} error={""} />

        <span className={textFieldClass}>
          <BaseTextField //
            className="gap_12 m-b-8"
            label="온프라인 주소"
            labelSize="md"
            placeholder="모집인원을 입력해주세요"
            value={""}
            onChange={() => {}}
            error={""}
          />
          <BaseTextField placeholder="모집인원을 입력해주세요" value={""} onChange={() => {}} error={""} />
        </span>

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
