import React, { useState } from "react";
import { Globe } from "lucide-react";

interface SubmitButtonProps {
  onSwitch: (enable: boolean) => void;
  defaultNeedSearch?: boolean; // 默认是否开启自动保存
  data_tooltip_id: string;
  data_tooltip_content: string;
  data_tooltip_place: string;
}

const Switch: React.FC<SubmitButtonProps> = (props) => {
  const [isChecked, setIsChecked] = useState(props.defaultNeedSearch || false);

  const handleCheckboxChange = () => {
    props.onSwitch(!isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          name="autoSaver"
          className="sr-only"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          data-tooltip-id={props.data_tooltip_id as any}
          data-tooltip-content={props.data_tooltip_content as any}
          data-tooltip-place={props.data_tooltip_place as any}
          className={`slider mr-1 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
            isChecked ? "bg-blue-500" : "bg-[#CCCCCE]"
          }`}
        >
          <Globe
            color="white"
            size={24}
            className={`h-[18px] w-[18px] duration-200 ${
              isChecked ? "translate-x-6" : ""
            }`}
          />
        </span>
        {/* <span className="label flex items-center text-sm font-medium text-black">
          <span className="pl-1"> {isChecked ? "开启" : "关闭"} </span>
        </span> */}
      </label>
    </>
  );
};

export default Switch;
