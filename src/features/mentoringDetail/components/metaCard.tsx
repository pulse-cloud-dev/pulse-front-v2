import { Icon } from "@/shared/components";


interface MentoringMetaCardProps {
  price: number;
  period: string;
  location: string;
  deadline: string;
  count: string;
}

export const MentoringMetaCard = ({ price, period, location, deadline, count }: MentoringMetaCardProps) => (
  <div className="mentoring-meta-card">
    <p className="mentoring-price">{price.toLocaleString("ko-KR")}원</p>
    <ul className="mentoring-meta-list">
      <li>
        <span className="mentoring-label">멘토링 기간</span>
        <span className="value">{period}</span>
      </li>
      <li>
        <span className="mentoring-label">멘토링 장소</span>
        <span className="value">{location}</span><Icon src="copy_a" alt="주소 복사"/>
      </li>
      <li>
        <span className="mentoring-label">모집 마감</span>
        <span className="value">{deadline}</span>
      </li>
      <li>
        <span className="mentoring-label">모집 인원</span>
        <span className="value">{count}</span>
      </li>
    </ul>
    <div className="button-group">
      <button className="button-outline" type="button">문의하기</button>
      <button className="button-primary" type="button">신청하기</button>
    </div>
  </div>
);