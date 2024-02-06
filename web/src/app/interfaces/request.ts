interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  messageId: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  model: string;
  needSearch: boolean;
  threadId: string;
}

interface ThreadResponse {
  threadId: string;
  request: ChatRequest;
  responses: string[];
}

interface SearchState {
  threadId: string;
  query: string;
  needSearch: boolean;
  isNewRequest: boolean;
}
