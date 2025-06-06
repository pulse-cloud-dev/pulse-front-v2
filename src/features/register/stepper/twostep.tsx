import { StepProps } from "./type/stepstype";

export const TwoStep: React.FC<StepProps> = ({ onNext, onPrev }) => (
  <div>
    <h2>Step Two</h2>
    <button onClick={onPrev}>Previous</button>
    <button onClick={onNext}>Next</button>
  </div>
);
