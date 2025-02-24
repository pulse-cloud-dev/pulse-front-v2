import { Icon, RoundButton } from "@/shared/components/atoms";

interface PopupSearchProps {
  title?: string;
  openPopup?: () => void;
}

export const PopupSearch = (props: PopupSearchProps) => {
  const { title, openPopup } = props;

  return (
    <RoundButton onClick={openPopup}>
      {title} <Icon className="m-l-8" src="arrow_down" alt="아래 화살표" />
    </RoundButton>
  );
};
