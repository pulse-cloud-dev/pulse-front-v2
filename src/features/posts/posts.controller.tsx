import { useState } from "react";
import { PostsView } from "./posts.view";
import { EditorState } from "draft-js";
import { usePostMentoring } from "./posts.service";
import { withAuthRedirect } from "@/shared/hocs";
const PostsController = () => {
  const textEditorState = useState(() => EditorState.createEmpty());
  const { requestPostMentoring } = usePostMentoring();
  const props = {
    textEditorState,
    requestPostMentoring,
  };
  return <PostsView {...props} />;
};

export const ProtectedPostsController = withAuthRedirect(PostsController);
