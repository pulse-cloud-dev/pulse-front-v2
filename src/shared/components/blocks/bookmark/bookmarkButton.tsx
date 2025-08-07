import { useState } from "react";
import { useBookmarkMutation } from "./hook/useBookmarkMutation";
import { Icon } from "@/shared/components/atoms";
import { useUser } from "@/shared/lib/hooks";
import { usePageNavigation } from "@/shared/lib/hooks";
import { useParams } from "react-router-dom";
import { useMentoringDetailQuery } from "@/features/menteeDetail";

const label = "북마크";

export const BookmarkButton = () => {
  const { id: mentoringId } = useParams<{ id: string }>();
  const { data } = useMentoringDetailQuery(mentoringId || "");
  const { mutate, isPending } = useBookmarkMutation();
  const { isLogin } = useUser();
  const { goToPage } = usePageNavigation();

  const [isHovered, setIsHovered] = useState(false);
  // console.log("data(회원정보)", data);
  const toggleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLogin) {
      goToPage("/auth/signIn");
      return;
    }
  };

  return (
    <button
      type="button"
      onClick={toggleBookmark}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      // aria-pressed={mutate || false}
      aria-label={label}
      disabled={isPending}
    >
      <Icon src={isHovered ? "bookmark_on" : "bookmark_20"} alt="북마크" />
      <span>{label}</span>
    </button>
  );
};
