interface MentoringContentSectionProps {
  content: string;
}

export const MentoringContent = ({ content }: MentoringContentSectionProps) => {
  const truncated = content.slice(0, 3000);

  return (
    <section className="mentoring-content-section">
      <div className="mentoring-content-scroll-box">
        <p style={{ whiteSpace: "pre-line" }}>{truncated}</p>
      </div>
    </section>
  );
};