import { HeaderProfile, ThemeToggle } from "@/shared/components/widgets";
import { Icon, Linker } from "@/shared/components/atoms";

interface HeaderProps {
  isDarkMode?: boolean;
  toggleTheme?: () => void;
}
export const Header = (props: HeaderProps) => {
  return (
    <header className="header_main" aria-label="Main Header">
      <div className="header_inner">
        <div className="header_left">
          <Linker href="/" className="header_logo">
            <span className="logo-secondary">P</span>
            <span className="logo-primary">UL</span>
            <span className="logo-secondary">S</span>
            <span className="logo-primary">E</span>
          </Linker>
        </div>
        <nav className="header_nav">
          <Linker href="/mentor">멘토링</Linker>
          <Linker href="/chat">채팅</Linker>
          <Linker href="/community">커뮤니티</Linker>
          <Linker href="/notice">공지사항</Linker>
          <Linker href="/admin">관리자</Linker>
        </nav>
        <div className="header_right">
          <div className="header_user-actions">
            <ThemeToggle />
            <button className="border-radius-circle w28 h28" style={{ background: "rgba(86, 84, 84, 0.2)" }}>
              <Icon src="bell_fff_20" alt="멤버 아이콘" />
            </button>
            <HeaderProfile />
          </div>
        </div>
      </div>
    </header>
  );
};
