import { MentoringHeader } from "@/features/menteeDetail";
import { MentoringContent } from "@/features/menteeDetail";
import { MentorProfileCard } from "@/features/menteeDetail";
import { MentoringMetaCard } from "@/features/menteeDetail";
import { BookmarkButton } from "@/shared/components/blocks/bookmark/bookmarkButton";
import { ShareButton } from "@/shared/components/blocks/share/share";

export const MenteeDetailView = () => {
  return (
    <div className="mentoring-detail">
      <div className="mentoring-content-wrapper">
        <div className="mentoring-content">
          <div className="mentoring-detail-title-wrapper">
            <MentoringHeader />
            <div className="mentoring-actions">
              <div className="mentoring-actions__bookmark">
                <BookmarkButton />
              </div>
              <div className="mentoring-actions__share">
                <ShareButton label="공유" />
              </div>
            </div>
          </div>

          {/* 내용 */}
          <MentoringContent />
        </div>

        {/* 기타 정보 */}
        <aside className="mentoring-sidebar">
          <MentorProfileCard />

          <MentoringMetaCard />
        </aside>
      </div>
    </div>
  );
};
