import { SquareBadge } from "@/shared/components/atoms";
import { BodyContentTag, BodyContentTitle, FooterDescription } from "./bodyContentTag";
import { BaseCard } from "./baseCard";
import { Link } from "react-router-dom";
import { BookmarkButton } from "../bookmark/bookmarkButton";

// Body
const BodyContentTitle = ({ title, onClick }: { title: string; onClick?: () => void }) => {
  return <span onClick={onClick}>{title}dfdsf</span>;
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
  mentoringId: string; // 멘토링 고유 ID (백엔드 제공)
  onlineStatus: string; // 온/오프라인 여부 (가공됨: "온라인" | "오프라인")
  title: string; // 멘토링 제목
  mentorNickname: string; // 멘토 닉네임
  deadlineDate: string; // 마감 날짜 (가공됨: YYYY-MM-DD 형식)
  mentorJob: string; // 멘토 직무명
  mentorCareer: number; // 멘토 총 경력 년수
  mentorProfileImage: string; // 멘토 프로필 이미지 경로
  lectureType: "ONLINE" | "OFFLINE"; // 강의 형태 (백엔드 원본 값)
  onlinePlatform: string; // 온라인 플랫폼명 (예: Zoom 등)
  region: string; // 오프라인 강의 지역명 (lectureType이 OFFLINE일 때 사용)
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
          <BookmarkButton />
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
