import React from "react";

const Artist_Card_Loading = () => {
  return (
    <div className="animate-pulse flex flex-col space-x-4 h-auto p-4 justify-center sm:m-4 m-1 sm:w-fit w-[10em] border-gray-700 border-[4px] rounded-lg">
      <div className="rounded-full bg-gray-300  sm:w-[200px] sm:h-[200px] h-[120px] w-[120px]"></div>
      <div className="h-4 bg-gray-400 rounded mt-5" style={{marginLeft:0}}></div>
      <div className="h-4 bg-gray-400 rounded mt-1 w-[40%]" style={{marginLeft:0}}></div>
    </div>
  );
};

export default Artist_Card_Loading;
