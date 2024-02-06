import React from "react";
// 假设 ArrowRight 是另一个组件
import { ArrowRight } from "lucide-react";

interface SubmitButtonProps {
  disabled?: boolean;
  onSubmit: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  const buttonClass = `w-auto py-1 px-1  text-white fill-white active:scale-95 overflow-hidden relative rounded-full ${
    props.disabled ? "bg-gray-300" : "bg-black"
  }`;
  return (
    <button
      type="submit"
      disabled={props.disabled}
      className={buttonClass}
      onClick={props.onSubmit}
    >
      <ArrowRight size={24} />
    </button>
  );
};

export default SubmitButton;
