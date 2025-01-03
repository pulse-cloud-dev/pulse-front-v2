import { HeaderMainNavigation } from "./navigation/mainNavigation";

interface PageHeaderProps {}
export const PageHeader = (props: PageHeaderProps) => {
  return (
    <header className="header header-single-line" aria-label="Page Header">
      <div className="header__inner">
        <HeaderMainNavigation />
      </div>
    </header>
  );
};
