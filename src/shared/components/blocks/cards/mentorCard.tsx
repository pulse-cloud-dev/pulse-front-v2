import { Icon, Image, SquareBadge } from "@/shared/components/atoms";
import { BaseCard } from "./baseCard";

import { Link } from "react-router-dom";
import { BookmarkButton } from "../bookmark/bookmarkButton";

// Body
const BodyContentTitle = ({ title, onClick }: { title: string; onClick?: () => void }) => {
  return <span onClick={onClick}>{title}</span>;
};

const BodyContentTag = ({ job, career, lectureType, platform, region, profileImage }: { job: string; career: number; lectureType: "ONLINE" | "OFFLINE"; platform: string; region: string; profileImage: string }) => {
  // 조건부 표시 값 설정
  const locationOrPlatform = lectureType === "OFFLINE" ? region : platform?.trim() || "미정";

  const locationLabel = lectureType === "OFFLINE" ? "지역" : "플랫폼";

  return (
    <div className="mentorCard-content__tag">
      <div className="content__tag left">
        <label className="flex_r flex_ac">
          <Icon src="id_badge" alt="사원증" />
          <span className="m-l-4">{job}</span>
        </label>
        <label className="flex_r flex_ac">
          <Icon src="briefcase_20" alt="서류가방" />
          <span className="m-l-4">경력 {career}년</span>
        </label>
        <label className="flex_r flex_ac">
          <Icon src="desktop" alt="데스크탑" />
          <span className="m-l-4">
            {locationLabel} : {locationOrPlatform}
          </span>
        </label>
      </div>
      <div className="content__tag right">
        <Image className="mentorCard-img" src={profileImage || "profile 1"} alt="프로필" />
      </div>
    </div>
  );
};

// Footer
const FooterDescription = ({ deadlineDate, mentorNickname }: { deadlineDate: string; mentorNickname: string }) => {
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
  mentorCareer: number;
  mentorProfileImage: string;
  lectureType: "ONLINE" | "OFFLINE";
  onlinePlatform: string;
  region: string;
}

// Mentor Card Component
export const MentorCard = ({ mentoringId, title, mentorNickname, deadlineDate, mentorJob, mentorCareer, mentorProfileImage, lectureType, onlinePlatform, region }: MentorCardProps) => {
  const badgeColor = lectureType === "ONLINE" ? "blue" : "orange";
  const badgeTitle = lectureType === "ONLINE" ? "온라인" : region || "주소 없음";

  return (
    <Link to={`/mentor-detail/${mentoringId}`} className="mentor-card-link">
      <BaseCard>
        <BaseCard.Header>
          <SquareBadge title={badgeTitle} color={badgeColor} />
          <BookmarkButton mentoringId={mentoringId} />
        </BaseCard.Header>
        <BaseCard.Body className="border-b">
          <div className="mentorCard-body__top">
            <BodyContentTitle title={title} />
          </div>
          <div className="mentorCard-body__bottom">
            <BodyContentTag job={mentorJob} career={mentorCareer} lectureType={lectureType} platform={onlinePlatform} region={region} profileImage={mentorProfileImage} />
          </div>
        </BaseCard.Body>
        <BaseCard.Footer>
          <FooterDescription deadlineDate={deadlineDate} mentorNickname={mentorNickname} />
        </BaseCard.Footer>
      </BaseCard>
    </Link>
  );
};
