import { useState } from "react";
import { OneStep } from "./onestep";
import { TwoStep } from "./twostep";
import { ThreeStep } from "./threestep";
import { ScheduleProvider } from "./schedulecontext/context";
type Step = "one" | "two" | "three";

import { ModalProps } from "@/shared/modules";

export const Stepper = (props: ModalProps) => {
  const { closeModal, id } = props;
  const [step, setStep] = useState<Step>("one");

  const goNext = () => {
    if (step === "one") setStep("two");
    else if (step === "two") setStep("three");
  };

  const goPrev = () => {
    if (step === "three") setStep("two");
    else if (step === "two") setStep("one");
  };
  const oneprev = () => {
    if (id && closeModal) {
      closeModal(id as string);
    }
  };
  return (
    <div className="step_layout">
      <ScheduleProvider>
        {step === "one" && <OneStep onNext={goNext} onPrev={oneprev} />}
        {step === "two" && <TwoStep onNext={goNext} onPrev={goPrev} />}
        {step === "three" && <ThreeStep onNext={goNext} onPrev={goPrev} />}
      </ScheduleProvider>
    </div>
  );
};
