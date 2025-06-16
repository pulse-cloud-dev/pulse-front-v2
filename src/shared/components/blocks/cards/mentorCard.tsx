import type { HTMLAttributes } from "react";
import { useState } from "react";
import { Modal, useModal } from "@/shared/modules";
import { MentorDetailPopup } from "@/shared/components/widgets";
import { Icon, Image, SquareBadge } from "@/shared/components/atoms";
import { BaseCard } from "./baseCard";
import { usePageNavigation } from "@/shared/lib/hooks";


// Body
interface BodyContentTitleProps extends HTMLAttributes<HTMLElement> {
  title?: string;
}
const BodyContentTitle = (props: BodyContentTitleProps) => {
  const { title, ...rest } = props;
  return (
    <>
      {title && (
        <span
          className="mentorCard-title"
          {...rest}
        >
          {title}
        </span>
      )}
    </>
  );
};

interface BodyContentTagProps {}
const BodyContentTag = (props: BodyContentTagProps) => {
  return (
    <div className="mentorCard-content__tag">
      {/* 태그 */}
      <div className="content__tag left">
        <label className="flex_r flex_ac">
          <Icon src="briefcase_20" alt="서류가방" />
          <span className="m-l-4 ">UI/UX</span>
        </label>
        <label className="flex_r flex_ac">
          <Icon src="briefcase_20" alt="서류가방" />
          <span className="m-l-4 ">UI/UX</span>
        </label>
        <label className="flex_r flex_ac">
          <Icon src="briefcase_20" alt="서류가방" />
          <span className="m-l-4 ">UI/UX</span>
        </label>
      </div>
      {/* 태그 */}

      {/* 프로필 이미지 */}
      <div className="content__tag right">
        <Image className="mentorCard-img" src="card" alt="프로필" />
      </div>
      {/* 프로필 이미지 */}
    </div>
  );
};

// Footer
interface FooterDescriptionProps {}
const FooterDescription = (props: FooterDescriptionProps) => {
  const {} = props;
  return (
    <div className="mentorCard-footer__desc">
      <span className="footer__desc date">~25년3월2일</span>
      <span className="footer__desc nickname">짱구는목말라</span>
    </div>
  );
};

import { useBookmarkStore } from "@/features/bookmarks/store/bookmarkStore";

interface MentorCardProps {
  id: string;
  title?: string;
  type?: "online" | "offline";  // 모집글 형식
  region?: string;              // 오프라인일 경우 지역명
}

// Mentor Card Component
export const MentorCard = ({ 
  id,
  title = "제목입니다. 제목은 3줄까지만 보입니다. 제목은 3줄까지만 보입니다. 제목은 3줄까지만 보입니다. 제목은 3줄까지만 보입니다. ",
  type = "online",
  region = "",
}: MentorCardProps) => {
  const { goToPage } = usePageNavigation();
  const { toggleBookmark, isBookmarked } = useBookmarkStore();

  const bookmarked = isBookmarked(id);
  const [isHovered, setIsHovered] = useState(false);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isLoggedIn = true;

    if (!isLoggedIn) {
      goToPage("signIn");
      return;
    }

    toggleBookmark({ id, title, type, region });
  };

  const modal = useModal(Modal, {
    title: "멘토링 정보",
    variant: "default",
    children: <MentorDetailPopup />,
  });

  const badgeText = type === "online" ? "온라인" : region || "오프라인";
  const badgeColor = type === "online" ? "blue" : "orange";

  return (
    <BaseCard onClick={modal.openModal}>
      <BaseCard.Header>
        <SquareBadge title={badgeText} color={badgeColor} />
        <Icon
          src={
            bookmarked
              ? "bookmark_filled"
              : isHovered
              ? "bookmark_filled"
              : "bookmark_off"
          }
          alt="북마크"
          onClick={handleBookmarkClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </BaseCard.Header>
      <BaseCard.Body className="border-b">
        <div className="mentorCard-body__top">
          <BodyContentTitle title={title} />
        </div>
        <div className="mentorCard-body__bottom">
          <BodyContentTag />
        </div>
      </BaseCard.Body>
      <BaseCard.Footer>
        <FooterDescription />
      </BaseCard.Footer>
    </BaseCard>
  );
};

