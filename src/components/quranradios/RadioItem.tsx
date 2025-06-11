import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";

interface RadioItemProps {
  handleButtonClick: () => void;
  radioName: string;
}

const RadioItem: React.FC<RadioItemProps> = ({
  handleButtonClick,
  radioName,
}) => {
  return (
    <div className="bg-white border-2 w-[340px] h-[70px] flex items-center overflow-hidden text-mainColor rounded-3xl mx-10 my-5">
      <button
        onClick={handleButtonClick}
        className="p-2 text-[12px] xl:text-[20px] w-[85%] h-full"
      >
        {radioName}
      </button>
      <div>
        <IoMdHeartEmpty className="text-2xl cursor-pointer" />
      </div>
    </div>
  );
};

export default RadioItem;

