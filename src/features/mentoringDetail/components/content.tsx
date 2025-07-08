interface MentoringContentSectionProps {
  title: string;
  children: React.ReactNode;
}

export const MentoringContent = ({ title, children }: MentoringContentSectionProps) => (
  <section className="mentoring-content-section">
    <h2>{title}</h2>
    {children}
  </section>
);