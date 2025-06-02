// RegisterView.tsx
import React from "react";
import { Typography } from "@/shared/components";
import { Job, Career, Education, Certificate, Introduction } from "./formsections";
import { RegisterSchema, UseStackReturn } from "./formsections/stack";

interface IntroductionState {
  introduction: string;
  setIntroduction: (value: string) => void;
}

// RegisterView Props 타입
export interface RegisterViewProps {
  job: UseStackReturn<RegisterSchema>;
  career: UseStackReturn<RegisterSchema>;
  education: UseStackReturn<RegisterSchema>;
  certificate: UseStackReturn<RegisterSchema>;
  introduction: IntroductionState;
  onCancel: () => void;
  onSubmit: () => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ job, career, education, certificate, introduction, onCancel, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <article className="sub-layout__content">
      <header>
        <Typography variant="title" size="24" weight="bold">
          멘토 등록
        </Typography>
      </header>

      <form className="m-t-50" onSubmit={handleSubmit}>
        <Job {...job} />
        <Career {...career} />
        <Education {...education} />
        <Certificate {...certificate} />
        <Introduction {...introduction} />

        <div className="form-actions">
          <button type="button" onClick={onCancel}>
            취소
          </button>
          <button type="submit">등록</button>
        </div>
      </form>
    </article>
  );
};
