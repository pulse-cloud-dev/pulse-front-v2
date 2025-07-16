import { useSearchParams } from "react-router-dom";

export const useOffsetQueryParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const offset = Number(searchParams.get("offset") || "1");

  const setOffset = (page: number) => {
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      updated.set("offset", page.toString());
      if (!updated.get("menu")) updated.set("menu", "list");
      return updated;
    });
  };

  return { offset, setOffset };
};
