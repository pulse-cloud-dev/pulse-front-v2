import { Outlet } from "react-router-dom";

import { ThemeToggle } from "@/shared/components";
import { withAuthRedirect } from "@/shared/hocs";

export const AuthLayout = withAuthRedirect(() => {
  return (
    <>
      <main className="layout__sub">
        <section className="sub-layout__wrap">
          <Outlet />
        </section>
      </main>

      <div className="outer__right">
        <ThemeToggle />
      </div>
    </>
  );
});
