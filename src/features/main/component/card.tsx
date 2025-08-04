import { MentorCard } from "@/shared/components";
import { useMentoringListMain } from "../hooks/useMentoringListMain";
export const MainCardList = ( ) => {
  const { data : mentoringList = [] } = useMentoringListMain();
  
  return (
    <div className="mentoring-card-grid">
      {mentoringList.map((item) => (
          <MentorCard
            key={item.mentoringId}
            mentoringId={item.mentoringId}
            onlineStatus={item.lectureType === "ONLINE" ? "온라인" : "오프라인"}
            title={item.title}
            mentorProfileImage={item.mentorProfileImage}
            mentorJob={item.mentorJob}
            mentorCareer={item.mentorCareer}
            mentorNickname={item.mentorNickname}
            deadlineDate={item.deadlineDate}
            lectureType={item.lectureType}
            onlinePlatform={item.onlinePlatform}
            region={item.region}
          />
        ))}
    </div>
  );
};