import { useState, useMemo } from "react";
import { useStack, createInitialJobSchema, createInitialCareerSchema, createInitialEducationSchema, createInitialCertificateSchema } from "./formsections/stack";
import { RegisterView } from "./register.view";
import { RegisterSchema } from "./formsections/stack";
import { useModal } from "@/shared/modules";
import { Stepper } from "./stepper/stepper";

export const RegisterContainer = () => {
  const jobState = useStack<RegisterSchema>(createInitialJobSchema);
  const careerState = useStack<RegisterSchema>(createInitialCareerSchema);
  const educationState = useStack<RegisterSchema>(createInitialEducationSchema);
  const certificateState = useStack<RegisterSchema>(createInitialCertificateSchema);

  const [introduction, setIntroduction] = useState<string>("");

  const stepper = useModal(Stepper);

  // 모든 스택의 상태가 'success'인지 확인하는 computed state
  const allStacksValid = useMemo(() => {
    const checkStackStatus = (stacks: RegisterSchema[]): boolean => {
      return stacks.every((stack) => Object.values(stack).every((field) => field.status === "success"));
    };

    return checkStackStatus(jobState.stacks) && checkStackStatus(careerState.stacks) && checkStackStatus(educationState.stacks) && checkStackStatus(certificateState.stacks);
  }, [jobState.stacks, careerState.stacks, educationState.stacks, certificateState.stacks]);

  return (
    <RegisterView
      job={jobState}
      career={careerState}
      education={educationState}
      certificate={certificateState}
      introduction={{ introduction, setIntroduction }}
      isValid={allStacksValid}
      onCancel={() => {
        console.log("Registration cancelled");
      }}
      onSubmit={() => {
        stepper.openModal();
      }}
    />
  );
};
