import { useState } from "react";
import { OneStep } from "./onestep";
import { TwoStep } from "./twostep";
import { ThreeStep } from "./threestep";
type Step = "one" | "two" | "three";

export const Stepper = () => {
  const [step, setStep] = useState<Step>("one");

  const goNext = () => {
    if (step === "one") setStep("two");
    else if (step === "two") setStep("three");
  };

  const goPrev = () => {
    if (step === "three") setStep("two");
    else if (step === "two") setStep("one");
  };

  return (
    <>
      {step === "one" && <OneStep onNext={goNext} onPrev={goPrev} />}
      {step === "two" && <TwoStep onNext={goNext} onPrev={goPrev} />}
      {step === "three" && <ThreeStep onNext={goNext} onPrev={goPrev} />}
    </>
  );
};
