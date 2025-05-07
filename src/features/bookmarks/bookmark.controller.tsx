import { BookmarkView } from "./bookmark.view";

export const BookmarkController = () => {
  const props = {
    count: 20,
  };
  return <BookmarkView {...props} />;
};
