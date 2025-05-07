import { useNavigate } from "react-router-dom";
import { BaseButton, Icon } from "../../atoms";

interface MenuItem {
  title: string;
  href?: string; // 선택적으로 설정 가능
  iconSrc?: string;
}

interface FloatingMenuItemProps extends MenuItem {}

const FloatingMenuItem = ({ title, href, iconSrc }: FloatingMenuItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (href) navigate(href);
  };

  return (
    <BaseButton onClick={handleClick}>
      <span className="flex_c dflx_ac_jc_full gap_4">
        {iconSrc && <Icon src={iconSrc} alt={title} />}
        {title}
      </span>
    </BaseButton>
  );
};

interface Props {
  items: MenuItem[];
}

export const FloatingSideMenu = ({ items }: Props) => {
  if (!items.length) return null;
  return (
    <div className="sideMenu__floating">
      <div>
        {items.map(({ title, href, iconSrc }) => (
          <FloatingMenuItem key={title} title={title} href={href} iconSrc={iconSrc} />
        ))}
      </div>
    </div>
  );
};
