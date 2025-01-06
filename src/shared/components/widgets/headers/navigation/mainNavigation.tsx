import { useLocation } from "react-router-dom";

import { Icon, Linker } from "@/shared/components/atoms";
import { HeaderSearchbar } from "@/shared/components/blocks";
import { useUser } from "@/shared/lib/hooks";
import { ThemeToggle } from "../../theme/themeToggle";
import { HeaderProfile } from "../../profiles/headerProfile";

interface HeaderMainMenuProps {}

const links = [
  { href: "/mentor", label: "멘토링 찾기" },
  { href: "/chat", label: "멘티 찾기" },
  { href: "/community", label: "커뮤니티" },
  { href: "/notice", label: "공지사항" },
  { href: "/admin", label: "관리자" },
];

export const HeaderMainNavigation = (props: HeaderMainMenuProps) => {
  const { pathname } = useLocation();
  const [depth1, depth2, depth3] = pathname.split("/");

  const { isLogin } = useUser();

  console.log(isLogin);
  return (
    <>
      <div className="header__left">
        {/* Header Left - Logo*/}
        <Linker href="/" className="header__logo text_bk_wh ">
          <Icon src="logo_01" className="logo" alt="HOME" />
        </Linker>
        {/* Header Left - Logo */}

        {/* Header Navigation - Middle left*/}
        <nav className="header__nav" aria-label="Primary Navigation">
          <ul className="header__menu">
            {links.map((link) => {
              const activeColor = depth2 === link.href.split("/")[1] ? "active" : "";
              return (
                <li key={link.href} className={`header__menu-item ${activeColor}`}>
                  <Linker href={link.href} className="header__menu-item-link">
                    {link.label}
                  </Linker>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      {/* Header Navigation - Middle left*/}

      <div className="header__right">
        {/* Theme Change Toggle*/}
        {/* <ThemeToggle /> */}
        {/* Theme Change Toggle*/}

        {/* Search-bar */}
        <HeaderSearchbar id="search-input" placeHolder="관심있는 키워드로 검색해보세요." />
        {/* Search-bar */}

        <div className="header__user-actions">
          {isLogin && <HeaderProfile />}
          {!isLogin && (
            <ul className="flex_r align_center justify_center gap_10">
              <li className={`user-actions__linker signIn`}>
                <Linker href={"/auth/signIn"} className={depth3 === "signIn" ? "active" : ""}>
                  로그인
                </Linker>
              </li>
              <li className="user-actions__linker signup">
                <Linker href={"/auth/signUp"}>회원가입</Linker>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
