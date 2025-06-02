interface IntroductionProps {
  introduction: string;
  setIntroduction: (value: string) => void;
}
import { Typography } from "@/shared/components";
export const Introduction: React.FC<IntroductionProps> = ({ introduction, setIntroduction }) => {
  return (
    <section style={{ width: "100%", margin: "24px auto" }}>
      <Typography weight="semi-bold"> 멘토 소개</Typography>
      <div className="textarea-introduction-wrapper">
        <textarea className="textarea-introduction" placeholder="멘티가 멘토님을 더 잘 이해할 수 있도록, 경험과 전문 분야를 소개해 주세요." value={introduction} onChange={(e) => setIntroduction(e.target.value)} />
      </div>
    </section>
  );
};
