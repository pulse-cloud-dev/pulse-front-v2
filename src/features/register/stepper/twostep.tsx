import { StepProps } from "./type/stepstype";
import { BaseButton, Typography } from "@/shared/components";
import { HTMLAttributes, PropsWithChildren } from "react";
import { useSchedule } from "./schedulecontext/context";
// FooterProps 타입 정의
interface FooterProps extends HTMLAttributes<HTMLElement>, PropsWithChildren {
  onPrev: () => void;
  onNext: () => void;
}

// Footer 컴포넌트 정의

const Footer = ({ className = "", children, onPrev, onNext, ...restProps }: FooterProps) => {
  return (
    <footer className={`popup--online__footer ${className}`} {...restProps}>
      <div style={{ marginLeft: "auto", display: "flex", gap: "8px", marginTop: "16px" }}>
        <BaseButton color="reverse" onClick={onPrev}>
          나중에
        </BaseButton>
        <BaseButton color="primary" onClick={onNext}>
          지금등록
        </BaseButton>
      </div>
    </footer>
  );
};

interface BodyProps extends HTMLAttributes<HTMLDivElement>, PropsWithChildren {
  onNext: () => void;
}

const Body = (props: BodyProps) => {
  const { className, children, onNext, ...restProps } = props;
  const { schedule, dispatch } = useSchedule();

  const week = ["월", "화", "수", "목", "금", "토", "일"];
  schedule.region;
  return (
    <>
      <Typography>강의 형식 선택</Typography>
      <div style={{ display: "flex", gap: "8px", justifyItems: "center", marginTop: "10px", marginBottom: "10px" }}>
        <BaseButton
          size="lg"
          style={{ flex: 1 }}
          color={schedule.mode ? "primary" : "reverse"}
          onClick={() => {
            if (!schedule.mode) {
              dispatch({ type: "TOGGLE_ONLINE_OFFLINE_MODE" });
            }
          }}
        >
          온라인
        </BaseButton>
        <BaseButton
          size="lg"
          style={{ flex: 1 }}
          color={!schedule.mode ? "primary" : "reverse"}
          onClick={() => {
            if (schedule.mode) {
              dispatch({ type: "TOGGLE_ONLINE_OFFLINE_MODE" });
            }
          }}
        >
          오프라인
        </BaseButton>
      </div>
      {schedule.mode === false && (
        <div className="popup--step2__body_bottm" style={{ marginBottom: "10px" }}>
          <Typography>지역 선택</Typography>
          <div
            onClick={onNext}
            style={{
              padding: "10px",
              width: "100%",
              height: "48px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              cursor: "pointer",
            }}
          >
            {Array.from(schedule.region)
              .map((region) => `${region.city}>${region.district}`)
              .join(", ")}
          </div>
        </div>
      )}
      <div className="popup--step2__body_bottm">
        <Typography>멘토링 가능 요일</Typography>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "6px", marginTop: "10px", marginBottom: "10px" }}>
          {week.map((day, index) => {
            const isSelected = schedule?.days.has(day);
            return (
              <BaseButton
                style={{ flex: 1 }}
                size="lg"
                key={`day-${index}`}
                color={isSelected ? "primary" : "reverse"}
                onClick={() => {
                  dispatch({
                    type: isSelected ? "DELETE_SCHEDULE_DATE" : "UPDATE_SCHEDULE_DATE",
                    payload: day,
                  });
                }}
              >
                {day}
              </BaseButton>
            );
          })}
        </div>
      </div>
    </>
  );
};

export const TwoStep: React.FC<StepProps> = ({ onNext, onPrev }) => {
  return (
    <div>
      <div className="modal_box on">
        <div className={`popup--step2__body`}>
          <Body onNext={onNext} />
          <Footer onNext={onNext} onPrev={onPrev} style={{ borderTop: "1px solid #eee", marginBottom: "16px" }} />
        </div>
      </div>
    </div>
  );
};
