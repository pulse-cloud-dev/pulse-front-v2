import { Typography } from "@/shared/components";
import { Job, Career, Education, Certificate, Introduction } from "./formsections";
export const RegisterView = (props: any) => {
  return (
    <article className="sub-layout__content">
      <header>
        <Typography variant="title" size="24" weight="bold">
          멘토 등록
        </Typography>
      </header>
      <section className="m-t-50">
        <Job />
        <Career />
        <Education />
        <Certificate />
        <Introduction />
      </section>
      <button>취소</button>
      <button>성공</button>
    </article>
  );
};
