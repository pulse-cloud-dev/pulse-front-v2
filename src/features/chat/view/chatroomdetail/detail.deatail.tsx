// chat.detaillist.tsx
import React from "react";

interface Message {
  id: number;
  sender: string;
  content: string;
}

const mockMessages: Message[] = [
  { id: 1, sender: "Alice", content: "안녕하세요!" },
  { id: 2, sender: "Bob", content: "반갑습니다." },
  { id: 3, sender: "Alice", content: "오늘 날씨 좋네요." },
];

export const DetailList: React.FC = () => {
  return (
    <div className="space-y-2 overflow-y-auto">
      {mockMessages.map((msg) => (
        <div key={msg.id} className="p-3 rounded-lg bg-gray-100">
          <strong>{msg.sender}: </strong>
          <span>{msg.content}</span>
        </div>
      ))}
    </div>
  );
};
