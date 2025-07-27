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
          overflow: "scroll",
        }}
      >
        <header
          style={{
            paddingTop: "25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingRight: "25px",
            paddingLeft: "25px",
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "#FFFFFF",
            paddingBottom: "27px",
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

        {children}
      </section>
    </>
  );
};
