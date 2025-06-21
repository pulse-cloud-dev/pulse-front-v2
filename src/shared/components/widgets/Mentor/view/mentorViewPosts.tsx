import { FilterBar } from "../filters/filterBar";
import { Typography, Icon } from "@/shared/components/atoms";
import { SortDropdown } from "@/shared/components/widgets/sortDropdown/SortDropdown";
import { MentorCard } from "@/shared/components/blocks";
import { PageNation } from "@/shared/components/widgets";
import { FilterProps } from "../type/filterProps";

export const MentorViewPosts = (props: FilterProps & { sortOption: string; setSortOption: (val: string) => void }) => {
  const { sortOption, setSortOption } = props;
  const cards = Array.from({ length: 10 });

  return (
    <>
      <FilterBar {...props} />
      <div className="card-count">
        <Typography variant="body" size="16" weight="semi-bold">
          총 {cards.length}개
        </Typography>
        <SortDropdown sortOption={sortOption} setSortOption={(val) => {
    setSortOption(val);
  }} />
      </div>
      <section className="flex__box m-t-10">
        {cards.map((_, index) => (
          <MentorCard key={index} />
        ))}
      </section>
      <section className="m-t-72 m-b-70">
        <PageNation queryStringKey="offset" pages={10} />
      </section>
    </>
  );
};
