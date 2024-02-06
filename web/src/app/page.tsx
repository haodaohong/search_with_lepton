"use client";
import { Footer } from "@/app/components/footer";
import { Logo } from "@/app/components/logo";
import { PresetQuery } from "@/app/components/preset-query";
import { Search } from "@/app/components/search";
import React, { useEffect } from "react";
import { SearchRequestProvider } from "./utils/search-request-context";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    // 组件挂载时的操作（如果有的话）
    console.log("组件挂载");
    localStorage.removeItem("searchRequest");
  }, []);

  const onSearch = (query: string, needSearch: boolean) => {
    localStorage.setItem("k", query);
    router.push(
      `/search?q=${query.substring(0, 200)}&s=${needSearch ? "1" : "0"}`,
    );
  };

  return (
    <div className="absolute w-f inset-0 min-h-[500px] flex items-center justify-center">
      <SearchRequestProvider>
        <div className="relative flex flex-col gap-8 px-4 -mt-24  items-center justify-center">
          <Logo></Logo>
          <div className="w-full">
            <Search onSearch={onSearch}></Search>
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            <PresetQuery query="定制一个短途旅行计划"></PresetQuery>
            <PresetQuery query="为什么月亮的另一面永远看不到？"></PresetQuery>
            <PresetQuery query="如何使用Python实现远程图片下载？"></PresetQuery>
          </div>
          <div className="fixed text-center bottom-1 items-center justify-center">
            <Footer></Footer>
          </div>
        </div>
      </SearchRequestProvider>
    </div>
  );
}
