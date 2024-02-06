import { nanoid } from "nanoid";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface SearchRequestContextType {
  searchRequest: ChatRequest | undefined; // Allow `undefined` here
  addSearchRequest: (
    query: string,
    needSearch: boolean,
    newRequest: boolean,
    newThreadId: string,
  ) => void;
  updateSearchRequest: (request: ChatRequest) => void;
}

const SearchRequestContext = createContext<
  SearchRequestContextType | undefined
>(undefined);

export const useSearchRequest = () => {
  const context = useContext(SearchRequestContext);
  if (!context) {
    throw new Error(
      "useSearchRequest must be used within a SearchRequestProvider",
    );
  }
  return context;
};

export const SearchRequestProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // 使用useState的函数式初始化来防止在服务端渲染时执行localStorage读取
  const [searchRequest, setSearchRequest] = useState<ChatRequest>();

  // 仅在组件挂载到DOM后（客户端）读取localStorage
  useEffect(() => {
    const savedSearchRequest =
      typeof window !== "undefined"
        ? localStorage.getItem("searchRequest")
        : null;
    if (savedSearchRequest) {
      const initialSearchRequest = JSON.parse(savedSearchRequest);
      setSearchRequest(initialSearchRequest);
    }
  }, []);

  useEffect(() => {
    // 仅在客户端时，每当searchRequests变化时，更新localStorage
    if (typeof window !== "undefined" && searchRequest) {
      localStorage.setItem("searchRequest", JSON.stringify(searchRequest));
    }
  }, [searchRequest]);

  const updateSearchRequest = (request: ChatRequest) => {
    if (typeof window !== "undefined" && searchRequest) {
      localStorage.removeItem("searchRequest");
    }
    setSearchRequest(request);
  };

  const addSearchRequest = (
    query: string,
    needSearch: boolean,
    newRequest: boolean = false,
    newThreadId: string | undefined = undefined,
  ) => {
    const newMessage: ChatMessage = {
      role: "user",
      content: query,
      messageId: nanoid(),
    };
    if (newRequest) {
      const newSearchRequest: ChatRequest = {
        messages: [newMessage],
        model: "ChatGLM",
        needSearch: needSearch,
        threadId: newThreadId || nanoid(),
      };
      console.log("newSearchRequest add...", newSearchRequest);
      setSearchRequest(newSearchRequest);
    } else {
      setSearchRequest((prevState: ChatRequest | undefined) => {
        // If prevState is undefined, initialize it appropriately
        const initialState: ChatRequest = {
          messages: [],
          model: "",
          needSearch: false,
          threadId: "",
        };

        const newState = prevState ? { ...prevState } : initialState;
        newState.messages = [...newState.messages, newMessage]; // Add newMessage to messages array
        return newState;
      });
    }
  };

  return (
    <SearchRequestContext.Provider
      value={{ searchRequest, addSearchRequest, updateSearchRequest }}
    >
      {children}
    </SearchRequestContext.Provider>
  );
};
