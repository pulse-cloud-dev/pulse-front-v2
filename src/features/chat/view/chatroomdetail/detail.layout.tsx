// chat.roomlayout.tsx
import React from "react";

interface DetailLayoutProps {
  children: React.ReactNode;
}
import { useQueryParams } from "@/shared/modules/modals/shared/hooks/usequeryparams";
export const DetailLayout: React.FC<DetailLayoutProps> = ({ children }) => {
  const { currentValue } = useQueryParams("status");
  return (
    <section
      style={{
        width: "800px",
        paddingBottom: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "auto",
        overflow: "hidden",
      }}
    >
      {currentValue === "allow" && <RequestHeader />}
      <div
        style={{
          width: "100%",
          overflow: "scroll",
          flex: 1,
          padding: "0 24px",
        }}
      >
        {children}
      </div>
      <RequestFooter />
    </section>
  );
};

import { useState } from "react";

const ChatInput = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    console.log("보낸 메시지:", message);
    setMessage(""); // 입력창 초기화
  };

  return (
    <div style={{ padding: "0 24px" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          borderRadius: "12px",
          border: "1px solid #e0e0e0",
          padding: "12px",
          backgroundColor: "#fff",
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.05)",
          height: "136px",
        }}
      >
        <ChatInputArea value={message} onChange={setMessage} onSubmit={handleSubmit} />
        <Bottom />
      </form>
    </div>
  );
};

interface ChatInputAreaProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ChatInputArea: React.FC<ChatInputAreaProps> = ({ value, onChange, onSubmit }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e as any);
    }
  };

  return <textarea className="chat-textarea" placeholder="메시지를 입력하세요." value={value} onChange={handleChange} onKeyDown={handleKeyDown} style={{ height: "56px", width: "100%" }} />;
};

import { BaseButton, Typography } from "@/shared/components";
import { Icon } from "@/shared/components";

const Bottom = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        gap: "10px",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <Icon src="clip" alt="search button" />
        <Icon src="marker" alt="search button" />
        <Icon src="search_18" alt="search button" style={{ width: "24px", height: "24px" }} />
      </div>
      <BaseButton color="primary">전송</BaseButton>
    </div>
  );
};

const RequestHeader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "60px",
        borderBottom: "1px solid #e0e0e0",
        padding: "16px 20px",
      }}
    >
      <Typography variant="body" size="14" weight="semi-bold">
        [멘토링 신청 글 제목]
      </Typography>
      <Typography variant="body" size="14" weight="regular">
        에 대한 문의 요청입니다.
      </Typography>
    </div>
  );
};

const RequestFooter = () => {
  const [status, setStatus] = useState<StatusType>("rejected");

  return <>{status === "none" ? <ChatInput /> : <RequestDialog status={status} />}</>;
};

type StatusType = "rejected" | "canceled" | "ended" | "none" | "requested";

interface RequestDialogProps {
  status: Exclude<StatusType, "none">;
}

const RequestDialog: React.FC<RequestDialogProps> = ({ status }) => {
  let message = "";

  if (status === "rejected") {
    message = "거절한 채팅입니다.";
  } else if (status === "canceled") {
    message = "채팅이 취소되었습니다.";
  } else if (status === "ended") {
    message = "채팅이 종료되었습니다.";
  }

  return <div style={{ padding: "16px 20px", width: "100%", textAlign: "center", color: "#999" }}>{message}</div>;
};
