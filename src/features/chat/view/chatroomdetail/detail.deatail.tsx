import React from "react";
const DEFAULT_PROFILE_IMAGE = "profile 1";
interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  profileimage: string;
}

const mockMessages: Message[] = [
  {
    id: 1,
    sender: "Alice",
    content: "안녕하세요!",
    timestamp: "2025-07-27",
    profileimage: "",
  },
  {
    id: 2,
    sender: "euan",
    content: "반갑습니다.",
    timestamp: "2025-07-27",
    profileimage: "",
  },
  {
    id: 3,
    sender: "Alice",
    content:
      "잘 지냈어요?잘 지냈어요?잘 지냈어요?잘 지냈어요?잘 지냈어요?잘 지냈어요?잘 지냈어요?잘 지냈어요?잘 지냈어요?잘 지냈어요?잘 지냈어요?잘 지냈어요?잘 지냈어요?잘 지냈어요?잘 지냈어요?잘 지냈어요?잘 지냈어요?잘 지냈어요?잘 지냈어요?잘 지냈어요?잘 지냈어요?잘 지냈어요?",
    timestamp: "2025-07-28",
    profileimage: "",
  },
  {
    id: 4,
    sender: "euan",
    content:
      "네, 덕분에요!네, 덕분에요!네, 덕분에요!네, 덕분에요!네, 덕분에요!네, 덕분에요!네, 덕분에요!네, 덕분에요!네, 덕분에요!네, 덕분에요!네, 덕분에요!네, 덕분에요!네, 덕분에요!네, 덕분에요!네, 덕분에요!네, 덕분에요!네, 덕분에요!네, 덕분에요!네, 덕분에요!네, 덕분에요!",
    timestamp: "2025-07-28",
    profileimage: "",
  },
  {
    id: 5,
    sender: "euan",
    content: "또 만났네요!또 만났네요!또 만났네요!또 만났네요!또 만났네요!또 만났네요!또 만났네요!또 만났네요!또 만났네요!또 만났네요!또 만났네요!또 만났네요!또 만났네요!",
    timestamp: "2025-07-29",
    profileimage: "",
  },
];

const DateDivider: React.FC<{ date: string }> = ({ date }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
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
        }}
      >
        <Typography variant="compact" weight="regular" color="grayscale" colorscale="60" size="13">
          {date}
        </Typography>
      </div>
    </div>
  );
};

import { Image, Typography } from "@/shared/components";
import { useQueryParams } from "@/shared/modules/modals/shared/hooks/usequeryparams";
const MessageItem: React.FC<{
  message: Message;
  isMine: boolean;
}> = ({ message, isMine }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isMine ? "flex-end" : "flex-start",
        alignItems: "flex-end",
        marginBottom: "4px",
        padding: "2px 12px",
        gap: "8px",
      }}
    >
      {!isMine && (
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

      <div style={{ maxWidth: "65%" }}>
        {!isMine && (
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
            backgroundColor: isMine ? "#BEF4ED" : "#F4F4F4",
            color: "#000",
            padding: "8px 12px",
            borderRadius: "18px",
            maxWidth: "320px",
          }}
        >
          <Typography variant="body" weight="regular" color="grayscale" colorscale="80" size="14">
            {message.content}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export const DetailList = () => {
  const myname = "euan";
  const processedMessages = mockMessages.map((msg, index) => {
    const prevMsg = index > 0 ? mockMessages[index - 1] : null;

    const isNewDate = !prevMsg || msg.timestamp !== prevMsg.timestamp;
    return {
      ...msg,
      isNewDate,
      isMine: msg.sender === myname,
    };
  });
  const { getQueryValue } = useQueryParams("room");
  const selectedRoomId = getQueryValue();
  console.log("Selected Room ID:", selectedRoomId);
  return (
    <>
      {processedMessages.map((msg) => (
        <React.Fragment key={msg.id}>
          {msg.isNewDate && <DateDivider date={msg.timestamp} />}
          <MessageItem message={msg} isMine={msg.isMine} />
        </React.Fragment>
      ))}
    </>
  );
};
