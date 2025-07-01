import { useState, useMemo } from "react";
import { useStack, createInitialJobSchema, createInitialCareerSchema, createInitialEducationSchema, createInitialCertificateSchema } from "./formsections/stack";
import { RegisterView } from "./register.view";
import { RegisterSchema } from "./formsections/stack";
// import { useModal } from "@/shared/modules";
// import { Stepper } from "./stepper/stepper";
import { useRegisterMentor } from "./register.service";

export const RegisterContainer = () => {
  const jobState = useStack<RegisterSchema>(createInitialJobSchema);
  const careerState = useStack<RegisterSchema>(createInitialCareerSchema);
  const educationState = useStack<RegisterSchema>(createInitialEducationSchema);
  const certificateState = useStack<RegisterSchema>(createInitialCertificateSchema);

  const [introduction, setIntroduction] = useState<string>("");
  const allStacksValid = useMemo(() => {
    const checkStackStatus = (stacks: RegisterSchema[], skipFields?: (stack: RegisterSchema) => string[], stackName?: string): boolean => {
      let isValid = true;

      stacks.forEach((stack, index) => {
        const fieldsToSkip = skipFields ? skipFields(stack) : [];

        Object.entries(stack).forEach(([fieldKey, field]) => {
          if (fieldsToSkip.includes(fieldKey)) return;

          if (field.status !== "success") {
            isValid = false;
            console.log(`[Invalid Field] Stack: ${stackName}, Index: ${index}, Field: ${fieldKey}, Status: ${field.status}`);
          }
        });
      });

      return isValid;
    };

    const careerValid = checkStackStatus(
      careerState.stacks,
      (stack) => {
        const skipFields: string[] = [];
        if (stack.isWorking?.value === true) {
          skipFields.push("퇴사 년월");
        }
        return skipFields;
      },
      "Career"
    );

    const educationValid = checkStackStatus(
      educationState.stacks,
      (stack) => {
        const skipFields: string[] = [];
        const graduationStatus = stack.graduationStatus?.label;
        if (graduationStatus && !["졸업", "졸업예정"].includes(graduationStatus)) {
          skipFields.push("졸업연월");
        }
        return skipFields;
      },
      "Education"
    );

    const certificateValid = checkStackStatus(certificateState.stacks, undefined, "Certificate");

    const jobValid = checkStackStatus(jobState.stacks, undefined, "Job");

    return careerValid && educationValid && certificateValid && jobValid;
  }, [jobState.stacks, careerState.stacks, educationState.stacks, certificateState.stacks]);

  const registerMentor = useRegisterMentor();

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
        registerMentor.mutate({
          academic_info_list: [
            {
              education_level: "UNDERGRADUATE_4",
              school_name: "서울대학교",
              major: "컴퓨터공학",
              education_status: "GRADUATED",
              admission_date: "2016-03-01T00:00:00",
              graduation_date: "2020-02-28T00:00:00",
            },
          ],
          certificate_info_list: [],
          job_info: {
            job_code: "JOB_DEV_PM",
          },
          career_info_list: [
            {
              company_name: "네이버",
              department: "개발부",
              position: "TEAM_LEADER",
              join_date: "202001",
              retire_date: "202312",
              is_working: false,
            },
            {
              company_name: "카카오",
              department: "플랫폼팀",
              position: "MANAGER",
              join_date: "202401",
              retire_date: "",
              is_working: true,
            },
          ],
          mentor_introduction: "안녕하세요. 백엔드 개발 경력 5년차 멘토입니다.",
        });
        // stepper.openModal();
      }}
    />
  );
};
