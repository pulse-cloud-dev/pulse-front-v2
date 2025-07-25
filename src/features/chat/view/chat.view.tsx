import { ChatLayout } from "./chat.layout";
import { ChatGroup } from "./chat.group";
interface ChatViewProps {}

export const ChatView = (props: ChatViewProps) => {
  return (
    <ChatLayout>
      <ChatGroup></ChatGroup>
    </ChatLayout>
  );
};
