import { ThemeToggle } from "@/shared/components/widgets";
import { Linker } from "@/shared/components/atoms";

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
            PULSE
          </Linker>
        </div>
        <nav className="header_nav">
          <Linker href="/mentoring">멘토링</Linker>
          <Linker href="/chat">채팅</Linker>
          <Linker href="/community">커뮤니티</Linker>
          <Linker href="/notice">공지사항</Linker>
          <Linker href="/admin">관리자</Linker>
        </nav>
        <div className="header_right">
          <div className="header_user-actions">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
