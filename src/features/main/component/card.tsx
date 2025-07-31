import { MentoringListItemDto } from "@/contracts/response/mentoring-list/mentoring-list.reseponse.dto";
import { MentorCard } from "@/shared/components";

interface Props {
  list: MentoringListItemDto[];
}

export const MainCardList = ({ list }: Props) => {
  console.log("받은 리스트:", list); 
  return (
    
    <div className="mentoring-card-grid">
      {list.map((item) => (
        <MentorCard
          key={item.mentoring_id}
          mentoringId={item.mentoring_id}
          title={item.title}
          mentorNickname={item.mentor_nickname}
          deadlineDate={item.deadline_time}
          mentorJob={item.mentor_job}
          mentorCareer={item.mentor_career_total_year}
          mentorProfileImage={item.mentor_profile_image}
          lectureType={item.lecture_type}
          onlinePlatform={item.online_platform}
          region={""} 
          onlineStatus={item.lecture_type === "ONLINE" ? "온라인" : "오프라인"}
        />
      ))}
    </div>
  );
};