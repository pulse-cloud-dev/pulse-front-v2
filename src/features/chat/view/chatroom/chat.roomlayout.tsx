import React from "react";
import { Icon, Typography, Spacer } from "@/shared/components";

interface ChatGroupProps {
  children?: React.ReactNode;
}

export const ChatRoomLayout = ({ children }: ChatGroupProps) => {
  return (
    <>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "336px",
          height: "100%",
          paddingLeft: "25px",
          paddingTop: "25px",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingRight: "25px",
          }}
        >
          <Typography variant="compact" weight="bold" size="16">
            채팅
          </Typography>
          <div style={{ display: "flex", gap: "12px" }}>
            <Icon src="search_18" alt="search button" />
            <Icon src="chatpencil" alt="search button" />
          </div>
        </header>
        <Spacer size={27} />
        {children}
      </section>
    </>
  );
};
