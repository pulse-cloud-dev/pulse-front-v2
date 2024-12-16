import { Outlet } from "react-router-dom";

import { Footer, Header } from "@/shared/components/widgets";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="body-wrapper">
        <main className={`page-wrapper`}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};
