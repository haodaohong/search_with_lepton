"use client";
import { Search } from "@/app/components/search";
import { Logo } from "../components/logo";
import { Footer } from "../components/footer";
import React, { useEffect, useState } from "react";
import SearchResult from "../components/search-result";
import { useRouter, useSearchParams } from "next/navigation";

import { nanoid } from "nanoid";
import { Skeleton } from "../components/skeleton";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialState: ChatRequest = {
    messages: [],
    model: "",
    needSearch: false,
    threadId: "",
  };
  const [searchRequest, setSearchRequest] = useState<ChatRequest>(initialState);
  const renameURL = (threadId: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    // 设置新的search参数
    searchParams.set("threadId", threadId);
    // 删除旧的search参数和关键词参数
    searchParams.delete("q");
    searchParams.delete("s");
    // 构建新的URL
    const newUrl =
      window.location.pathname +
      "?" +
      searchParams.toString() +
      window.location.hash;
    // 使用History API来修改URL而不重新加载页面
    window.history.pushState({ path: newUrl }, "", newUrl);
  };
  const addSearchRequest = (
    query: string,
    needSearch: boolean | undefined = undefined,
    isNew: boolean = false,
    newThreadId: string | undefined = undefined,
  ) => {
    const newMessage: ChatMessage = {
      role: "user",
      content: query,
      messageId: nanoid(),
    };
    if (isNew) {
      const newSearchRequest: ChatRequest = {
        messages: [newMessage],
        model: "ChatGLM",
        needSearch: needSearch || false,
        threadId: newThreadId || nanoid(),
      };
      setSearchRequest(newSearchRequest);
      renameURL(newSearchRequest.threadId);
    } else {
      setSearchRequest((prevState: ChatRequest | undefined) => {
        // If prevState is undefined, initialize it appropriately
        const newState = prevState ? { ...prevState } : initialState;
        newState.messages = [...newState.messages, newMessage]; // Add newMessage to messages array
        return newState;
      });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && searchRequest) {
      localStorage.setItem("searchRequest", JSON.stringify(searchRequest));
    }
  }, [searchRequest]);

  useEffect(() => {
    let queryParam = searchParams.get("q");
    const query = localStorage.getItem("k"); //获取输入的查询关键词
    if (query && query.length > 0) {
      queryParam = query;
    }
    const needSearchParam = searchParams.get("s") === "1" ? true : false;

    let threadId = decodeURIComponent(searchParams.get("threadId") || "");
    if (
      threadId &&
      threadId.length &&
      !(
        searchRequest &&
        searchRequest.threadId &&
        searchRequest.threadId.length > 0
      )
    ) {
      fetch(`/history/?threadId=${threadId}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*./*",
          Authorization: "Bearer j5hxs5lv362ej2agw707bt9n7aereqjh",
        },
      })
        .then((res) => res.json())
        .then((data: ThreadResponse) => {
          if (data) {
            setSearchRequest(data.request);
          }
        });
    } else {
      threadId = nanoid();
      addSearchRequest(queryParam || "", needSearchParam, true, threadId);
      renameURL(threadId);
    }
  }, []);

  const onContinueSearch = (query: string) => {
    addSearchRequest(query || "", undefined, false);
  };

  const onNewSearch = (query: string, needSearch: boolean) => {
    addSearchRequest(query || "", needSearch, true);
  };

  return (
    <div className="absolute inset-0">
      <div className="mx-auto max-w-4xl absolute inset-4 md:inset-8 bg-white items-center justify-center">
        <div className="px-4 md:px-8 rounded-2xl overflow-auto flex items-center justify-start">
          <Logo></Logo>
        </div>
        {searchRequest &&
        searchRequest.threadId &&
        searchRequest.threadId.length > 0 ? (
          <>
            <SearchResult
              onSearch={onNewSearch}
              onContinueSearch={onContinueSearch}
              request={searchRequest}
            ></SearchResult>
            <div className="z-10 flex items-center justify-center bottom-6 px-4 md:px-8 mx-auto max-w-5xl w-full">
              <div className="w-full">
                <Search
                  onContinueSearch={onContinueSearch}
                  forContinue={true}
                  placeholder="继续根据上下文提问..."
                ></Search>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2 p-14">
            <Skeleton className="max-w-sm h-4 bg-zinc-200"></Skeleton>
            <Skeleton className="max-w-lg h-4 bg-zinc-200"></Skeleton>
            <Skeleton className="max-w-2xl h-4 bg-zinc-200"></Skeleton>
            <Skeleton className="max-w-lg h-4 bg-zinc-200"></Skeleton>
            <Skeleton className="max-w-xl h-4 bg-zinc-200"></Skeleton>
          </div>
        )}

        <div className="text-center mt-2 items-center justify-center">
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}
