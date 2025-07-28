import { ChatRoomLayout } from "./chat.roomlayout";
import { TempLayout } from "./chat.templayout";
import { RoomList } from "./chat.roomlist";
import { useQueryParams } from "@/shared/modules/modals/shared/hooks/usequeryparams";

export const ChatRoomView = () => {
  const { currentValue: temp } = useQueryParams("temp");

  const LayoutComponent = temp ? TempLayout : ChatRoomLayout;

  return (
    <LayoutComponent>
      <RoomList />
    </LayoutComponent>
  );
};
