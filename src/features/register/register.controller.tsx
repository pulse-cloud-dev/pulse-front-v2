import { useState, useMemo } from "react";
import { useStack, createInitialJobSchema, createInitialCareerSchema, createInitialEducationSchema, createInitialCertificateSchema } from "./formsections/stack";
import { RegisterView } from "./register.view";
import { RegisterSchema } from "./formsections/stack";
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
    const year = date.getFullYear().toString().slice(-2); // 마지막 두 자리
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };
  const positionHash: { [key: string]: string } = {
    팀원: "TEAM_MEMBER",
    파트장: "PART_LEADER",
    팀장: "TEAM_LEADER",
    실장: "DIRECTOR",
    그룹장: "GROUP_LEADER",
    센터장: "CENTER_HEAD",
    매니저: "MANAGER",
    본부장: "HEAD_OF_DIVISION",
    사업부장: "BUSINESS_UNIT_HEAD",
    국장: "DIRECTOR_GENERAL",
  };
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
  const educationLevelHash: { [key: string]: string } = {
    "대학교(4학년)": "UNDERGRADUATE_4",
    "대학교(2,3학년)": "UNDERGRADUATE_2",
    " 대학원(박사)": "DOCTORATE",
    " 대학원(석사)": "MASTER",
    기타: "OTHER",
  };

  const educationStatusHash: { [key: string]: string } = {
    재학중: "ENROLLED",
    졸업: "GRADUATED",
    졸업예정: "EXPECTED_GRADUATION",
    중퇴: "DROPPED_OUT",
    휴학: "ON_LEAVE",
  };
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
  const jobCodeHash: { [key: string]: string } = {
    // 기획/경영/마케팅
    마케팅: "MARKETING",
    기획: "PLANNING",
    경영: "MANAGEMENT",
    
    // 게임
    게임프로그래밍: "GAME_PROGRAMMING",
    게임기획: "GAME_PLANNING",
    게임디자인: "GAME_DESIGN",
    
    // 디자인
    "UI/UX": "UIUX",
    "3D": "3D",
    그래픽: "GRAPHICS",
    
    // 개발
    프론트엔드: "FRONTEND",
    백엔드: "BACKEND",
    풀스택: "FULLSTACK",
    모바일앱: "MOBILE_APP",
    퍼블리싱: "PUBLISHING",
    "데브옵스/인프라": "DEVOPS_INFRA",
    
    // 데이터
    데이터분석: "DATA_ANALYSIS",
    데이터엔지니어링: "DATA_ENGINEERING",
    데이터사이언스: "DATA_SCIENCE",
    
    // 보안/네트워크
    블록체인: "BLOCKCHAIN",
    보안: "SECURITY",
    네트워크: "NETWORK",
    운영체제: "OPERATING_SYSTEM",
    클라우드: "CLOUD",
    
    // 하드웨어
    로봇: "ROBOT",
    IOT: "IOT",
    반도체: "SEMICONDUCTOR",
    컴퓨터: "COMPUTER",
    모빌리티: "MOBILITY",
    
    // 인공지능
    GPT: "GPT",
    "딥러닝/머신러닝": "DEEP_MACHINE_LEARNING",
    
    // 기타 카테고리들
    "기획/경영/마케팅 기타": "PLANNING_MANAGEMENT_MARKETING_ETC",
    "게임 기타": "GAME_ETC",
    "디자인 기타": "DESIGN_ETC",
    "개발 기타": "DEVELOPMENT_ETC",
    "데이터 기타": "DATA_ETC",
    "보안/네트워크 기타": "SECURITY_NETWORK_ETC",
    "하드웨어 기타": "HARDWARE_ETC",
    "인공지능 기타": "AI_ETC"
  };

  const mapJobStackToRawDto = (jobStack: RegisterSchema) => ({
    job_code: jobStack.jobDetail.value,
  });

  const mapJobRawDtoToFinalDto = (jobDto: any) => ({
    job_code: jobCodeHash[jobDto.job_code] || "OTHER",
  });
  console.log("??", stacks.map(mapJobStackToRawDto));
  return stacks.map(mapJobStackToRawDto).map(mapJobRawDtoToFinalDto)[0];
};

const mapCertificationStacksToDto = (stacks: RegisterSchema[]): any[] => {
  const mapCertificationStackToRawDto = (certificateStack: RegisterSchema) => ({
    certificate_name: certificateStack.certificateName,
    issuer: certificateStack.issuer,
    pass_status: certificateStack.passStatus,
    pass_date: certificateStack.passDate,
  });

  const certificationHash: { [key: string]: string } = {
    필기합격: "WRITTEN_PASS",
    최종합격: "FINAL_PASS",
  };

  const mapCertificationRawDtoToFinalDto = (Dto: any) => ({
    certificate_name: Dto.certificate_name.value,
    issuer: Dto.issuer.value,
    pass_status: certificationHash[Dto.pass_status.value],
    pass_date: formatDateToISO(Dto.pass_date.value),
  });
  return stacks.map(mapCertificationStackToRawDto).map(mapCertificationRawDtoToFinalDto);
};
