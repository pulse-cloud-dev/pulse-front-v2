import { useState } from "react";
import { PostsView } from "./posts.view";
import { EditorState } from "draft-js";

export const PostsController = () => {
  const textEditorState = useState(() => EditorState.createEmpty());

  const props = {
    textEditorState,
  };
  return <PostsView {...props} />;
};
