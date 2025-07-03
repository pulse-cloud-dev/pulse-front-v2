import { useState, useMemo } from "react";
import { useStack, createInitialJobSchema, createInitialCareerSchema, createInitialEducationSchema, createInitialCertificateSchema } from "./formsections/stack";
import { RegisterView } from "./register.view";
import { RegisterSchema } from "./formsections/stack";
import { useRegisterMentor } from "./register.service";
import { queryClient } from "@/app/contexts";

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
        console.log("Registration cancelled", {
          academic_info_list: mapEducationStacksToDto(educationState.stacks),
          certificate_info_list: mapCertificationStacksToDto(certificateState.stacks),
          job_info: mapJobStacksToDto(jobState.stacks),
          career_info_list: mapCareerStacksToDto(careerState.stacks),
          mentor_introduction: introduction,
        });
      }}
      onSubmit={() => {
        registerMentor.mutate({
          academic_info_list: mapEducationStacksToDto(educationState.stacks),
          certificate_info_list: mapCertificationStacksToDto(certificateState.stacks),
          job_info: mapJobStacksToDto(jobState.stacks),
          career_info_list: mapCareerStacksToDto(careerState.stacks),
          mentor_introduction: introduction,
        });
      }}
    />
  );
};
// 날짜를 ISO 문자열로 변환하는 함수
const formatDateToISO = (date: Date | null): string => {
  if (!date) return "";
  return date.toISOString();
};

const mapCareerStacksToDto = (stacks: RegisterSchema[]): any[] => {
  const mapCareerStackToRawDto = (careerStack: RegisterSchema) => ({
    company_name: careerStack.company,
    department: careerStack.department,
    position: careerStack.role,
    join_date: careerStack.startDate,
    retire_date: careerStack.endDate,
    is_working: careerStack.isWorking,
  });
  const formatDateToYYMMDD = (date: Date | null): string => {
    if (!date) return "";
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const roleLevelList = queryClient.getQueryData(["roleLevels"]) as {
    name: string;
    description: string;
  }[];

  const positionHash: { [key: string]: string } = Object.fromEntries(roleLevelList?.map((item) => [item.description, item.name]) || []);
  const mapCareerRawDtoToFinalDto = (careerDto: any) => ({
    company_name: careerDto.company_name.value,
    department: careerDto.department.value, //해싱처리 하기
    position: positionHash[careerDto.position.value],
    join_date: formatDateToYYMMDD(careerDto.join_date.value),
    retire_date: formatDateToYYMMDD(careerDto.retire_date.value),
    is_working: careerDto.is_working.value,
  });
  return stacks.map(mapCareerStackToRawDto).map(mapCareerRawDtoToFinalDto);
};

const mapEducationStacksToDto = (stacks: RegisterSchema[]): any[] => {
  const educationLevelList = queryClient.getQueryData(["educationLevels"]) as {
    name: string;
    description: string;
  }[];
  const educationStatusList = queryClient.getQueryData(["educationStatuses"]) as {
    name: string;
    description: string;
  }[];
  const educationLevelHash: { [key: string]: string } = Object.fromEntries(educationLevelList?.map((item) => [item.description, item.name]) || []);

  const educationStatusHash: { [key: string]: string } = Object.fromEntries(educationStatusList?.map((item) => [item.description, item.name]) || []);
  const mapEducationStackToRawDto = (educationStack: RegisterSchema) => ({
    education_level: educationStack.schoolType,
    school_name: educationStack.schoolName,
    major: educationStack.major,
    education_status: educationStack.graduationStatus,
    admission_date: educationStack.admissionDate,
    graduation_date: educationStack.graduationDate,
  });
  // raw DTO -> 최종 API DTO
  const mapRawDtoToFinalDto = (academicDto: any) => ({
    education_level: educationLevelHash[academicDto.education_level.value || academicDto.education_level] || "",
    school_name: academicDto.school_name?.value || academicDto.school_name || "",
    major: academicDto.major?.value || academicDto.major || "",
    education_status: educationStatusHash[academicDto.education_status?.value || academicDto.education_status] || "",
    admission_date: formatDateToISO(academicDto.admission_date?.value),
    graduation_date: formatDateToISO(academicDto.graduation_date?.value),
  });

  return stacks.map(mapEducationStackToRawDto).map(mapRawDtoToFinalDto);
};

const mapJobStacksToDto = (stacks: RegisterSchema[]): any => {
  const categoryItemMetaList = queryClient.getQueryCache().findAll({
    predicate: (query) => query.queryKey[0] === "categoryItemMetaList",
  });
  const jobCodeHash: Record<string, string> = {};

  categoryItemMetaList.forEach((query) => {
    const data = query.state.data;
    if (data && Array.isArray(data)) {
      data.forEach((item) => {
        if (item.name && item.code) {
          jobCodeHash[item.name] = item.code;
        }
      });
    }
  });

  const mapJobStackToRawDto = (jobStack: RegisterSchema) => ({
    job_code: jobStack.jobDetail.value,
  });

  const mapJobRawDtoToFinalDto = (jobDto: any) => ({
    job_code: jobCodeHash[jobDto.job_code] || "OTHER",
  });
  return stacks.map(mapJobStackToRawDto).map(mapJobRawDtoToFinalDto)[0];
};

const mapCertificationStacksToDto = (stacks: RegisterSchema[]): any[] => {
  const mapCertificationStackToRawDto = (certificateStack: RegisterSchema) => ({
    certificate_name: certificateStack.certificateName,
    issuer: certificateStack.issuer,
    pass_status: certificateStack.passStatus,
    pass_date: certificateStack.passDate,
  });

  const passStatusList = queryClient.getQueryData(["pass-status"]) as {
    name: string;
    description: string;
  }[];

  const certificationHash = Object.fromEntries(passStatusList.map((item) => [item.description, item.name]));

  const mapCertificationRawDtoToFinalDto = (Dto: any) => ({
    certificate_name: Dto.certificate_name.value,
    issuer: Dto.issuer.value,
    pass_status: certificationHash[Dto.pass_status.value],
    pass_date: formatDateToISO(Dto.pass_date.value),
  });
  return stacks.map(mapCertificationStackToRawDto).map(mapCertificationRawDtoToFinalDto);
};
