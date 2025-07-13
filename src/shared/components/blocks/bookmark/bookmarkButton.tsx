import { useState } from "react";
import { Icon } from "@/shared/components/atoms";

interface BookmarkButtonProps {
  isBookmarked?: boolean; 
  label?: string;
}

export const BookmarkButton = ({
  isBookmarked: initialBookmarked = false,
  label
}: BookmarkButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

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
