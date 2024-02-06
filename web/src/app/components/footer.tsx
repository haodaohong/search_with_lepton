import { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="text-center flex flex-col items-center text-xs text-zinc-700">
      <div className="text-zinc-400">
        所有内容均为AI生成，请谨慎识别严肃内容的准确性。
      </div>

      <div className="flex items-center justify-center flex-wrap gap-x-1 text-zinc-400">
        <a
          target="_blank"
          className="hover:text-zinc-950"
          href="https://xinmafang.com/"
        >
          新码坊
        </a>
        ©️ 版权所有
      </div>
    </div>
  );
};
