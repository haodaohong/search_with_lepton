import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { getSearchUrl } from "../utils/get-search-url";

export const PresetQuery: FC<{
  query: string;
  onContinueSearch?: (value: string) => void;
}> = ({ query, onContinueSearch }) => {
  const [searchRequest, setSearchRequest] = useState<ChatRequest>();
  const handleContinueSearch = (value: string) => {
    if (onContinueSearch) {
      onContinueSearch(value);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const request = localStorage.getItem("searchRequest");
      if (request) {
        setSearchRequest(JSON.parse(request));
      }
    }
  }, []);

  return (
    <Link
      prefetch={false}
      title={query}
      onClick={(e) => {
        if (!onContinueSearch) {
          return;
        }
        e.preventDefault();
        handleContinueSearch(query);
      }}
      className="border text-sm border-zinc-200/50 text-ellipsis overflow-hidden text-nowrap items-center rounded-lg bg-zinc-100 hover:bg-zinc-200/80 hover:text-zinc-950 px-2 py-1 text-zinc-600"
      href={
        onContinueSearch
          ? ""
          : getSearchUrl(query, searchRequest?.needSearch || false)
      }
    >
      {query}
    </Link>
  );
};
function handleContinueSearch(query: any) {
  throw new Error("Function not implemented.");
}

