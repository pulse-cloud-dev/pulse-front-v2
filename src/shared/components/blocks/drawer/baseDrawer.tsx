import { ReactNode } from "react";
import { Icon } from "@/shared/components/atoms";

interface BaseDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
  position?: "left" | "right";
  width?: number;
  children: ReactNode;
  title?: string;
}

export const BaseDrawer = ({
  isOpen,
  onToggle,
  position = "right",
  width = 340,
  children,
  title,
}: BaseDrawerProps) => {
  const drawerStyle = {
    position: "absolute" as const,
    top: 0,
    [position]: isOpen ? 0 : `-${width}px`,
    width: `${width}px`,
    height: "100%",
    background: "#fff",
    boxShadow: isOpen
      ? position === "right"
        ? "-3px 0 6px rgba(16, 18, 18, 0.1)"
        : "3px 0 6px rgba(16, 18, 18, 0.1)"
      : "none",
    transition: `${position} 0.3s ease-in-out`,
    padding: "20px",
    overflowY: "auto" as const,
    zIndex: 5,
    border: "1px solid #e0e0e0",
    borderLeft: "none",
  };

  const buttonStyle = {
    position: "absolute" as const,
    top: "50%",
    [position]: isOpen ? `${width}px` : 0,
    transform: "translateY(-50%)",
    cursor: "pointer",
    transition: `${position} 0.3s ease-in-out`,
    zIndex: 10,
  };

  return (
    <>
      <button onClick={onToggle} style={buttonStyle}>
        <Icon
          src={isOpen ? "drawer-close-btn" : "drawer-open-btn"}
          alt={isOpen ? "닫기" : "열기"}
          style={{ width: "24px", height: "56px" }}
        />
      </button>

      <div style={drawerStyle}>
        {title && (
          <div className="m-b-20">
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
        )}
        {children}
      </div>
    </>
  );
};
