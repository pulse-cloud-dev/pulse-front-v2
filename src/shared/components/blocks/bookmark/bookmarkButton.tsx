import { useState } from "react";
import { useBookmarkMutation } from "./hook/useBookmarkMutation";
import { Icon } from "@/shared/components/atoms";
import { useUser } from "@/shared/lib/hooks";
import { usePageNavigation } from "@/shared/lib/hooks";
import { useParams } from "react-router-dom";
import { useMentoringDetailQuery } from "@/features/menteeDetail";

interface BookmarkButtonProps {
  label?: string; // 선택값 (optional)
}

export const BookmarkButton = ({ label }: BookmarkButtonProps) => {
  const { id: mentoringId } = useParams<{ id: string }>();
  const { data } = useMentoringDetailQuery(mentoringId || "");
  const { mutate, isPending } = useBookmarkMutation();
  const { isLogin } = useUser();
  const { goToPage } = usePageNavigation();

  const [isHovered, setIsHovered] = useState(false);

  const toggleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLogin) {
      goToPage("/auth/signIn");
      return;
    }

    // 여기에 북마크 요청 수행
    // mutate({ mentoringId: mentoringId || "" });
  };

  return (
    <button type="button" onClick={toggleBookmark} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onFocus={() => setIsHovered(true)} onBlur={() => setIsHovered(false)} aria-label={label} disabled={isPending}>
      <Icon src={isHovered ? "bookmark_on" : "bookmark_20"} alt={"북마크"} />
      <span>{label}</span>
    </button>
  );
};
