interface MentoringContentSectionProps {
  title: string;
  children: string | React.ReactNode;
}

export const MentoringContent = ({ title, children }: MentoringContentSectionProps) => {
  const truncated =
    typeof children === "string"
      ? children.slice(0, 3000)
      : children;

  return (
    <section className="mentoring-content-section">
      <h2>{title}</h2>
      <div className="mentoring-content-scroll-box">
        <p style={{ whiteSpace: "pre-line" }}>{truncated}</p>
      </div>
    </section>
  );
};