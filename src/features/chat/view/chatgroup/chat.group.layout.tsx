import React from "react";
import { Icon, Typography, Spacer } from "@/shared/components";
import AddGroupButton from "@/shared/components/widgets/addGroupbutton/addgroupbutton";
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
          alignItems: "center",
          justifyContent: "center",
          width: "144px",
          height: "100%",
          overflow: "scroll",
          paddingBottom: "10px",
        }}
      >
        <header
          style={{
            paddingTop: "25px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            paddingRight: "25px",
            paddingLeft: "25px",
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "#FFFFFF",
          }}
        >
          <Typography variant="compact" weight="bold" size="16">
            그룹
          </Typography>
        </header>
        <Spacer size={27} />
        <div
          style={{
            flex: 1,
            overflow: "auto",
          }}
        >
          {children}
        </div>
        <AddGroupButton />
      </section>
    </>
  );
};
