import { SquareBadge } from "@/shared/components";

interface MentoringHeaderSectionProps {
  title: string;
}

interface MentoringContentSectionProps {
  title: string;
  children: React.ReactNode;
}

interface MentorProfileCardProps {
  name: string;
  job: string;
  career: string;
  imageUrl?: string;
}

interface MentoringMetaCardProps {
  price: number;
  period: string;
  location: string;
  deadline: string;
  count: string;
}

interface MentorDetailViewProps {
  title: string;
  region: string;
  content: string;
  mentorName: string;
  mentorJob: string;
  mentorCareer: string;
  price: number;
  period: string;
  location: string;
  deadline: string;
  count: string;
}

const MentoringContentSection = ({ title, children }: MentoringContentSectionProps) => (
  <section className="mentoring-content-section">
    <h2>{title}</h2>
    {children}
  </section>
);

const MentorProfileCard = ({ name, job, career, imageUrl }: MentorProfileCardProps) => (
  <div className="mentor-profile-card">
    <img src={imageUrl || "/profile.png"} alt="프로필" className="profile-img" />
    <div>
      <p className="mentor-name">{name}</p>
      <p className="mentor-info">
        직무: {job} <br />경력: {career}
      </p>
    </div>
    <button className="mentor-profile-button">멘토 프로필 보기</button>
  </div>
);

const MentoringMetaCard = ({ price, period, location, deadline, count }: MentoringMetaCardProps) => (
  <div className="mentoring-meta-card">
    <p className="price">{price.toLocaleString("ko-KR")}원</p>
    <ul className="meta-list">
      <li>
        <span className="mentoring-label">멘토링 기간</span>
        <span className="value">{period}</span>
      </li>
      <li>
        <span className="mentoring-label">멘토링 장소</span>
        <span className="value">{location}</span>
      </li>
      <li>
        <span className="mentoring-label">모집 마감</span>
        <span className="value">{deadline}</span>
      </li>
      <li>
        <span className="mentoring-label">모집 인원</span>
        <span className="value">{count}</span>
      </li>
    </ul>
    <div className="button-group">
      <button className="button-outline" type="button">문의하기</button>
      <button className="button-primary" type="button">신청하기</button>
    </div>
  </div>
);

export const MentorDetailView = ({
  title,
  region,
  content,
  mentorName,
  mentorJob,
  mentorCareer,
  price,
  period,
  location,
  deadline,
  count,
}: MentorDetailViewProps) => {
  return (
    <div className="mentoring-detail">
      <div className="mentoring-content-wrapper">

        {/* 멘토링 내용 */}
        <div className="mentoring-content">
          <div className="mentoring-detail-title-wrapper">
            <div className="left">
              <SquareBadge title={region || "주소 없음"} />
              <h1 className="mentoring-detail-title">{title || "제목 없음"}</h1>
            </div>
            <div className="right">
              <button className="bookmark-button" type="button">북마크</button>
              <button className="share-button" type="button">공유</button>
            </div>
          </div>

          <MentoringContentSection title="멘토링 소개">
            <p style={{ whiteSpace: "pre-line" }}>{content || "내용이 없습니다."}</p>
          </MentoringContentSection>
        </div>

        {/* 기타 정보 */}
        <aside className="mentoring-sidebar">
          <MentorProfileCard
            name={mentorName || "이름 없음"}
            job={mentorJob || "직무 정보 없음"}
            career={mentorCareer || "경력 정보 없음"}
          />

          <MentoringMetaCard
            price={price || 0}
            period={period || "기간 정보 없음"}
            location={location || "장소 정보 없음"}
            deadline={deadline || "마감일 정보 없음"}
            count={count || "0/0"}
          />
        </aside>

      </div>
    </div>
  );
};
