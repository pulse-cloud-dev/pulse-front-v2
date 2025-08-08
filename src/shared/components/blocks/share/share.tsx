import { useState } from "react";
import { Icon } from "@/shared/components/atoms";
const label = "공유";
export const ShareButton = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = window.location.href;

    // 클립보드에 복사
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
      })
      .catch(() => {
        alert("클립보드 복사에 실패했습니다.");
      });
  };

  return (
    <button type="button" onClick={handleShare} aria-label={label || "현재 페이지 주소 복사"}>
      <Icon src="share" alt="" aria-hidden="true" />
      <span aria-hidden="true">{label}</span>
    </button>
  );
};
