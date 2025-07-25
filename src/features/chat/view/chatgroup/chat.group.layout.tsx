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
        <AddGroupButton />
      </section>
    </>
  );
};
