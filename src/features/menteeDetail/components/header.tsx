import { SquareBadge } from "@/shared/components";
import { useParams } from "react-router-dom";
import { useMentoringDetailQuery } from "@/features/menteeDetail";

export const MentoringHeader = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useMentoringDetailQuery(id || "");

  if (!data) return null;

  const { title, region, lecture_type } = data;

  const badgeColor = lecture_type === "ONLINE" ? "blue" : "orange";
  const badgeTitle = lecture_type === "ONLINE" ? "온라인" : region || "주소 없음";

  return (
    <div>
      <SquareBadge title={badgeTitle} color={badgeColor} />
      <h1 className="mentoring-detail-title">{title || "제목 없음"}</h1>
    </div>
  );
};
