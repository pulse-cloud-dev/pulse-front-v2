import { StepProps } from "./type/stepstype";

export const OneStep: React.FC<StepProps> = ({ onNext, onPrev }) => (
  <div>
    <button onClick={onPrev} disabled>
      첫번쨰 스탭
    </button>
    <button onClick={onNext}>Next</button>
  </div>
);
