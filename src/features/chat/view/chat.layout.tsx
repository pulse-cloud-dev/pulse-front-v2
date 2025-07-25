import { Typography } from "@/shared/components";
import { ReactNode } from "react";
import { BaseButton } from "@/shared/components";

interface ChatLayoutProps {
  children: ReactNode;
}

export const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <header
        style={{
          marginBottom: "25px",
          marginTop: "70px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="title" size="24" weight="bold">
          멘토링 챗
        </Typography>
        <BaseButton color="reverse" type="button">
          임시채팅(4)
        </BaseButton>
      </header>
      <div
        style={{
          width: "100%",
          height: "752px",
          borderRadius: "16px",
          border: "1px solid #E0E0E0",
        }}
      >
        {children}
      </div>
    </div>
  );
};
