import { useQueryParams } from "@/shared/modules/modals/shared/hooks/usequeryparams";
import { ChatRoomLayout } from "./chat.roomlayout";
import { RoomList } from "./chat.roomlist";
export const ChatRoomView = () => {
  useQueryParams;
  return (
    <ChatRoomLayout>
      <RoomList />
    </ChatRoomLayout>
  );
};
