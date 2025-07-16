import { Icon } from "@/shared/components";
import { useState } from "react";

import { BaseButton } from "@/shared/components";
import { MentoringMetaCardProps } from "../types/mentoring.types";
import { InquiryModal } from "./inquiryModal";
import { InquiryAlertContainer } from "./inquiryAlertContainer";
import { RegisterAlertContainer } from "./registerAlertContainer";
import { usePageNavigation } from "@/shared/lib/hooks";


export const MentoringMetaCard = ({
  price,
  period,
  location,
  deadline,
  recruitNumber,
  applyNumber,
  mentorName,
  title,
  isLogin,

}: MentoringMetaCardProps) => {
  const [copied, setCopied] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [showInquiryAlert, setShowInquiryAlert] = useState(false);
  const [showRegisterAlert, setShowRegisterAlert] = useState(false);

  const { goToPage } = usePageNavigation();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(location);
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
    const confirmed = window.confirm(`${mentorName} 님의 멘토 : ${title}에 신청하시겠습니까?`);
    if (confirmed) {
      setShowRegisterAlert(true);
    }
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
        <BaseButton 
          onClick={() => setShowModal(true)}
          type="button"
          style={{
            flex: 2.5,
            backgroundColor: "#fff",
            border: "1.5px solid #00C3B2",
            color: "#00C3B2",
            fontWeight: 600
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

        {showInquiryAlert && (
          <InquiryAlertContainer onClose={() => setShowInquiryAlert(false)} />
        )}
      
        <BaseButton 
          onClick={handleApplyClick}
          type="button"
          color="teal"
          style={{
            flex: 7.5
          }}
        >
          신청하기
        </BaseButton>

        {showRegisterAlert && (
          <RegisterAlertContainer
            // body="신청이 완료되었습니다."
            onCancel={() => setShowRegisterAlert(false)}
            onConfirm={() => {}}
          />
        )}
      </div>
    </div>
  );
};