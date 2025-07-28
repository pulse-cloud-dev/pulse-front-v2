import React from "react";
import dayjs from "dayjs";
import { Image, Typography } from "@/shared/components";
import { useQueryParams } from "@/shared/modules/modals/shared/hooks/usequeryparams";

const DEFAULT_PROFILE_IMAGE = "profile 1";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  profileimage: string;
}

const mockMessages: Message[] = [
  { id: 1, sender: "Alice", content: "안녕하세요!", timestamp: "2025-07-27T10:31:00", profileimage: "" },
  { id: 2, sender: "euan", content: "반갑습니다.", timestamp: "2025-07-27T10:31:40", profileimage: "" },
  { id: 3, sender: "Alice", content: "잘 지냈어요?", timestamp: "2025-07-28T11:00:00", profileimage: "" },
  { id: 10, sender: "Alice", content: "잘 지냈어요?", timestamp: "2025-07-28T11:00:00", profileimage: "" },
  { id: 11, sender: "Alice", content: "잘 지냈어요?", timestamp: "2025-07-28T11:00:00", profileimage: "" },
  { id: 12, sender: "euan", content: "네, 덕분에요!", timestamp: "2025-07-28T11:01:00", profileimage: "" },
  { id: 5, sender: "euan", content: "또 만났네요!", timestamp: "2025-07-29T12:00:00", profileimage: "" },
  { id: 6, sender: "euan", content: "또 만났네요!", timestamp: "2025-07-29T12:00:00", profileimage: "" },
  { id: 7, sender: "euan", content: "또 만났네요!", timestamp: "2025-07-29T12:00:00", profileimage: "" },
  { id: 8, sender: "euan", content: "또 만났네요!", timestamp: "2025-07-29T12:00:00", profileimage: "" },
  { id: 9, sender: "euan", content: "또 만났네요!또 만났네요!또 만났네요!또 만났네요!또 만났네요!또 만났네요!또 만났네요!또 만났네요!", timestamp: "2025-07-29T12:00:00", profileimage: "" },
];

const DateDivider: React.FC<{ date: string }> = ({ date }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "16px 0" }}>
      <div
        style={{
          textAlign: "center",
          height: "28px",
          borderRadius: "16px",
          border: "1px solid #eeeeee",
          padding: "6px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fafafa",
        }}
      >
        <Typography variant="compact" weight="regular" color="grayscale" colorscale="60" size="13">
          {date}
        </Typography>
      </div>
    </div>
  );
};

const MessageItem: React.FC<{
  message: Message;
  isMine: boolean;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
  showTimestamp: boolean;
}> = ({ message, isMine, isFirstInGroup, isLastInGroup, showTimestamp }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isMine ? "flex-end" : "flex-start",
        alignItems: "flex-start",
        marginBottom: isLastInGroup ? "12px" : "2px",
        padding: "2px 12px",
        gap: "8px",
      }}
    >
      {!isMine && isFirstInGroup && (
        <div style={{ width: "32px", height: "32px", flexShrink: 0 }}>
          <Image
            src={message.profileimage ? message.profileimage : DEFAULT_PROFILE_IMAGE}
            alt={message.sender}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      {!isMine && !isFirstInGroup && <div style={{ width: "32px", height: "32px", flexShrink: 0 }} />}

      <div style={{ maxWidth: "65%" }}>
        {!isMine && isFirstInGroup && (
          <div
            style={{
              marginBottom: "4px",
              marginLeft: "12px",
            }}
          >
            <Typography variant="body" weight="regular" color="grayscale" colorscale="80" size="14">
              {message.sender}
            </Typography>
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "6px",
            flexDirection: isMine ? "row-reverse" : "row",
          }}
        >
          <div
            style={{
              backgroundColor: isMine ? "#BEF4ED" : "#F4F4F4",
              color: "#000",
              padding: "8px 12px",
              borderRadius: "18px",
              // 첫 번째 메시지: 좌측 하단 뾰족
              borderBottomLeftRadius: !isMine && isFirstInGroup ? "4px" : "18px",
              // 마지막 메시지: 좌측 상단 뾰족
              borderTopLeftRadius: !isMine && isLastInGroup ? "4px" : "18px",
              // 내 메시지의 경우
              borderBottomRightRadius: isMine && isFirstInGroup ? "4px" : "18px",
              borderTopRightRadius: isMine && isLastInGroup ? "4px" : "18px",
              maxWidth: "320px",
            }}
          >
            <Typography variant="body" weight="regular" color="grayscale" colorscale="80" size="14">
              {message.content}
            </Typography>
          </div>

          {showTimestamp && (
            <div style={{ paddingBottom: "2px" }}>
              <Typography variant="compact" weight="regular" size="13">
                {dayjs(message.timestamp).format("A h:mm")}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export const DetailList = () => {
  const myname = "euan";

  const processedMessages = mockMessages.map((msg, index) => {
    const prev = index > 0 ? mockMessages[index - 1] : null;
    const next = index < mockMessages.length - 1 ? mockMessages[index + 1] : null;

    const isMine = msg.sender === myname;

    const currentTime = dayjs(msg.timestamp);
    const prevTime = prev ? dayjs(prev.timestamp) : null;
    const nextTime = next ? dayjs(next.timestamp) : null;

    const isSameSenderAsPrev = prev?.sender === msg.sender;
    const isSameMinuteAsPrev = prevTime && currentTime.diff(prevTime, "minute") === 0;

    const isSameSenderAsNext = next?.sender === msg.sender;
    const isSameMinuteAsNext = nextTime && currentTime.diff(nextTime, "minute") === 0;

    const isNewDate = !prev || !currentTime.isSame(prevTime, "day");

    return {
      ...msg,
      isMine,
      isNewDate,
      isFirstInGroup: !isSameSenderAsPrev || !isSameMinuteAsPrev,
      isLastInGroup: !isSameSenderAsNext || !isSameMinuteAsNext,
      showTimestamp: !isSameSenderAsNext || !isSameMinuteAsNext,
    };
  });
  const { getQueryValue } = useQueryParams("room");
  const selectedRoomId = getQueryValue();
  console.log("Selected Room ID:", selectedRoomId);

  if (!processedMessages || processedMessages.length === 0) {
    return <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>채팅이 없습니다</div>;
  }

  return (
    <>
      {processedMessages.map((msg) => (
        <React.Fragment key={msg.id}>
          {msg.isNewDate && <DateDivider date={dayjs(msg.timestamp).format("YYYY년 M월 D일")} />}
          <MessageItem message={msg} isMine={msg.isMine} isFirstInGroup={msg.isFirstInGroup} isLastInGroup={msg.isLastInGroup} showTimestamp={msg.showTimestamp} />
        </React.Fragment>
      ))}
    </>
  );
};
