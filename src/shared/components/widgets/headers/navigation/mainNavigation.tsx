import { useLocation } from "react-router-dom";
import { Icon, Linker } from "@/shared/components/atoms";
import { ThemeToggle } from "../../theme/themeToggle";
import { HeaderSearchbar } from "@/shared/components/blocks";

interface HeaderMainMenuProps {}

const links = [
  { href: "/mentor", label: "멘토링 찾기" },
  { href: "/chat", label: "멘티 찾기" },
  { href: "/community", label: "커뮤니티" },
  { href: "/notice", label: "공지사항" },
  { href: "/admin", label: "관리자" },
];

export const HeaderMainNavigation = (props: HeaderMainMenuProps) => {
  const location = useLocation().pathname.split("/")[1];

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
            {links.map((link) => (
              <li key={link.href} className={`header__menu-item ${location === link.href.split("/")[1] ? "active" : ""}`}>
                <Linker href={link.href} className="header__menu-item-link">
                  {link.label}
                </Linker>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Header Navigation - Middle left*/}

      <div className="header__right">
        <HeaderSearchbar id="search-input" placeHolder="관심있는 키워드로 검색해보세요." />
        <div className="header__user-actions">
          <div>로그인</div>
          <div className="user-actions__signup">회원가입</div>
          {/* 테마 변경 */}
          {/* <ThemeToggle /> */}
          {/* 테마 변경 */}
        </div>
      </div>
    </>
  );
};
