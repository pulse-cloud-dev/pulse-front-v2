import { Typography } from "@/shared/components";
import { ImageGroup } from "@/shared/components";
import { Suspense } from "react";
import ErrorBoundary from "@/shared/components/blocks/errorboundary/errorBoundary";
const baseRooms = [
  {
    title: "닉네임이 너무 길어서 엘립시스닉네임이 너무 길어서 엘립시스닉네임이 너무 길어서 엘립시스닉네임이 너무 길어서 엘립시스닉네임이 너무 길어서 엘립시스",
    lastMessage: "안녕하세요! 멘토링채팅입니다. 두줄까지 보여집니다.안녕하세요! 멘토링채팅입니다. 두줄까지 보여집니다안녕하세요! 멘토링채팅입니다. 두줄까지 보여집니다안녕하세요! 멘토링채팅입니다. 두줄까지 보여집니다",
    timestamp: "오전 10:12",
    participants: ["profile 1", "profile 1", "profile 1", "profile 1"],
    unreadCount: 99,
  },
  {
    title: "닉네임이 너무 길어서 엘립시스",
    lastMessage: "안녕하세요! 멘토링채팅입니다. 두줄까지 보여집니다.",
    timestamp: "어제",
    participants: ["profile 1", "profile 1"],
    unreadCount: 100,
  },
  {
    title: "닉네임이 너무 길어서 엘립시스",
    lastMessage: "안녕하세요! 멘토링채팅입니다. 두줄까지 보여집니다.",
    timestamp: "어제",
    participants: ["profile 1"],
    unreadCount: 0,
  },
  {
    title: "닉네임이 너무 길어서 엘립시스",
    lastMessage: "안녕하세요! 멘토링채팅입니다. 두줄까지 보여집니다.",
    timestamp: "7/24",
    participants: ["profile 1", "profile 1", "profile 1"],
    unreadCount: 7,
  },
];

const mockRooms = Array.from({ length: 100 }, (_, i) => {
  const base = baseRooms[i % baseRooms.length];
  return {
    id: i + 1,
    ...base,
  };
});

export interface ChatRoomData {
  id: number;
  title: string;
  lastMessage: string;
  timestamp: string;
  participants: string[];
  unreadCount: number;
}

export interface ChatRoomItemProps extends ChatRoomData {
  selected: boolean;
  onSelect: () => void;
}

export type Participants = Pick<ChatRoomData, "participants">;

const ChatRoomItem = ({ title, lastMessage, timestamp, participants, unreadCount, onSelect, selected }: ChatRoomItemProps) => {
  return (
    <div
      style={{
        display: "flex",
        padding: "12px",
        alignItems: "center",
        gap: "12px",
        cursor: "pointer",
        width: "100%",
        backgroundColor: selected ? "#F4F4F4" : "transparent",
      }}
    >
      <ImageGroup participants={participants} />

      <div style={{ flex: 1, minWidth: 0 }} onClick={onSelect}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "4px",
          }}
        >
          <div
            style={{
              flex: 1,
              marginRight: "8px",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="compact"
              size="15"
              weight="semi-bold"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "block",
              }}
            >
              {title}
            </Typography>
          </div>
          <Typography variant="compact" size="13" weight="regular">
            {timestamp}
          </Typography>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "8px",
          }}
        >
          <div style={{ width: "180px" }}>
            <Typography
              variant="compact"
              size="13"
              weight="regular"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {lastMessage}
            </Typography>
          </div>

          {unreadCount > 0 && (
            <div
              style={{
                height: "18px",
                minWidth: "18px",
                borderRadius: "16px",
                padding: "2px 4px",
                backgroundColor: "#FF5757",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="compact" weight="medium" size="12" color="white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import { useQueryParams } from "@/shared/modules/modals/shared/hooks/usequeryparams";

export const RoomList = () => {
  const { currentValue: selectedRoomId, setQueryValue } = useQueryParams("room");
  const { currentValue: selectedRequestId } = useQueryParams("request");

  const { currentValue: selectedGroupId } = useQueryParams("group");

  return (
    <div style={{ width: "100%", height: "auto" }}>
      <ErrorBoundary fallback={<>error</>}>
        <Suspense fallback={<>suspense</>}>
          {mockRooms.map((room) => (
            <ChatRoomItem key={room.id} {...room} selected={String(room.id) === selectedRoomId} onSelect={() => setQueryValue(String(room.id))} />
          ))}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
