"use client";
import { Result } from "@/app/components/result";
import { Title } from "@/app/components/title";
import React, { useEffect } from "react";

interface SearchResultProps {
  request: ChatRequest;
  onSearch: (value: string, needSearch: boolean) => void;
  onContinueSearch: (value: string) => void;
}

export default function SearchResult(props: SearchResultProps) {
  useEffect(() => {
    // 解码并获取 'needSearch' 参数的值
    console.log("SearchResultSearchResultSearchResultSearchResultSearchResult");
  }, []);

  return (
    <div className="px-4 md:px-8 pt-6 pb-6 rounded-2xl">
      <div className="flex-grow">
        {props.request?.messages?.map((message, index) => (
          <React.Fragment key={props.request.threadId}>
            {index === 0 && ( // 仅对数组中的第一个元素渲染Title组件
              <div className="sticky top-0 z-10">
                <Title
                  onSearch={props.onSearch}
                  defaultNeedSearch={props.request.needSearch}
                  query={props.request?.messages[0].content}
                />
              </div>
            )}
            <Result
              key={props.request.threadId}
              header={index !== 0 ? message.content : ""}
              request={{
                ...props.request,
                // 将当前索引之前（包括当前索引）的所有message作为messages数组
                messages: props.request.messages.slice(0, index + 1),
              }}
              onContinueSearch={props.onContinueSearch}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
