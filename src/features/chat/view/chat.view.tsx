import { ChatLayout } from "./chat.layout";
import { ChatGroupView } from "./chatgroup/chat.group.view";

interface ChatViewProps {}

export const ChatView = (props: ChatViewProps) => {
  return (
    <ChatLayout>
      <ChatGroupView />
    </ChatLayout>
  );
};
