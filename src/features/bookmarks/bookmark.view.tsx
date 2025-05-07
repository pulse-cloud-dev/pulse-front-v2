import type { ViewEventProps } from "@/shared/types";
import { PageNation } from "@/shared/components/widgets";
import { MentorCard } from "@/shared/components/blocks";
import { Typography } from "@/shared/components/atoms";

interface Props extends ViewEventProps {}

export const BookmarkView = (props: Props) => {
  const { count } = props;
  return (
    <article className="sub-layout__content">
      <header>
        <Typography variant="title" size="24" weight="bold">
          북마크 목록
        </Typography>
      </header>

      <div className="m-t-30 m-b-10">
        <Typography variant="title" size="14" weight="bold">
          총 {count} 개
        </Typography>
      </div>
      <section className="flex__box">
        {Array.from({ length: 30 }).map((_, index) => (
          <MentorCard key={index} />
        ))}
      </section>

      <section className="m-t-72 m-b-70">
        <PageNation queryStringKey={"offset"} pages={10} />
      </section>
    </article>
  );
};
