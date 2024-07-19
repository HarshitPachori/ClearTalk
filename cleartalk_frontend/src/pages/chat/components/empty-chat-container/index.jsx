import { animationDeffaultOptions } from "@/lib/utils";
import React from "react";
import Lottie from "react-lottie";

const EmptyChatContainer = () => {
  return (
    <div className="flex-1 md:bg-[#1c1d25] hidden md:flex  flex-col justify-center items-center transition-all duration-1000">
      <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDeffaultOptions}
      />
      <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 text-3xl lg:text-4xl transition-all duration-300 text-center ">
        <h3 className="poppins-medium">
          Hi<span className="text-purple-500">!</span> Welcome to
          <span className="text-purple-500"> ClearTalk</span> Chat App
          <span className="text-purple-500">.</span>
        </h3>
      </div>
    </div>
  );
};

export default EmptyChatContainer;
