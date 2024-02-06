import { PresetQuery } from "@/app/components/preset-query";
import { Skeleton } from "@/app/components/skeleton";
import { Wrapper } from "@/app/components/wrapper";
import { Relate } from "@/app/interfaces/relate";
import { MessageSquareQuote } from "lucide-react";
import React, { FC } from "react";

export const Relates: FC<{
  relates: Relate[] | null;
  onContinueSearch?: (value: string) => void;
}> = ({ relates, onContinueSearch }) => {
  const handleContinueSearch = (value: string) => {
    if (onContinueSearch) {
      onContinueSearch(value);
    }
  };

  return (
    <Wrapper
      header={""}
      title={
        <>
          <MessageSquareQuote></MessageSquareQuote> 相关问题
        </>
      }
      content={
        <div className="flex gap-2 flex-col">
          {relates !== null ? (
            relates.length > 0 ? (
              relates.map(({ question }) => (
                <PresetQuery
                  onContinueSearch={handleContinueSearch}
                  key={question}
                  query={question}
                ></PresetQuery>
              ))
            ) : (
              <div className="text-sm">No related questions.</div>
            )
          ) : (
            <>
              <Skeleton className="w-full h-5 bg-zinc-200/80"></Skeleton>
              <Skeleton className="w-full h-5 bg-zinc-200/80"></Skeleton>
              <Skeleton className="w-full h-5 bg-zinc-200/80"></Skeleton>
            </>
          )}
        </div>
      }
    ></Wrapper>
  );
};
