import { Icon, RoundButton } from "@/shared/components/atoms";

interface PopupSearchProps {
  title?: string;
  openPopup?: () => void;
  count?: number;
}

export const PopupSearch = (props: PopupSearchProps) => {
  const { title, openPopup, count = 0 } = props;
  const isSelected = count > 0;
  const label = isSelected ? `${title} ${count}개` : title;

  const buttonStyle = isSelected
    ? {
        backgroundColor: "#E6FAF5",
        border: "1px solid #00B894",
        color: "#00B894",
      }
    : {
        backgroundColor: "#FFFFFF",
        border: "1px solid #D1D5DB", // gray-300
        color: "#000000",
      };

  return (
    <RoundButton onClick={openPopup} style={buttonStyle}>
      {label} <Icon className="m-l-8" src="arrow_down" alt="아래 화살표" />
    </RoundButton>
  );
};
