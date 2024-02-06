import React, { FC } from "react";
import LogoImg from "../logo.svg";
import Image from "next/image";

export const Logo: FC = () => {
  return (
    <div className="flex gap-4 items-center justify-center cursor-default select-none relative">
      <div className="h-10 w-10">
        <Image src={LogoImg} alt="爱问" width={40} height={40} />
      </div>
      <div className="text-center font-medium text-2xl md:text-3xl text-zinc-950 relative text-nowrap">
        爱问
      </div>
      <div className="transform -ml-3 -mt-3 scale-75 origin-left border items-center rounded-lg bg-gray-100 px-1 py-0 text-xs font-medium text-zinc-600">
        beta
      </div>
    </div>
  );
};
