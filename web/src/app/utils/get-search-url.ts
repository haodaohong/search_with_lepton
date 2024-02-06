export const getSearchUrl = (query: string, need_search: boolean) => {
  const prefix =
    process.env.NODE_ENV === "production" ? "/search.html" : "/search";
  return `${prefix}?q=${encodeURIComponent(query)}&s=${need_search ? "1" : "0"}`;
};
