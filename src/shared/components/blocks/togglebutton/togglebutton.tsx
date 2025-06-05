interface ToggleButtonProps {
  isOn: boolean;
  onToggle: (checked: boolean) => void;
}

const ToggleBtn = ({ isOn, onToggle }: ToggleButtonProps) => {
  return (
    <div className="toggle-wrapper" style={{ marginBottom: "14px" }} onClick={() => onToggle(!isOn)} role="switch" aria-checked={isOn} tabIndex={0}>
      <div className={`toggle-switch ${isOn ? "on" : ""}`}>
        <div className="toggle-circle" />
      </div>
      <span className="toggle-label">재직중</span>
    </div>
  );
};

export default ToggleBtn;
