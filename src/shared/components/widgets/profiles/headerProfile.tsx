import React, { useState } from "react";
import { Icon } from "@/shared/components/atoms";

export const HeaderProfile = () => {
  const [open, toggle] = useState(false);
  return (
    <div className={`hd_profile ${open ? "profile_open" : ""} `}>
      <button className="border-radius-circle w28 h28" style={{ background: "rgba(86, 84, 84, 0.2)" }} onClick={() => toggle(!open)}>
        <Icon src="member_icon_32" alt="멤버 아이콘" />
      </button>

      <div className="member_popover p-20 member_toggle">
        <div className="tac m-b-12">
          <Icon className="border-radius-circle" src="member_icon_32" alt="멤버 아이콘" style={{ background: "rgba(86, 84, 84, 0.2)" }} />
          <div className="m-t-8 fs_16_medium white_w_bk">admin</div>
        </div>

        <div className="m-b-8 w142 btn_line btn_s">
          <span className="fs_14" onClick={() => {}}>
            마이페이지
          </span>
        </div>
        <div className="w142 btn_line btn_s">
          <span className="fs_14" onClick={() => {}}>
            로그아웃
          </span>
        </div>
      </div>
    </div>
  );
};
