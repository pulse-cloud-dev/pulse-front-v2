import { useNavigate } from "react-router-dom";
import { Icon } from "@/shared/components";

type MenuItem = {
  id: string;
  label: string;
};

type MenuGroup = {
  title: string;
  icon: string;
  items: MenuItem[];
};

const SidebarItem = ({
  id,
  label,
  isActive,
  onClick,
}: {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <li className={`sidebar__item ${isActive ? "active" : ""}`} onClick={onClick}>
    {label}
  </li>
);


const MENU: MenuGroup[] = [
  {
    title: "내 정보",
    icon: "user",
    items: [
      { id: "basic", label: "기본 정보" },
      { id: "mentor", label: "멘토 정보" },
      { id: "condition", label: "맞춤 멘토 조건" },
    ],
  },
  {
    title: "멘토링 정보",
    icon: "student",
    items: [
      { id: "applied", label: "내가 신청한 멘토링" },
      { id: "progressing", label: "내가 진행한 멘토링" },
      { id: "received", label: "제안 받은 멘토링" },
      { id: "proposed", label: "제안한 멘토링" },
      { id: "inquiries", label: "문의 내역" },
    ],
  },
  {
    title: "북마크",
    icon: "bookmark_20",
    items: [{ id: "bookmark", label: "북마크" }],
  },
];

export const MyInfoSidebar = ({ selected }: { selected: string }) => {
  const navigate = useNavigate();

  return (
    <aside className="mypage-sidebar">
      {/* 상단 프로필 영역 */}
      <div className="sidebar__profile">
        <div className="sidebar__image-wrapper">
          <div className="sidebar__image">
            <img src="/images/profile 1.png" />
          </div>
          <div className="sidebar__edit-icon">
            <Icon src="edit" alt="편집" />
          </div>
        </div>
        <div className="sidebar__nickname">짱구는목말라</div>
      </div>

      {/* 메뉴 영역 */}
      <div className="sidebar__menu">
        <ul>
          {MENU.map((group) => (
            <div key={group.title}>
              <li className="sidebar__group-title">
                <Icon src={group.icon} alt={group.title} /> {group.title}
              </li>
              {group.items.map((item) => (
                <SidebarItem
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  isActive={selected === item.id}
                  onClick={() => navigate(`?menu=${item.id}`)}
                />
              ))}
            </div>
          ))}
        </ul>
      </div>
    </aside>
  );
};

