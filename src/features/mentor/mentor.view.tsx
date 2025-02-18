import { Heading } from "@/shared/components";
import { Breadcrumb, MentorCard } from "@/shared/components/blocks";
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
    <>
      <article className="sub-layout__content">
        <header className="m-t-30 m-b-30">
          <Heading as={"h3"}>멘티모집</Heading>
        </header>
        <Breadcrumb
          items={[
            { title: "멘토링", href: "mentor" },
            { title: "멘토링1", href: "mentor/123" },
          ]}
        />

        <button onClick={openModal}>모달</button>
        <section>탬 메뉴 위치</section>

        <section className="flex__box">
          <MentorCard />
          <MentorCard />
          <MentorCard />
          <MentorCard />
          <MentorCard />
          <MentorCard />
          <MentorCard />
          <MentorCard />
          <MentorCard />
          <MentorCard />
          <MentorCard />
        </section>
      </article>
    </>
  );
};
