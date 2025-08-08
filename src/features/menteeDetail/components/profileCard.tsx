import { useParams } from "react-router-dom";
import { useMentoringDetailQuery } from "@/features/menteeDetail";

export const MentorProfileCard = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useMentoringDetailQuery(id || "");

  if (!data) return null;

  const { mentor_nickname, mentor_job, mentor_career_total_year, mentor_profile_image, mentor_last_company } = data;

  return (
    <div className="mentor-profile-card">
      <img src={mentor_profile_image || "/images/profile 1.png"} alt="프로필" className="profile-img" />
      <div>
        <p className="mentor-name">{mentor_nickname || "이름 없음"}</p>
        <p className="mentor-info">
          직무: {mentor_job || "직무 정보 없음"} {mentor_career_total_year ?? 0}년차 <br />
          경력: {mentor_last_company || "경력 정보 없음"}
        </p>
      </div>
      <button className="mentor-profile-button">멘토 프로필 보기</button>
    </div>
  );
};
