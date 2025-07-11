import { Icon } from "@/shared/components";
import { useState } from "react";

interface MentoringMetaCardProps {
  price: number;
  period: string;
  location: string;
  deadline: string;
  recruitNumber: number;
  applyNumber: number;
}

export const MentoringMetaCard = ({
  price,
  period,
  location,
  deadline,
  recruitNumber,
  applyNumber,
}: MentoringMetaCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(location);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("주소 복사 실패", e);
    }
  };

  const remaining = recruitNumber - applyNumber;
  const isLow = remaining <= 3;

  return (
    <div className="mentoring-meta-card">
      <p className="mentoring-price">{price.toLocaleString("ko-KR")}원</p>
      <ul className="mentoring-meta-list">
        <li>
          <span className="mentoring-label">멘토링 기간</span>
          <span className="value">{period}</span>
        </li>
        <li>
          <span className="mentoring-label">멘토링 장소</span>
          <span className="value">
            {location}
            <Icon
              src="copy_a"
              alt="주소 복사"
              onClick={handleCopy}
              role="button"
              style={{ cursor: "pointer", marginLeft: "6px" }}
            />
          </span>
        </li>
        <li>
          <span className="mentoring-label">모집 마감</span>
          <span className="value">{deadline}</span>
        </li>
        <li>
          <span className="mentoring-label">모집 인원</span>
          <span className={`value ${isLow ? "text-red" : ""}`}>
            {`${applyNumber} / ${recruitNumber}`}
          </span>
        </li>
      </ul>

      <div className="button-group">
        <button className="button-outline">문의하기</button>
        <button className="button-primary">신청하기</button>
      </div>
    </div>
  );
};