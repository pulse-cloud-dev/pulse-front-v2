export type EducationLevel = "UNDERGRADUATE_2" | "UNDERGRADUATE_4" | "MASTER" | "DOCTORATE";

export type EducationStatus = "GRADUATED" | "EXPECTED_GRADUATION" | "ENROLLED" | "DROPPED_OUT" | "ON_LEAVE";

export type PassStatus = "WRITTEN_PASS" | "FINAL_PASS";

export type RoleLevel = "TEAM_MEMBER" | "PART_LEADER" | "TEAM_LEADER" | "DIRECTOR" | "GROUP_LEADER" | "CENTER_HEAD" | "MANAGER" | "HEAD_OF_DIVISION" | "BUSINESS_UNIT_HEAD" | "DIRECTOR_GENERAL";

export interface AcademicInfoRequestDto {
  education_level: EducationLevel;
  school_name: string;
  major: string;
  education_status: EducationStatus;
  admission_date: string;
  graduation_date: string;
}

export interface CertificateInfoRequestDto {
  certificate_name: string;
  issuer: string;
  pass_status: PassStatus;
  pass_date: string;
}

export interface JobInfoRequestDto {
  job_code: string;
}

export interface CareerInfoRequestDto {
  company_name: string;
  department: string;
  position: RoleLevel;
  join_date: string;
  retire_date: string;
  is_working: boolean;
}

export interface MentoInfoRequestDto {
  academic_info_list: AcademicInfoRequestDto[];
  certificate_info_list: CertificateInfoRequestDto[];
  job_info: JobInfoRequestDto;
  career_info_list: CareerInfoRequestDto[];
  mentor_introduction: string;
}
