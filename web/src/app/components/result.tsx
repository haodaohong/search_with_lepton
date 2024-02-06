"use client";
import { Answer } from "@/app/components/answer";
import { Relates } from "@/app/components/relates";
import { Sources } from "@/app/components/sources";
import { Relate } from "@/app/interfaces/relate";
import { Source } from "@/app/interfaces/source";
import { parseStreaming } from "@/app/utils/parse-streaming";
import { Annoyed } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";

export const Result: FC<{
  request: ChatRequest;
  header: string;
  onContinueSearch?: (value: string) => void;
}> = ({ request, header, onContinueSearch }) => {
  const handleContinueSearch = (value: string) => {
    if (onContinueSearch) {
      onContinueSearch(value);
    }
  };
  const answerRef = useRef<HTMLDivElement>(null);
  const [sources, setSources] = useState<Source[]>([]);
  const [markdown, setMarkdown] = useState<string>("");
  const [relates, setRelates] = useState<Relate[] | null>(null);
  const [error, setError] = useState<number | null>(null);
  useEffect(() => {
    const scrollToBottom = () => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth", // 为了平滑滚动
      });
    };
    scrollToBottom();
    const controller = new AbortController();
    void parseStreaming(
      controller,
      request,
      setSources,
      setMarkdown,
      setRelates,
      setError,
    );
    return () => {
      controller.abort();
    };
  }, [request]);
  return (
    <div className="flex flex-col gap-8">
      <Answer header={header} markdown={markdown} sources={sources}></Answer>
      {sources && sources.length > 0 && <Sources sources={sources}></Sources>}
      {relates && relates.length > 0 && (
        <Relates
          onContinueSearch={handleContinueSearch}
          relates={relates}
        ></Relates>
      )}
      {error && (
        <div className="absolute inset-4 flex items-center justify-center bg-white/40 backdrop-blur-sm">
          <div className="p-4 bg-white shadow-2xl rounded text-blue-500 font-medium flex gap-4">
            <Annoyed></Annoyed>
            {error === 429
              ? "Sorry, you have made too many requests recently, try again later."
              : "Sorry, we might be overloaded, try again later."}
          </div>
        </div>
      )}
    </div>
  );
};
