import { MentorCard, PopupSearch, BaseDrawer, Map, } from "@/shared/components/blocks";
import { useState } from "react";

// 지도 탭
export const MentorViewMap = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <section
      className="m-t-30"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          background: "lightgray",
          height: "750px",
          borderRadius: "18px",
          border: "1px solid #e0e0e0",
        }}
      >
        <Map />
      </div>

      <div
        className="flex_r gap_6"
        style={{ position: "absolute", top: "16px", left: "16px" }}
      >
        <PopupSearch title="분야" openPopup={event?.openFirstModal} />
        <PopupSearch title="온/오프라인" openPopup={event?.openSecondModal} />
        <PopupSearch title="지역" openPopup={event?.openThirdModal} />
      </div>

      <BaseDrawer isOpen={isDrawerOpen} onToggle={handleDrawerToggle}>
        <div className="flex_dcol_jbet gap_10">
          {Array.from({ length: 5 }).map((_, index) => (
            <MentorCard key={index} />
          ))}
        </div>
      </BaseDrawer>
    </section>
  );
};