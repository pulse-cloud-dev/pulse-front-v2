import { StepProps } from "./type/stepstype";
import { BaseButton, Typography } from "@/shared/components";
import { HTMLAttributes, PropsWithChildren } from "react";
import { Modal } from "@/shared/modules";
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
      <div className="popup--online__footer--right">
        <BaseButton color="reverse" onClick={onPrev}>
          나중에
        </BaseButton>
        <BaseButton color="primary" onClick={onNext}>
          지금등록
        </BaseButton>
      </div>
      {children}
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
    <div className={`popup--online__body ${className}`} {...restProps}>
      <div className="mode-buttons">
        <BaseButton
          color={schedule.mode ? "default" : "reverse"}
          onClick={() => {
            if (!schedule.mode) {
              dispatch({ type: "TOGGLE_ONLINE_OFFLINE_MODE" });
            }
          }}
        >
          온라인
        </BaseButton>
        <BaseButton
          color={!schedule.mode ? "default" : "reverse"}
          onClick={() => {
            if (schedule.mode) {
              dispatch({ type: "TOGGLE_ONLINE_OFFLINE_MODE" });
            }
          }}
        >
          오프라인
        </BaseButton>
      </div>

      <div className="day-buttons">
        {week.map((day, index) => {
          const isSelected = schedule?.days.has(day);
          return (
            <BaseButton
              key={`day-${index}`}
              color={isSelected ? "default" : "reverse"}
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
      <ul>
        {Array.from(schedule.region).map((region, index) => (
          <li key={index}>
            <strong>{region.city}</strong> - {region.district}
          </li>
        ))}
      </ul>
      <button onClick={onNext}>지역선택</button>
    </div>
  );
};

export const TwoStep: React.FC<StepProps> = ({ onNext, onPrev }) => {
  return (
    <div>
      <div className="popup--online">
        <Modal id="2">
          <Body onNext={onNext} />
          <Footer onNext={onNext} onPrev={onPrev} />
        </Modal>
      </div>
    </div>
  );
};
