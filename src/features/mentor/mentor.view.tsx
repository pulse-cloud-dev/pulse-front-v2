import { Modal, useModal } from "@/shared/modules";
import { Breadcrumb, MentorCard, PageTabs, PopupSearch } from "@/shared/components/blocks";
import { Heading } from "@/shared/components/atoms";

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
        <header className="m-t-30">
          <Heading as={"h3"} onClick={openModal}>
            멘티모집
          </Heading>
        </header>
        {/* <Breadcrumb
          items={[
            { title: "멘토링", href: "mentor" },
            { title: "멘토링1", href: "mentor/123" },
          ]}
        /> */}

        <section className="m-t-30">
          {/* Tab Navigation */}
          <PageTabs
            tabList={[
              { id: "posts", display: "모집글" },
              { id: "map", display: "지도" },
            ]}
          />
        </section>

        <section className="m-t-30 flex_r gap_6">
          <PopupSearch title="분야" openPopup={openModal} />
          <PopupSearch title="온/오프라인" />
          <PopupSearch title="지역" />
        </section>

        <section className="flex__box m-t-30">
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
