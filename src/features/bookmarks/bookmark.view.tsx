import type { ViewEventProps } from "@/shared/types";
import { PageNation } from "@/shared/components/widgets";
import { MentorCard } from "@/shared/components/blocks";
import { Typography } from "@/shared/components/atoms";

interface Props extends ViewEventProps {
  count: number;
  cards: {
    id: string;
    title: string;
    type: "online" | "offline";
    region?: string;
  }[];
}

export const BookmarkView = ({ count, cards }: Props) => {
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
        {cards.length === 0 ? (
          <Typography size="14">북마크한 카드가 없습니다.</Typography>
        ) : (
          cards.map((card) => (
            <MentorCard
              key={card.id}
              id={card.id}
              title={card.title}
              type={card.type}
              region={card.region}
            />
          ))
        )}
      </section>

      <section className="m-t-72 m-b-70">
        <PageNation queryStringKey={"offset"} pages={Math.ceil(count / 30)} />
      </section>
    </article>
  );
};

