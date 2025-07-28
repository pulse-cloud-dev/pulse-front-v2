// chat.roomlayout.tsx
import React from "react";

interface DetailLayoutProps {
  children: React.ReactNode;
}

export const DetailLayout: React.FC<DetailLayoutProps> = ({ children }) => {
  return (
    <section
      style={{
        width: "800px",
        padding: "0 24px 24px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "568px",
          overflow: "scroll",
        }}
      >
        {children}
      </div>
      <ChatInput />
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

import { BaseButton } from "@/shared/components";
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
