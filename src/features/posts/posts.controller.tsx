import { useState } from "react";
import { PostsView } from "./posts.view";
import { EditorState } from "draft-js";
import { usePostMentoring } from "./posts.service";
export const PostsController = () => {
  const textEditorState = useState(() => EditorState.createEmpty());
  const { requestPostMentoring } = usePostMentoring();
  const props = {
    textEditorState,
    requestPostMentoring,
  };
  return <PostsView {...props} />;
};
