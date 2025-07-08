interface MentorProfileCardProps {
  name: string;
  job: string;
  career: string;
  imageUrl?: string;
}

export const MentorProfileCard = ({ name, job, career, imageUrl }: MentorProfileCardProps) => (
  <div className="mentor-profile-card">
    <img src={imageUrl || "/images/profile 1.png"} alt="프로필" className="profile-img" />
    <div>
      <p className="mentor-name">{name}</p>
      <p className="mentor-info">
        직무: {job} <br />경력: {career}
      </p>
    </div>
    <button className="mentor-profile-button">멘토 프로필 보기</button>
  </div>
);