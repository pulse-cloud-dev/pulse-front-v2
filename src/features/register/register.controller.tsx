import { useState } from "react";
import { useStack, createInitialJobSchema, createInitialCareerSchema, createInitialEducationSchema, createInitialCertificateSchema } from "./formsections/stack";
import { RegisterView } from "./register.view";
import { RegisterSchema } from "./formsections/stack";
import { useModal, Modal } from "@/shared/modules";
import { Stepper } from "./stepper/stepper";

export const RegisterContainer = () => {
  const jobState = useStack<RegisterSchema>(createInitialJobSchema);
  const careerState = useStack<RegisterSchema>(createInitialCareerSchema);
  const educationState = useStack<RegisterSchema>(createInitialEducationSchema);
  const certificateState = useStack<RegisterSchema>(createInitialCertificateSchema);

  const [introduction, setIntroduction] = useState<string>("");

  const stepper = useModal(Modal, {
    title: "분야",
    variant: "default",
    children: <Stepper />,
  });

  return (
    <RegisterView
      job={jobState}
      career={careerState}
      education={educationState}
      certificate={certificateState}
      introduction={{ introduction, setIntroduction }}
      onCancel={() => {
        console.log("Registration cancelled");
      }}
      onSubmit={() => {
        stepper.openModal();
      }}
    />
  );
};
