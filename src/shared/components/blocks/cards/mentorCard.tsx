import type { HTMLAttributes } from "react";
import { Modal, useModal } from "@/shared/modules";
import { MentorDetailPopup } from "@/shared/components/widgets";
import { Icon, Image, SquareBadge } from "@/shared/components/atoms";
import { BaseCard } from "./baseCard";
import { useState } from "react";

// Body
const BodyContentTitle = ({
  title,
  onClick,
}: {
  title: string;
  onClick?: () => void;
}) => {
  return <span onClick={onClick}>{title}</span>;
};

const BodyContentTag = ({
  job,

  profileImage,
}: {
  job: string;
  profileImage: string | null;
}) => {
  return (
    <div className="mentorCard-content__tag">
      <div className="content__tag left">
        <label className="flex_r flex_ac">
          <Icon src="id_badge" alt="사원증" />
          <span className="m-l-4">{job}</span>
        </label>
        <label className="flex_r flex_ac">
          <Icon src="briefcase_20" alt="서류가방" />
          <span className="m-l-4">{job}</span>
        </label>
        <label className="flex_r flex_ac">
          <Icon src="desktop" alt="데스크탑" />
          <span className="m-l-4">{job}</span>
        </label>
      </div>
      <div className="content__tag right">
        {profileImage ? (
          <Image
            className="mentorCard-img"
            src={profileImage}
            alt="프로필"
          />
        ) : (
          <Icon
            className="mentorCard-img"
            src="pulse_symbol"
            alt="pulse symbol"
          />
        )}
      </div>
    </div>
  );
};

// Footer
const FooterDescription = ({
  deadlineDate,
  mentorNickname,
}: {
  deadlineDate: string;
  mentorNickname: string;
}) => {
  return (
    <div className="mentorCard-footer__desc">
      <span className="footer__desc date">~{deadlineDate}</span>
      <span className="footer__desc nickname">{mentorNickname}</span>
    </div>
  );
};

interface MentorCardProps {
  mentoringId: string;
  title: string;
  mentorNickname: string;
  deadlineDate: string;
  mentorJob: string;
  mentorProfileImage: string | null;
  onlineStatus: "온라인" | "오프라인";
}

// Mentor Card Component
export const MentorCard = ({
  mentoringId,
  title,
  mentorNickname,
  deadlineDate,
  mentorJob,
  mentorProfileImage,
  onlineStatus
}: MentorCardProps) => {

interface ModalPayload {
  mentoringId: string;
}

interface ModalConfig {
  title: string;
  variant?: string;
  children: (payload: ModalPayload) => JSX.Element;
}

const modal = useModal<ModalPayload>(Modal, {
  title: "멘토링 정보",
  variant: "default",
  children: ({ mentoringId }: { mentoringId: string }) => (
    <MentorDetailPopup mentoringId={mentoringId} />
  ),
} as any);

// 북마크 상태 관리용 (임시)
const [isHovered, setIsHovered] = useState(false);
const [isBookmarked, setIsBookmarked] = useState(false);

const handleBookmarkClick = () => {
  setIsBookmarked((prev) => !prev); 
};

  return (
    <BaseCard>
      <BaseCard.Header>
        <SquareBadge 
          title={onlineStatus}
          color={onlineStatus === "온라인" ? "blue" : "orange"}
        />
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleBookmarkClick}
          style={{ cursor: "pointer" }}
        >
        <Icon 
          src= {
            isBookmarked || isHovered
              ? "bookmark_on" // 북마크 활성화
              : "bookmark_20" 
          } 
          alt={"bookmark"} 
        /></div>
      </BaseCard.Header>
      <BaseCard.Body className="border-b">
        <div className="mentorCard-body__top">
          <BodyContentTitle
            title={title}
            onClick={() => modal.openModal({ mentoringId })}
          />
        </div>
        <div className="mentorCard-body__bottom">
          <BodyContentTag job={mentorJob} profileImage={mentorProfileImage} />
        </div>
      </BaseCard.Body>
      <BaseCard.Footer>
        <FooterDescription
          deadlineDate={deadlineDate}
          mentorNickname={mentorNickname}
        />
      </BaseCard.Footer>
    </BaseCard>
  );
};
