import React from "react";
import { Typography } from "@/shared/components";
import { Job, Career, Education, Certificate, Introduction } from "./formsections";
import { RegisterSchema, UseStackReturn } from "./formsections/stack";
import { BaseButton } from "@/shared/components";

interface IntroductionState {
  introduction: string;
  setIntroduction: (value: string) => void;
}

// RegisterView Props 타입
export interface RegisterViewProps {
  isValid: boolean;
  job: UseStackReturn<RegisterSchema>;
  career: UseStackReturn<RegisterSchema>;
  education: UseStackReturn<RegisterSchema>;
  certificate: UseStackReturn<RegisterSchema>;
  introduction: IntroductionState;
  onCancel: () => void;
  onSubmit: () => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ job, career, education, certificate, introduction, onCancel, onSubmit, isValid }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <article className="sub-layout__content">
      <Typography variant="title" size="24" weight="bold">
        멘토 등록
      </Typography>

      <form className="m-t-50" onSubmit={handleSubmit}>
        <Job {...job} />
        {/*재직중이면 퇴사년도 검증 스킵 */}
        <Career {...career} />
        {/*검증 필요x */}
        <Education {...education} />
        {/*졸업여부가 졸업이 아니면 졸업연월 검증 스킵*/}
        <Certificate {...certificate} />
        <Introduction {...introduction} />
        <footer className="m-t-30 flex_r flex_jend gap_4">
          <BaseButton color="reverse">취소</BaseButton>
          <BaseButton className={isValid ? "primary" : "reverse"} type="submit">
            신청
          </BaseButton>
        </footer>
      </form>
    </article>
  );
};
