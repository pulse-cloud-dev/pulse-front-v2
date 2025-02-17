import { Breadcrumb } from "@/shared/components/blocks";
import { Modal, useModal } from "@/shared/modules";

interface MentorViewProps {}

export const MentorView = (props: MentorViewProps) => {
  const { openModal } = useModal(Modal, {
    title: "모달 제목",
    // openCancelAlert: openCancelAlert,
    variant: "check",
    children: () => <div>모달달</div>, // Form
  });

  return (
    <article className="sub-layout__content">
      <Breadcrumb
        items={[
          { title: "멘토링", href: "mentor" },
          { title: "멘토링1", href: "mentor/123" },
        ]}
      />

      <section>
        <button onClick={openModal}>모달</button>
      </section>
    </article>
  );
};
