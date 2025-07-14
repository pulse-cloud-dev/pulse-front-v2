import { SquareBadge } from "@/shared/components";
import { Icon } from "@/shared/components";

import { MentoringHeader} from "@/features/mentoringDetail";
import { MentoringContent } from "@/features/mentoringDetail";
import { MentorProfileCard } from "@/features/mentoringDetail";
import { MentoringMetaCard } from "@/features/mentoringDetail";


import { useMentoringDetailQuery } from "@/features/mentoringDetail";

interface MentorDetailViewProps {
  title: string;
  region: string;
  content: string | React.ReactNode;
  mentorName: string;
  mentorJob: string;
  mentorCareer: string;
  price: number;
  period: string;
  location: string;
  deadline: string;
  recruitNumber: number;
  applyNumber: number;
  lectureType: "ONLINE" | "OFFLINE";
}


export const MentorDetailView = ({
  title,
  region,
  content,
  mentorName,
  mentorJob,
  mentorCareer,
  price,
  period,
  location,
  deadline,
  recruitNumber,
  applyNumber,
  lectureType
}: MentorDetailViewProps) => {
  return (
    <div className="mentoring-detail">
      <div className="mentoring-content-wrapper">

        {/* 멘토링 내용 */}
        <div className="mentoring-content">
          <div className="mentoring-detail-title-wrapper">
            <MentoringHeader title={title} region={region} lectureType={lectureType}/>
            <div className="mentoring-actions">
              <button type="button">
                <Icon src="bookmark_20" alt="북마크" />
                <span>북마크 등록</span>
              </button>
              <button type="button">
                <Icon src="share" alt="공유" />
                <span>공유</span>
              </button>
            </div>
          </div>

          <MentoringContent title="멘토링 소개">
            <p style={{ whiteSpace: "pre-line" }}>{content || "내용이 없습니다."}</p>
          </MentoringContent>
        </div>

        {/* 기타 정보 */}
        <aside className="mentoring-sidebar">
          <MentorProfileCard
            name={mentorName || "이름 없음"}
            job={mentorJob || "직무 정보 없음"}
            career={mentorCareer || "경력 정보 없음"}
          />

          <MentoringMetaCard
            price={price || 0}
            period={period || "기간 정보 없음"}
            location={location || "장소 정보 없음"}
            deadline={deadline || "마감일 정보 없음"}
            recruitNumber = {recruitNumber || 0}
            applyNumber = {applyNumber || 0}
          />
        </aside>

      </div>
    </div>
  );
};
