import { Breadcrumb } from "@/shared/components/blocks";
import React from "react";

interface MentorViewProps {}

export const MentorView = (props: MentorViewProps) => {
  return (
    <article className="sub-layout__content">
      <Breadcrumb
        items={[
          { title: "멘토링", href: "mentor" },
          { title: "멘토링1", href: "mentor/123" },
        ]}
      />

      <section></section>
    </article>
  );
};
