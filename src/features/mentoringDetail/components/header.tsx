import { SquareBadge } from "@/shared/components";

interface MentoringHeaderSectionProps {
  title: string;
  region: string;
  lectureType: "ONLINE" | "OFFLINE";
}

export const MentoringHeader = ({
  title,
  region,
  lectureType,
}: MentoringHeaderSectionProps) => {
  const badgeColor = lectureType === "ONLINE" ? "blue" : "orange"; // ✅ 조건부 색상
  const badgeTitle = lectureType === "ONLINE" ? "온라인" : region || "주소 없음";
  
  return (
    <div>
      <SquareBadge title={badgeTitle} color={badgeColor} />
      <h1 className="mentoring-detail-title">{title || "제목 없음"}</h1>
    </div>
  );
};