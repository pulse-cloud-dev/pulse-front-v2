import { useState } from "react";
<<<<<<< HEAD
import { useBookmarkMutation } from "./hook/useBookmarkMutation";
import { Icon } from "@/shared/components/atoms";
import { useUser } from "@/shared/lib/hooks";
import { usePageNavigation } from "@/shared/lib/hooks";

interface BookmarkButtonProps {
  mentoringId: string;
  isBookmarked?: boolean;
=======
import { Icon } from "@/shared/components/atoms";

interface BookmarkButtonProps {
  isBookmarked?: boolean; 
>>>>>>> 2e0d2f0bf08846599db8a036e985d4ace4798b5d
  label?: string;
}

export const BookmarkButton = ({
<<<<<<< HEAD
  mentoringId,
  isBookmarked: initialBookmarked = false,
  label,
}: BookmarkButtonProps) => {
  const { mutate, isPending } = useBookmarkMutation();
  const { isLogin } = useUser();
  const { goToPage } = usePageNavigation();

  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  const toggleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLogin) {
    goToPage("/auth/signIn"); 
    return;
    }

    // optimistic update
    const nextState = !isBookmarked;
    setIsBookmarked(nextState);

    // mutation 요청
    mutate(
      {
        mentoring_id: mentoringId,
        is_bookmark: nextState,
      },
      {
        // 요청 실패 시 롤백
        onError: () => {
          setIsBookmarked(!nextState);
        },
      }
    );
  };

  
  
=======
  isBookmarked: initialBookmarked = false,
  label
}: BookmarkButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

>>>>>>> 2e0d2f0bf08846599db8a036e985d4ace4798b5d
  return (
    <button
      type="button"
      onClick={toggleBookmark}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      aria-pressed={isBookmarked}
      aria-label={label}
<<<<<<< HEAD
      disabled={isPending} // 요청 중엔 버튼 비활성화
=======
>>>>>>> 2e0d2f0bf08846599db8a036e985d4ace4798b5d
    >
      <Icon
        src={
          isBookmarked || isHovered
            ? "bookmark_on"
            : "bookmark_20"
        }
        alt="북마크"
      />
      <span>{label}</span>
    </button>
  );
};
