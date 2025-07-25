import { useState } from "react";
import { PostsView } from "./posts.view";
import { EditorState } from "draft-js";
import { usePostMentoring } from "./posts.service";
import { withAuthRedirect } from "@/shared/hocs";
import { useModal } from "@/shared/modules";

const PostsController = () => {
  const textEditorState = useState(() => EditorState.createEmpty());
  const { requestPostMentoring } = usePostMentoring({ openModal: () => openPostModal.openModal() }, { openModal: () => failPostModal.openModal() });
  const openPostModal = useModal(PostAlerts.Confirm);
  const closePostModal = useModal(PostAlerts.Cancel);
  const failPostModal = useModal(PostAlerts.Fail);
  const props = {
    textEditorState,
    requestPostMentoring,
    onCancel: () => closePostModal.openModal(),
  };
  return <PostsView {...props} />;
};

export const ProtectedPostsController = withAuthRedirect(PostsController);

interface RegisterAlertProps {
  closeModal: (id: string) => void;
  id: string;
}
import { usePageNavigation } from "@/shared/lib/hooks";
import { Alert } from "@/shared/modules";

const PostConfirmAlert = ({ id, closeModal }: RegisterAlertProps) => {
  const { goToPage } = usePageNavigation();
  return (
    <Alert
      title="멘티 모집글 등록"
      body="멘티 모집글 등록이 완료되었어요."
      cancelBtn={false}
      confirmText="확인"
      onConfirm={() => {
        closeModal(id);
        goToPage("/mentee-find");
      }}
    />
  );
};

const PostfailAlert = ({ id, closeModal }: RegisterAlertProps) => {
  const { goToPage } = usePageNavigation();

  return (
    <Alert
      title="멘티 모집글 등록"
      body="멘토등록은 5개 까지만 가능합니다."
      cancelBtn={false}
      confirmText="확인"
      onConfirm={() => {
        closeModal(id);
        goToPage("/mentee-find");
      }}
    />
  );
};

const PostCancelAlert = ({ id, closeModal }: RegisterAlertProps) => {
  const { goToPage } = usePageNavigation();

  return (
    <Alert
      title="멘티 모집글 등록"
      body="작성중인 내용이 있습니다. 페이지를 나가실 경우 작성된 내용은 모두 삭제가 됩니다. 그래도 나가시겠습니까?"
      cancelText="계속 작성"
      confirmText="나가기"
      onCancel={() => closeModal(id)}
      onConfirm={() => {
        closeModal(id);
        goToPage("/mentee-find");
      }}
    />
  );
};

export const PostAlerts = {
  Confirm: PostConfirmAlert,
  Cancel: PostCancelAlert,
  Fail: PostfailAlert,
};
