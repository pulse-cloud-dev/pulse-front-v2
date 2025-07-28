// Divider.tsx
import React from "react";

interface DividerProps {
  direction?: "horizontal" | "vertical";
  length?: string;
}

export const Divider = ({ direction = "horizontal", length = "100%" }: DividerProps) => {
  const style =
    direction === "horizontal"
      ? {
          width: length,
          height: "1px",
          backgroundColor: "#E0E0E0",
        }
      : {
          width: "1px",
          height: length,
          backgroundColor: "#E0E0E0",
          display: "inline-block",
        };

  return <div style={style} />;
};
