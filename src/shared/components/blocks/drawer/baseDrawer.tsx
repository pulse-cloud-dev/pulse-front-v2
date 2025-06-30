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
  width = 360,
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
      <button 
        onClick={onToggle} 
        style={buttonStyle}
        aria-expanded={isOpen}
        aria-controls="base-drawer"
        aria-label={isOpen ? "드로어 닫기" : "드로어 열기"}
      >
        <Icon
          src={isOpen ? "drawer-close-btn" : "drawer-open-btn"}
          alt=""
          style={{ width: "24px", height: "56px" }}
        />
      </button>

      <div 
        style={drawerStyle}
        role="region"
        aria-label={title ?? "사이드 드로어"}
        id="base-drawer"
      >
        {title && (
          <div className="m-b-20">
            <h3 id="drawer-title" className="text-lg font-bold">{title}</h3>
          </div>
        )}
        {children}
      </div>
    </>
  );
};
