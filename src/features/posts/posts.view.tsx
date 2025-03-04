import type { Dispatch, SetStateAction } from "react";
import type { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

import type { ViewEventProps } from "@/shared/types";
import { TextEditorView, useTextEditor } from "@/shared/modules/text-editor";
import { BaseButton, Heading, Typography } from "@/shared/components";

interface PostsViewProps extends ViewEventProps {
  textEditorState: [EditorState, Dispatch<SetStateAction<EditorState>>];
}

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
        <Heading as={"h3"}>멘티 모집글 등록</Heading>
      </header>

      <section className="m-t-30">
        <Typography variant="title" size="18" weight="bold">
          제목
        </Typography>

        <div className="m-t-10 border-gray radius_8 p-10">입력창 컴포넌트 위치</div>
      </section>

      <section className="m-t-30">
        <Typography variant="title" size="18" weight="bold">
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
        <Typography variant="title" size="14" weight="bold">
          모집 마감 기한
        </Typography>
        <div className="m-t-10 m-b-30 border-gray radius_8 p-10">Input 창 위치</div>

        <Typography variant="title" size="14" weight="bold">
          멘토링 기간
        </Typography>
        <div className="m-t-10 m-b-30 border-gray radius_8 p-10">Input 창 위치</div>

        <Typography variant="title" size="14" weight="bold">
          강의형식
        </Typography>
        <div className="m-t-10 m-b-30 flex_r gap_4">
          <BaseButton className="bk">온라인</BaseButton>
          <BaseButton className="reverse">오프라인</BaseButton>
        </div>

        <Typography variant="title" size="14" weight="bold">
          온라인 플랫폼
        </Typography>
        <div className="m-t-10 m-b-30 border-gray radius_8 p-10">Input 창 위치</div>

        <Typography variant="title" size="14" weight="bold">
          오프라인 주소
        </Typography>
        <div className="m-t-10 border-gray radius_8 p-10">Input 창 위치</div>
        <div className="m-t-10 m-b-30 border-gray radius_8 p-10">Input 창 위치</div>

        <Typography variant="title" size="14" weight="bold">
          1인 기준 멘토링 비용
        </Typography>
        <div className="m-t-10 border-gray radius_8 p-10">Input 창 위치</div>

        <div className="m-t-30 flex_r flex_jend gap_4">
          <BaseButton className="bk">취소</BaseButton>
          <BaseButton className="reverse">신청</BaseButton>
        </div>
      </section>
    </article>
  );
};
