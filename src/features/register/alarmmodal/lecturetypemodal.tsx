// LecturePreferenceModal.tsx
import React from "react";

type LecturePreferenceModalProps = {
  onClose: () => void;
  onSave: (data: { format: "online" | "offline"; days: string[]; region?: string }) => void;
  initialData?: {
    format?: "online" | "offline";
    days?: string[];
    region?: string;
  };
};
export const LecturePreferenceModal: React.FC<LecturePreferenceModalProps> = ({ onClose, onSave, initialData }) => {
  const [format, setFormat] = React.useState<"online" | "offline">(initialData?.format || "online");
  const [days, setDays] = React.useState<string[]>(initialData?.days || []);
  const [region, setRegion] = React.useState<string>(initialData?.region || "");

  const toggleDay = (day: string) => {
    setDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
  };

  const handleSubmit = () => {
    onSave({ format, days, region });
    onClose();
  };

  return (
    <div className="modal">
      <h2>강의 형식 선택</h2>
      <div className="format-buttons">
        <button className={format === "online" ? "active" : ""} onClick={() => setFormat("online")}>
          온라인
        </button>
        <button className={format === "offline" ? "active" : ""} onClick={() => setFormat("offline")}>
          오프라인
        </button>
      </div>

      {format === "offline" && (
        <div className="region-input">
          <label>지역 선택</label>
          <input value={region} onChange={(e) => setRegion(e.target.value)} placeholder="예: 서울 강남구" />
        </div>
      )}

      <div className="day-picker">
        <p>멘토링 가능한 요일</p>
        {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
          <button key={day} className={days.includes(day) ? "selected" : ""} onClick={() => toggleDay(day)}>
            {day}
          </button>
        ))}
      </div>

      <div className="modal-footer">
        <button onClick={onClose}>닫기</button>
        <button onClick={handleSubmit}>저장</button>
      </div>
    </div>
  );
};

export default LecturePreferenceModal;
