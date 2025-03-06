import type { HTMLAttributes } from "react";

import { Modal, useModal } from "@/shared/modules";
import { MentorDetailPopup } from "@/shared/components/widgets";
import { Icon, Image, SquareBadge } from "@/shared/components/atoms";
import { BaseCard } from "./baseCard";

// Body
interface BodyContentTitleProps extends HTMLAttributes<HTMLElement> {
  title?: string;
}
const BodyContentTitle = (props: BodyContentTitleProps) => {
  const { title, ...rest } = props;
  return <>{title && <span {...rest}>{title}</span>}</>;
};

interface BodyContentTagProps {}
const BodyContentTag = (props: BodyContentTagProps) => {
  return (
    <div className="mentorCard-content__tag">
      {/* 태그 */}
      <div className="content__tag left">
        <label className="flex_r flex_ac">
          <Icon src="briefcase_20" alt="서류가방" />
          <span className="m-l-4 ">UI/UX</span>
        </label>
        <label className="flex_r flex_ac">
          <Icon src="briefcase_20" alt="서류가방" />
          <span className="m-l-4 ">UI/UX</span>
        </label>
        <label className="flex_r flex_ac">
          <Icon src="briefcase_20" alt="서류가방" />
          <span className="m-l-4 ">UI/UX</span>
        </label>
      </div>
      {/* 태그 */}

      {/* 프로필 이미지 */}
      <div className="content__tag right">
        <Image className="mentorCard-img" src="card" alt="프로필" />
      </div>
      {/* 프로필 이미지 */}
    </div>
  );
};

// Footer
interface FooterDescriptionProps {}
const FooterDescription = (props: FooterDescriptionProps) => {
  const {} = props;
  return (
    <div className="mentorCard-footer__desc">
      <span className="footer__desc date">~25년3월2일</span>
      <span className="footer__desc nickname">짱구는목말라</span>
    </div>
  );
};

interface MentorCardProps {
  title?: string;
}

// Mentor Card Component
export const MentorCard = ({ title = "제목입니다 제목은 세줄까지만 보입니다.제목입니다 제목은 세줄까지만 보입니다.제목입니다 제목은 " }: MentorCardProps) => {
  const modal = useModal(Modal, {
    title: "멘토링 정보",
    variant: "check",
    children: <MentorDetailPopup />,
  });

  return (
    <BaseCard>
      <BaseCard.Header>
        <SquareBadge title="온라인" />
        <Icon src={"bookmark_20"} alt={"bookmark"} />
      </BaseCard.Header>
      <BaseCard.Body className="border-b">
        <div className="mentorCard-body__top">
          <BodyContentTitle onClick={modal.openModal} title={title} />
        </div>
        <div className="mentorCard-body__bottom">
          <BodyContentTag />
        </div>
      </BaseCard.Body>
      <BaseCard.Footer>
        <FooterDescription />
      </BaseCard.Footer>
    </BaseCard>
  );
};
