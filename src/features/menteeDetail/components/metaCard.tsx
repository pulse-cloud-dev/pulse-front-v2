import { Icon } from "@/shared/components";
import { useState } from "react";

import { BaseButton } from "@/shared/components";
import { InquiryModal } from "./inquiryModal";
import { InquiryAlertContainer } from "./inquiryAlertContainer";
import { RegisterAlertContainer } from "./registerAlertContainer";
import { usePageNavigation } from "@/shared/lib/hooks";
import { useUser } from "@/shared/lib/hooks";
import { useParams } from "react-router-dom";
import { useMentoringDetailQuery } from "@/features/menteeDetail";
import dayjs from "dayjs";

export const MentoringMetaCard = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useMentoringDetailQuery(id || "");
  const { isLogin } = useUser();
  const { goToPage } = usePageNavigation();

  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showInquiryAlert, setShowInquiryAlert] = useState(false);
  const [showRegisterAlert, setShowRegisterAlert] = useState(false);

  if (!data) return null;

  const { cost, start_date, end_date, lecture_type, address, detail_address, deadline_date, recruit_number, apply_number, mentor_nickname, title } = data;

  const price = cost || 0;
  const period = start_date && end_date ? `${dayjs(start_date).format("YYYY.MM.DD")} ~ ${dayjs(end_date).format("YYYY.MM.DD")}` : "기간 정보 없음";

  const location = lecture_type === "ONLINE" ? "온라인" : address || detail_address ? `${address ?? ""} ${detail_address ?? ""}`.trim() : "장소 정보 없음";

  const deadline = deadline_date ? dayjs(deadline_date).format("YYYY.MM.DD HH:mm") : "마감일 정보 없음";

  const remaining = recruit_number - apply_number;
  const isLow = remaining <= 3;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(location || "온라인");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("주소 복사 실패", e);
    }
  };

  const handleApplyClick = () => {
    if (!isLogin) {
      const goLogin = window.confirm("로그인 후 이용 가능합니다. 로그인하시겠습니까?");
      if (goLogin) {
        goToPage("/auth/signIn");
      }
    } else {
      const confirmed = window.confirm(`${mentor_nickname} 님의 멘토링 : "${title}"에 신청하시겠습니까?`);
      if (confirmed) {
        setShowRegisterAlert(true);
      }
    }
  };

  return (
    <div className="mentoring-meta-card">
      <p className="mentoring-price">{price.toLocaleString("ko-KR")}원</p>
      <ul className="mentoring-meta-list">
        <li>
          <span className="mentoring-label">멘토링 기간</span>
          <span className="value">{period}</span>
        </li>
        <li>
          <span className="mentoring-label">장소</span>
          <span className="value">
            {location}
            <Icon src="copy_a" alt="주소 복사" onClick={handleCopy} role="button" style={{ cursor: "pointer", marginLeft: "6px" }} />
          </span>
        </li>
        <li>
          <span className="mentoring-label">모집 마감</span>
          <span className="value">{deadline}</span>
        </li>
        <li>
          <span className="mentoring-label">모집 인원</span>
          <span className={`value ${isLow ? "text-red" : ""}`}>{`${apply_number} / ${recruit_number}`}</span>
        </li>
      </ul>

      <div className="button-group">
        <BaseButton
          onClick={() => setShowModal(true)}
          type="button"
          style={{
            flex: 2.5,
            backgroundColor: "#fff",
            border: "1.5px solid #00C3B2",
            color: "#00C3B2",
            fontWeight: 600,
          }}
        >
          문의하기
        </BaseButton>

        {showModal && (
          <InquiryModal
            id="inquiry"
            onClose={() => setShowModal(false)}
            onDone={() => {
              setShowModal(false);
              setShowInquiryAlert(true);
            }}
          />
        )}

        {showInquiryAlert && <InquiryAlertContainer onClose={() => setShowInquiryAlert(false)} />}

        <BaseButton
          onClick={handleApplyClick}
          type="button"
          color="teal"
          style={{
            flex: 7.5,
          }}
        >
          신청하기
        </BaseButton>

        {showRegisterAlert && <RegisterAlertContainer onCancel={() => setShowRegisterAlert(false)} onConfirm={() => {}} />}
      </div>
    </div>
  );
};
