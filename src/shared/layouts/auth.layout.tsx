import { Outlet } from "react-router-dom";
import { withAuthRedirect } from "../hocs";

export const AuthLayout = withAuthRedirect(() => {
  return (
    <>
      <main className="layout__sub">
        <section className="sub-layout__wrap">
          <Outlet />
        </section>
      </main>
    </>
  );
});
