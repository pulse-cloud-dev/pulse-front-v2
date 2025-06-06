import { StepProps } from "./type/stepstype";

export const ThreeStep: React.FC<StepProps> = ({ onNext, onPrev }) => (
  <div>
    <h2>Step Three</h2>
    <button onClick={onPrev}>Previous</button>
    <button onClick={onNext} disabled>
      Next
    </button>
  </div>
);
