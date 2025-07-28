import { Typography } from "@/shared/components";
import { ReactNode, CSSProperties } from "react";
import { BaseButton } from "@/shared/components";

interface ChatLayoutProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string; // className 추가
}
export const ChatLayout = ({ children, style, className }: ChatLayoutProps) => {
  return (
    <div>
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
        <TemporaryChatButton />
      </header>
      <div
        className={className}
        style={{
          width: "100%",
          height: "752px",
          borderRadius: "16px",
          border: "1px solid #E0E0E0",
          backgroundColor: "#FFFFFF",
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
};
import { useSearchParams } from "react-router-dom";

const TemporaryChatButton = () => {
  const [_, setSearchParams] = useSearchParams();
  return (
    <BaseButton
      color="reverse"
      type="button"
      onClick={() => {
        setSearchParams({ temp: "true" }, { replace: true });
      }}
    >
      임시채팅(4)
    </BaseButton>
  );
};
