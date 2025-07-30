import { useNavigate } from "react-router-dom";
import { BaseButton, Icon } from "../../atoms";
import { useUser } from "@/shared/lib/hooks";
import { menuActionMap } from "@/shared/lib/utils/menuActionMap";

interface MenuItem {
  title: string;
  href?: string; // 선택적으로 설정 가능
  iconSrc?: string;
  onClick?: string; // 각 메뉴 클릭시 동작을 위한 
}

interface FloatingMenuItemProps extends MenuItem {}

const FloatingMenuItem = ({ title, href, iconSrc, onClick }: FloatingMenuItemProps) => {
  const navigate = useNavigate();
  const  {isLogin} = useUser();

  const handleClick = async () => {
    if (onClick && menuActionMap[onClick]) {
      menuActionMap[onClick](navigate, { isLogin }, { href });
      return;
    }
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
        {items.map(({ title, href, iconSrc,onClick}) => (
          <FloatingMenuItem key={title} title={title} href={href} iconSrc={iconSrc} onClick={onClick}/>
        ))}
      </div>
    </div>
  );
};
