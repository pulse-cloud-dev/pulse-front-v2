interface SpacerProps {
  size?: number;
  direction?: "vertical" | "horizontal";
}

export const Spacer = ({ size = 8, direction = "vertical" }: SpacerProps) => {
  return <div style={direction === "vertical" ? { height: `${size}px`, width: "100%" } : { width: `${size}px`, height: "100%" }} />;
};
