export const getSearchParams = (search: string) => {
  const params = new URLSearchParams(window.location.search);
  return params?.get(search) || "";
};
