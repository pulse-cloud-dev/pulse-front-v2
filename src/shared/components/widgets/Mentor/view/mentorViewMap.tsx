import { FilterBar } from "../filters/filterBar";
import {
  Map,
  MentorCard,
  BaseDrawer,
} from "@/shared/components/blocks";
import { useState } from "react";
import type { FilterProps } from "../type/filterProps";

export const MentorViewMap = (props: FilterProps & { sortOption: string; setSortOption: (val: string) => void }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  return (
    <section className="m-t-30" style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ background: "lightgray", height: "750px", borderRadius: "18px", border: "1px solid #e0e0e0" }}>
        <Map />
      </div>
      <div style={{ position: "absolute", top: "16px", left: "16px" }}>
        <FilterBar {...props} />
      </div>
      <BaseDrawer isOpen={isDrawerOpen} onToggle={() => setIsDrawerOpen(!isDrawerOpen)}>
        <div className="flex_dcol_jbet gap_10">
          {Array.from({ length: 5 }).map((_, index) => (
            <MentorCard key={index} />
          ))}
        </div>
      </BaseDrawer>
    </section>
  );
};