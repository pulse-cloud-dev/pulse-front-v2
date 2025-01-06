import { Outlet } from "react-router-dom";

import { PageHeader } from "@/shared/components/widgets";

export const WithAuthLayout = () => {
  return (
    <>
      <PageHeader />

      <div className="h80"></div>

      <main className="layout__sub">
        <section className="sub-layout__wrap">
          <Outlet />
        </section>
      </main>
    </>
  );
};
