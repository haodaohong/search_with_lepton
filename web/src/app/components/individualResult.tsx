// IndividualResult.tsx
import { FC } from "react";
import { Answer } from "@/app/components/answer";
import { Relates } from "@/app/components/relates";
import { Sources } from "@/app/components/sources";
import { Annoyed } from "lucide-react";
import { Relate } from "@/app/interfaces/relate";
import { Source } from "@/app/interfaces/source";

interface IndividualResultProps {
  result: {
    sources: Source[];
    markdown: string;
    relates: Relate[] | null;
    error: number | null;
  };
}

const IndividualResult: FC<IndividualResultProps> = ({ result }) => {
  return (
    <div className="flex flex-col gap-8">
      <Answer
        markdown={result.markdown}
        sources={result.sources}
        header={""}
      ></Answer>
      {result.sources && result.sources.length > 0 && (
        <Sources sources={result.sources}></Sources>
      )}
      <Relates relates={result.relates}></Relates>
      {result.error && (
        <div className="absolute inset-4 flex items-center justify-center bg-white/40 backdrop-blur-sm">
          <div className="p-4 bg-white shadow-2xl rounded text-blue-500 font-medium flex gap-4">
            <Annoyed></Annoyed>
            {result.error === 429
              ? "Sorry, you have made too many requests recently, try again later."
              : "Sorry, we might be overloaded, try again later."}
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualResult;
