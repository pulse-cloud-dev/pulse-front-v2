import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <>
      <div className="body-wrapper">
        <main className={`admin-wrapper`}>
          <aside>어드민사이드메뉴</aside>
          <Outlet />
        </main>
      </div>
    </>
  );
};
