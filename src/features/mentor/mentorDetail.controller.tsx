import { useParams } from "react-router-dom";
import { useMentoringDetailQuery } from "@/shared/components/widgets/Mentor/hooks/useMentoringDetailQuery";
import { MentorDetailView } from "./mentorDetail.view";

const dummyFallback = {
  title: "제목 없음",
  region: "지역 정보 없음",
  content: "내용",
  mentor_nickname: "이름 없음",
  mentor_job: "직무 정보 없음",
  mentor_last_company: "경력 정보 없음",
  cost: 0,
  start_date: "2025-01-01",
  end_date: "2025-01-01",
  address: "주소 없음",
  detail_address: "",
  deadline_date: "2025-01-01",
  deadline_time: "00:00",
  apply_number: 0,
  recruit_number: 0,
};

export const DetailController = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useMentoringDetailQuery(id || "");


  const d = data?? dummyFallback;

  return (
    <MentorDetailView
      title={d.title}
      region={d.address}
      content={d.content}
      mentorName={d.mentor_nickname}
      mentorJob={d.mentor_job}
      mentorCareer={d.mentor_last_company}
      price={d.cost}
      period={`${d.start_date} ~ ${d.end_date}`}
      location={`${d.address} ${d.detail_address}`}
      deadline={`${d.deadline_date} ${d.deadline_time}`}
      count={`${d.apply_number}/${d.recruit_number}`}
    />
  );
};

