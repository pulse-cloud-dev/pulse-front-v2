import { MentorCard } from "@/shared/components";

interface Mentoring {
  mentoring_id: string;
  title: string;
  mentor_nickname: string;
  deadline_time: string;
  mentor_job: { jobCode: string };
  mentor_profile_image: string | null;
  lecture_type: "ONLINE" | "OFFLINE";
}

const dummyMentoringList: Mentoring[] = [
  {
    mentoring_id: "1",
    title: "제목입니다 제목은 세 줄까지지만 보입니다",
    mentor_nickname: "찡구는목말라",
    deadline_time: "2025-03-02",
    mentor_job: { jobCode: "UI/UX" },
    mentor_profile_image: "/profile.png",
    lecture_type: "ONLINE",
  },
  
];

export const MainCardList = () => {
  return (
    <div className="mentoring-card-grid">
      {dummyMentoringList.map((item) => (
        <MentorCard
          key={item.mentoring_id}
          mentoringId={item.mentoring_id}
          onlineStatus={item.lecture_type === "ONLINE" ? "온라인" : "오프라인"}
          title={item.title}
          mentorNickname={item.mentor_nickname}
          deadlineDate={item.deadline_time}
          mentorJob={item.mentor_job.jobCode}
          mentorProfileImage={item.mentor_profile_image}
        />
      ))}
    </div>
  );
};
