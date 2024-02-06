// Divider.tsx
import React from "react";

interface DividerProps {
  color: string; // 如 'bg-red-500', 'bg-blue-500' 等
  text: string;
}

const Divider: React.FC<DividerProps> = ({ color, text }) => {
  return (
    <div className="flex mt-3 items-center justify-center">
      <div className={`flex-1 border-t ${color}`}></div>
      <p className={`px-4 text-sm text-gray-300`}>{text}</p>
      <div className={`flex-1 border-t ${color}`}></div>
    </div>
  );
};

export default Divider;
