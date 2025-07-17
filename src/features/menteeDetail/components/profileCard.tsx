interface MentorProfileCardProps {
  name: string;
  job: string;
  career: number;
  imageUrl?: string;
  lastCompany: string;
}

export const MentorProfileCard = ({ name, job, career, imageUrl, lastCompany }: MentorProfileCardProps) => (
  <div className="mentor-profile-card">
    <img src={imageUrl || "/images/profile 1.png"} alt="프로필" className="profile-img" />
    <div>
      <p className="mentor-name">{name}</p>
      <p className="mentor-info">
        직무: {job} {career}년차 <br /> 경력: {lastCompany}
      </p>
    </div>
    <button className="mentor-profile-button">멘토 프로필 보기</button>
  </div>
);