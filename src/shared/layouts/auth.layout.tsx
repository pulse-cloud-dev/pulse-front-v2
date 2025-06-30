import { Outlet } from "react-router-dom";

import { ThemeToggle } from "@/shared/components";

export const AuthLayout = () => {
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
};
