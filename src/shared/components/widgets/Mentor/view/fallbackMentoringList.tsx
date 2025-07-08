import { Typography } from "@/shared/components/atoms";
import { MentorCard } from "@/shared/components/blocks";

const dummyData = [
  {
    mentoring_id: "1",
    title: "React로 배우는 프론트엔드 입문",
    mentor_nickname: "코딩은재밌어",
    deadline_time: "2025-08-01",
    mentor_job: { jobCode: "프론트엔드 개발자" },
    mentor_profile_image: null,
    lecture_type: "OFFLINE",
  },
  {
    mentoring_id: "2",
    title: "백엔드 개발 로드맵",
    mentor_nickname: "백엔드장인",
    deadline_time: "2025-08-15",
    mentor_job: { jobCode: "백엔드 개발자" },
    mentor_profile_image: null,
    lecture_type: "ONLINE",
  },
];

export const FallbackMentoringList = () => {
  return (
    <>
      <Typography>예시 데이터입니다.</Typography>
      <div className="flex__box m-t-10">
        {dummyData.map((item, index) => (
          <div key={item.mentoring_id} data-index={index}>
            <MentorCard
              mentoringId={item.mentoring_id}
              onlineStatus={item.lecture_type === "ONLINE" ? "온라인" : "오프라인"}
              title={item.title}
              mentorNickname={item.mentor_nickname}
              deadlineDate={item.deadline_time}
              mentorJob={item.mentor_job.jobCode}
              mentorProfileImage={item.mentor_profile_image}
            />
          </div>
        ))}
      </div>
    </>
  );
};
