// chat.roomlayout.tsx
import React from "react";

interface DetailLayoutProps {
  children: React.ReactNode;
}

export const DetailLayout: React.FC<DetailLayoutProps> = ({ children }) => {
  return (
    <section style={{ width: "800px", padding: "24px" }}>
      <div>{children}</div>
      <ChatInput />
    </section>
  );
};

const ChatInput: React.FC = () => {
  return (
    <form
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
      <ChatInputArea />
      <Bottom />
    </form>
  );
};

const ChatInputArea = () => {
  const mockmessage =
    "소녀가 걸음을 멈추며, 너, 저 산 너머에 가 본 일 있니. 벌 끝을 가리켰다. 송진을 생채기에다 문질러 바르고는 그 달음으로 칡덩굴 있는 데로 내려가, 꽃 많이 달린 몇 줄기를 이빨로 끊어 가지고 올라온다. 소녀는 비에 젖은 눈을 들어 한 번 쳐다보았을 뿐, 소년이 하는 대로 잠자코 있었다. 소년은 두 손을 오그려 내밀며, 참, 알도 굵다. 그리고 저, 우리 이번에 제사 지내고 나서 좀 있다 집을 내주게 됐다. 소년은 두 손을 오그려 내밀며, 참, 알도 굵다. 그리고 저, 우리 이번에 제사 지내고 나서 좀 있다 집을 내주게 됐다. 저건 또 무슨 꽃이지. 적잖이 비탈진 곳에 칡덩굴이 엉키어 꽃을 달고 있었다. 소녀의 그림자가 뵈지 않는 날이 계속될수록 소년의 가슴 한 구석에는 어딘가 허전함이 자리 잡는 것이었다. 소녀는 소년이 개울둑에 앉아 있는 걸 아는지 모르는지 그냥 날쌔게 물만 움켜 낸다.";
  return <textarea placeholder="메시지를 입력하세요..." value={mockmessage} style={{ height: "56px", width: "100%" }} />;
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
        <Icon src="search_18" alt="search button" />
        <Icon src="search_18" alt="search button" />
        <Icon src="search_18" alt="search button" />
      </div>
      <BaseButton color="primary"> 전송</BaseButton>
    </div>
  );
};
