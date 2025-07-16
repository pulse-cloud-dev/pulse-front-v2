import { Outlet } from "react-router-dom";

import { SideMenuConst } from "@/shared/constants";
import { FloatingSideMenu, PageHeader, ThemeToggle } from "@/shared/components/widgets";

export const WithAuthLayout = () => {
  return (
    <>
      <PageHeader />

      <div className="h80"></div>

      <main className="layout__sub">
        <section className="sub-layout__wrap">
          <Outlet />
        </section>

        <aside className="side__menu right">
          <FloatingSideMenu items={SideMenuConst.FLOATING_MENU} />
        </aside>
      </main>

      <div className="outer__right">
        <ThemeToggle />
      </div>
    </>
  );
};
