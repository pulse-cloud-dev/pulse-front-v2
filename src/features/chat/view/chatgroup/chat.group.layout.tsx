import React from "react";
import { Icon, Typography, Spacer } from "@/shared/components";

interface ChatGroupProps {
  children?: React.ReactNode;
}

export const ChatGroupLayout = ({ children }: ChatGroupProps) => {
  return (
    <>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "144px",
          height: "100%",
          paddingLeft: "25px",
          paddingTop: "25px",
        }}
      >
        <Typography variant="compact" weight="bold" size="16">
          그룹
        </Typography>
        <Spacer size={27} />
        {children}
        <button
          style={{
            borderRadius: "14px",
            width: "104px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #E0E0E0",
          }}
          aria-label="그룹 추가"
        >
          +
        </button>
      </section>
    </>
  );
};
