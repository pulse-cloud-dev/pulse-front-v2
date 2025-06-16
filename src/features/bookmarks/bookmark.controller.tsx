import { BookmarkView } from "./bookmark.view";
import { useBookmarkStore } from "@/features/bookmarks/store/bookmarkStore";

export const BookmarkController = () => {
  const bookmarkList = useBookmarkStore((state) => state.bookmarkList);

  const props = {
    count: bookmarkList.length,
    cards: bookmarkList, 
  };

  return <BookmarkView {...props} />;
};
