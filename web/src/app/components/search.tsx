"use client";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useRef, useState } from "react";
import SearchBar from "./searchbar";
import TextareaAutosize from "react-textarea-autosize";
import SubmitButton from "./submitbutton";

interface SearchProps {
  defaultValue?: string;
  defaultNeedSearch?: boolean;
  onSearch?: (value: string, needSearch: boolean) => void;
  onContinueSearch?: (value: string) => void;
  forContinue?: boolean;
  refContent?: string;
  placeholder?: string;
}

export const Search: FC<SearchProps> = ({
  defaultValue = "",
  forContinue = false,
  placeholder = "输入你想问的...（Shift+↩︎换行；↩︎提交）",
  defaultNeedSearch,
  onSearch,
  onContinueSearch,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [needSearch, setNeedSearch] = useState(defaultNeedSearch);
  const router = useRouter();
  let textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height =
        scrollHeight > 80 ? `${scrollHeight}px` : "auto";
    }
  }, [value]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // 阻止默认的换行行为
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (forContinue) {
      onContinueSearch?.(value);
      setValue("");
    } else {
      onSearch?.(value, needSearch || false);
    }
  };

  const handleSwitch = (enable: boolean) => {
    setNeedSearch(enable);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (value) {
          setValue("");
          // router.push(
          //   getSearchUrl(
          //     encodeURIComponent(value),
          //     nanoid(),
          //     needSearch || false,
          //   ),
          // );
        }
      }}
    >
      <label
        className="relative bg-white flex items-center justify-center border px-2 rounded-lg gap-2 focus-within:border-zinc-300"
        htmlFor="search-bar"
      >
        <div className="flex-grow w-full">
          <TextareaAutosize
            id="search-bar"
            value={value}
            minRows={1}
            maxRows={4}
            rows={1}
            onChange={handleChange}
            autoFocus
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`flex-1 focus:bg-gray-100 ${forContinue ? "" : "-mb-2"} text-lg py-1 px-2 mt-2 pr-6 w-full rounded-md outline-none bg-white`}
          />
          {!forContinue && (
            <SearchBar
              disabled={!value}
              onSubmit={handleSubmit}
              onSwitch={(enable) => {
                handleSwitch(enable);
              }}
              defaultNeedSearch={defaultNeedSearch}
            ></SearchBar>
          )}
        </div>
        {forContinue && (
          <SubmitButton
            onSubmit={handleSubmit}
            disabled={!value}
          ></SubmitButton>
        )}
      </label>
    </form>
  );
};
