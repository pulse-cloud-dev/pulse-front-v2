import { Breadcrumb } from "@/shared/components/blocks";
import React from "react";

interface MentorViewProps {}

export const MentorView = (props: MentorViewProps) => {
  return (
    <article>
      <Breadcrumb
        items={[
          { title: "멘토링", href: "/" },
          { title: "멘토링1", href: `/` },
        ]}
      />

      <section>gkgkgkgk</section>
    </article>
  );
};
