import { SquareBadge } from "@/shared/components";
import { Icon } from "@/shared/components";


import { MentoringHeader} from "@/features/mentoringDetail";
import { MentoringContent } from "@/features/mentoringDetail";
import { MentorProfileCard } from "@/features/mentoringDetail";
import { MentoringMetaCard } from "@/features/mentoringDetail";

import { BookmarkButton } from "@/shared/components/blocks/bookmark/bookmarkButton";
import { ShareButton } from "@/shared/components/blocks/share/share";

interface MentorDetailViewProps {
  title: string;
  region: string;
  content: string;
  mentorName: string;
  mentorJob: string;
  mentorCareer: number;
  lastCompany: string;
  price: number;
  period: string;
  location: string;
  deadline: string;
  recruitNumber: number;
  applyNumber: number;
  isLogin: boolean;
  lectureType: "OFFLINE" | "ONLINE";
}


export const MentorDetailView = ({
  title,
  region,
  content,
  mentorName,
  mentorJob,
  mentorCareer,
  lastCompany,
  price,
  period,
  location,
  deadline,
  recruitNumber,
  applyNumber,
  isLogin,
  lectureType
}: MentorDetailViewProps) => {
  return (
    <div className="mentoring-detail">
      <div className="mentoring-content-wrapper">

        <div className="mentoring-content">
          {/* 헤더 */}
          <div className="mentoring-detail-title-wrapper">
            <MentoringHeader title={title} region={region} lectureType={lectureType}/>
            <div className="mentoring-actions">
              <div className="mentoring-actions__bookmark">
                <BookmarkButton label={"북마크 등록"}/>
              </div>
              
              <div className="mentoring-actions__share">
                <ShareButton label={"공유"}/>
              </div>
            </div>
          </div>

          {/* 내용 */}
          <MentoringContent content={content || "멘토링 내용"} />
        </div>

        {/* 기타 정보 */}
        <aside className="mentoring-sidebar">
          <MentorProfileCard
            name={mentorName || "이름 없음"}
            job={mentorJob || "직무 정보 없음"}
            career={mentorCareer || 0}
            lastCompany={lastCompany || "없음"}
          />

          <MentoringMetaCard
            price={price || 0}
            period={period || "기간 정보 없음"}
            location={location || "장소 정보 없음"}
            deadline={deadline || "마감일 정보 없음"}
            recruitNumber = {recruitNumber || 0}
            applyNumber = {applyNumber || 0}
            mentorName={mentorName || "이름 없음"} 
            title={title || "제목 없음"}           
            isLogin={isLogin}
          />
        </aside>

      </div>

      
    </div>
  );
};
