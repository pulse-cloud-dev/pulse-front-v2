import { SquareBadge } from "@/shared/components";

interface MentoringHeaderSectionProps {
  title: string;
  region: string;
}

export const MentoringHeader = ({ title, region }: MentoringHeaderSectionProps) => (
    <div>
      <SquareBadge title={region || "주소 없음"} />
      <h1 className="mentoring-detail-title">{title || "제목 없음"}</h1>
    </div>
);