import { Outlet } from "react-router-dom";

import { FloatingSideMenu, PageHeader, ThemeToggle } from "@/shared/components/widgets";

export const MentorLayout = () => {
  return (
    <>
      <PageHeader />

      <div className="h80"></div>

      <main className="layout__sub">
        <section className="sub-layout__wrap">
          <Outlet />
        </section>
        <aside className="side__menu right">
          <FloatingSideMenu
            items={[
              { title: "멘토등록", href: "/posts", iconSrc: "pencil_20" },
              { title: "북마크등록", href: "/", iconSrc: "bookmark_20" },
              { title: "멘토찾기", href: "/mentor-find", iconSrc: "mentorFind_20" },
              { title: "멘티모집", href: "/mentee-find", iconSrc: "group_24" },
            ]}
          />
        </aside>
      </main>

      <div className="outer__right">
        <ThemeToggle />
      </div>
    </>
  );
};
