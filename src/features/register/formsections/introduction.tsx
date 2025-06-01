interface IntroductionProps {
  introduction: string;
  setIntroduction: (value: string) => void;
}

export const Introduction: React.FC<IntroductionProps> = ({ introduction, setIntroduction }) => {
  return (
    <section style={{ width: "100%", margin: "20px auto", padding: "10px" }}>
      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "12px",
          color: "#333",
        }}
      >
        멘토 소개
      </h3>
      <textarea
        placeholder="멘토 소개글을 작성하세요"
        value={introduction}
        onChange={(e) => setIntroduction(e.target.value)}
        style={{
          width: "100%",
          minHeight: "120px",
          padding: "12px",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          resize: "vertical",
          boxSizing: "border-box",
          fontFamily: "inherit",
          color: "#333",
        }}
      />
    </section>
  );
};
