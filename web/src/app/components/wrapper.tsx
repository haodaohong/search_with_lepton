import { FC, ReactNode } from "react";

export const Wrapper: FC<{
  header: ReactNode;
  title: ReactNode;
  content: ReactNode;
}> = ({ title, content, header }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {header}
      {title && <div className="flex gap-2 text-blue-500">{title}</div>}
      {content}
    </div>
  );
};
