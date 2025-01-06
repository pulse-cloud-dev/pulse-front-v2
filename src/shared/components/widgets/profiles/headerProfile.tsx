import { useRef } from "react";
import { useOutSideClick, usePageNavigation, useToggle } from "taeo-hooks";

import { useUser } from "@/shared/lib/hooks";
import { Icon } from "@/shared/components";

export const HeaderProfile = () => {
  const profileRef = useRef<HTMLDivElement>(null);

  const { isLogin, logout } = useUser();
  const { value: open, toggle, setToggle } = useToggle();
  const { move } = usePageNavigation();

  useOutSideClick(profileRef!, () => setToggle(false));
  if (!isLogin) return null;
  return (
    <div ref={profileRef} className={`profile__header ${open ? "open" : ""} `}>
      <button className="border-circle w36 h36" style={{ background: "rgba(86, 84, 84, 0.2)" }} onClick={toggle}>
        <Icon src="member_icon_32" alt="멤버 아이콘" />
      </button>

      <div className="member_popover p-20 member_toggle">
        <div className="tac m-b-12">
          <Icon className="border-circle" src="member_icon_32" alt="멤버 아이콘" style={{ background: "rgba(86, 84, 84, 0.2)" }} />
          <div className="m-t-8 fs_16_medium white_w_bk">유저</div>
        </div>

        <button className="m-b-8 w142 btn__line sec btn_s fs_14" onClick={() => move("/my-page")}>
          마이페이지
        </button>
        <button className="w142 btn__line sec btn_s fs_14" onClick={logout}>
          로그아웃
        </button>
      </div>
    </div>
  );
};
