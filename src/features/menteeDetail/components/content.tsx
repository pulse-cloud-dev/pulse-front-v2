import { useParams } from "react-router-dom";
import { useMentoringDetailQuery } from "@/features/menteeDetail";

export const MentoringContent = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useMentoringDetailQuery(id || "");

  if (!data) return null;

  const content = data.content || "내용이 없습니다.";
  const truncated = content.slice(0, 3000);

  return (
    <section className="mentoring-content-section">
      <div className="mentoring-content-scroll-box">
        <p style={{ whiteSpace: "pre-line" }}>{truncated}</p>
      </div>
    </section>
  );
};
