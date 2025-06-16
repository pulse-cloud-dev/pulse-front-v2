import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface BookmarkCard {
  id: string;
  title: string;
  type: "online" | "offline";
  region?: string;
}

interface BookmarkStore {
  bookmarkList: BookmarkCard[];
  toggleBookmark: (card: BookmarkCard) => void;
  isBookmarked: (id: string) => boolean;
}

export const useBookmarkStore = create(
  persist<BookmarkStore>(
    (set, get) => ({
      bookmarkList: [],
      toggleBookmark: (card) => {
        const list = get().bookmarkList;
        const exists = list.some((c) => c.id === card.id);

        if (exists) {
          set({ bookmarkList: list.filter((c) => c.id !== card.id) });
          return;
        }

        if (list.length >= 500) {
          alert("최대 500개의 모집글만 북마크할 수 있어요.");
          return;
        }

        set({ bookmarkList: [...list, card] });
      },
      isBookmarked: (id) => get().bookmarkList.some((c) => c.id === id),
    }),
    {
      name: "bookmark-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
