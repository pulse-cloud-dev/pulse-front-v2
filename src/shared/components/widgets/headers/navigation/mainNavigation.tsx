import { useLocation } from "react-router-dom";
import { Linker } from "@/shared/components/atoms";
import { ThemeToggle } from "../../theme/themeToggle";

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
          <span className="logo-secondary">P</span>
          <span className="logo-primary">UL</span>
          <span className="logo-secondary">S</span>
          <span className="logo-primary">E</span>
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
        <div className="header__user-actions">
          <ThemeToggle />
        </div>
      </div>
    </>
  );
};
