import React, { useState } from "react";
import Switch from "./switch";
import SubmitButton from "./submitbutton";
import { Tooltip } from "react-tooltip";
interface SubmitButtonProps {
  disabled?: boolean;
  onSubmit: () => void;
  onSwitch: (enable: boolean) => void;
  defaultNeedSearch?: boolean;
}

const SearchBar: React.FC<SubmitButtonProps> = (props) => {
  const [selectedValue, setSelectedValue] = useState("");
  const options = [
    { value: "chinese", label: "中文输出" },
    { value: "english", label: "English" },
  ];

  const handleChange = (selectedOption: any) => {
    console.log("选中的选项:", selectedOption);
    setSelectedValue(selectedOption.target.value);
  };

  return (
    <div className="w-full flex justify-between items-center p-1">
      <Tooltip id="my-tooltip" />
      {/* 左侧图标按钮 */}
      <div className="flex flex-row items-center">
        <Switch
          data_tooltip_id="my-tooltip"
          data_tooltip_content="开/关联网搜索"
          data_tooltip_place="bottom"
          defaultNeedSearch={props.defaultNeedSearch || false}
          onSwitch={props.onSwitch}
        ></Switch>
        <select
          hidden={true}
          data-tooltip-id="my-tooltip"
          data-tooltip-content="选择输出语言"
          data-tooltip-place="bottom"
          className="form-select m-1 cursor-pointer appearance-none px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 bg-clip-padding bg-no-repeat rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          value={selectedValue}
          onChange={handleChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {/* 右侧图标按钮 */}
      <div>
        <SubmitButton
          disabled={props.disabled || false}
          onSubmit={props.onSubmit}
        ></SubmitButton>
      </div>
    </div>
  );
};

export default SearchBar;
