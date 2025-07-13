import { useParams } from "react-router-dom";
import { useMentoringDetailQuery } from "@/features/mentoringDetail";
import { MentorDetailView } from "./mentorDetail.view";
import { MentoringDetail } from "@/contracts/request/category/mentoringDetail";
import dayjs from "dayjs";

const dummyFallback: MentoringDetail = {
  title: "제목 없음",
  region: "서울",
  content: "내용",
  mentor_nickname: "이름 없음",
  mentor_job: "직무 정보 없음",
  mentor_career_total_year: 0,
  mentor_last_company: "경력 정보 없음",
  cost: 0,
  start_date: "2025-01-01",
  end_date: "2025-01-01",
  address: "주소 없음",
  detail_address: "",
  deadline_date: "2025-07-06T13:07:28.092Z",
  deadline_time: "00:00",
  apply_number: 0,
  recruit_number: 0,
  lecture_type: "ONLINE",
  mentor_profile_image: "",
  online_platform: "",
};


export const DetailController = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useMentoringDetailQuery(id || "");


  const d = data?? dummyFallback;

  const formattedDeadline = dayjs(d.deadline_date).format("YYYY.MM.DD HH:mm");

  return (
    <MentorDetailView
      title={d.title}
      region={d.region}
      content={d.content}
      mentorName={d.mentor_nickname}
      mentorJob={d.mentor_job}
      mentorCareer={d.mentor_career_total_year}
      lastCompany={d.mentor_last_company}
      price={d.cost}
      period={`${d.start_date} ~ ${d.end_date}`}
      location={`${d.address} ${d.detail_address}`}
      deadline={`${formattedDeadline}`}
      lectureType={d.lecture_type}
      recruitNumber={d.recruit_number}
      applyNumber={d.apply_number}
    />

    
  );
};

