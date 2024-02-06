"use client";
import { Search } from "./search";

export const Title = ({
  query,
  defaultNeedSearch,
  onSearch,
}: {
  query: string;
  defaultNeedSearch: boolean;
  onSearch: (value: string, needSearch: boolean) => void;
}) => {
  return (
    <div className="flex items-center pb-2">
      <div
        className="flex-1 text-lg sm:text-xl text-black text-ellipsis overflow-hidden whitespace-nowrap"
        title={query}
      >
        <Search
          defaultNeedSearch={defaultNeedSearch}
          defaultValue={query}
          onSearch={onSearch}
        ></Search>
      </div>
    </div>
  );
};
