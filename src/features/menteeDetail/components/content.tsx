import { useParams } from "react-router-dom";
import { useMentoringDetailQuery } from "@/features/menteeDetail";
import { convertFromRaw, EditorState, ContentState } from "draft-js";

export const MentoringContent = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useMentoringDetailQuery(id || "");

  if (!data) return null;

  let plainText = "내용이 없습니다.";

  try {
    const rawContent = JSON.parse(data.content);
    const contentState = convertFromRaw(rawContent);
    plainText = contentState.getPlainText("\n").slice(0, 3000); // 최대 3000자
  } catch (e) {
    console.warn("Draft.js content parse error:", e);
    plainText = "내용을 불러올 수 없습니다.";
  }

  return (
    <section className="mentoring-content-section">
      <div className="mentoring-content-scroll-box">
        <p style={{ whiteSpace: "pre-line" }}>{plainText}</p>
      </div>
    </section>
  );
};
