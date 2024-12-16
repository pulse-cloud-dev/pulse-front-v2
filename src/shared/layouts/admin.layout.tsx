import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <>
      <div className="body-wrapper">
        <main className={`admin-wrapper`}>
          <Outlet />
        </main>
      </div>
    </>
  );
};
