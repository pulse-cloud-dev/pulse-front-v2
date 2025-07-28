import { ChatLayout } from "./chat.layout";
import { ChatGroupView } from "./chatgroup/chat.group.view";
import { Divider } from "@/shared/components";
import { ChatRoomView } from "./chatroom/chat.room.view";
import { ChatDetailView } from "./chatroomdetail/detail.view";

interface ChatViewProps {}

export const ChatView = (props: ChatViewProps) => {
  return (
    <ChatLayout style={{ display: "flex", flexDirection: "row" }}>
      <ChatGroupView />
      <Divider direction="vertical" />
      <ChatRoomView />
      <Divider direction="vertical" />
      <ChatDetailView />
    </ChatLayout>
  );
};
