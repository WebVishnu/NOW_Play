import React from "react";
import Image from "next/image";
import { Dosis, Salsa } from "next/font/google";

const dosis = Dosis({ subsets: ["latin"], weight: ["600"] });
const salsa = Salsa({ subsets: ["latin"], weight: ["400"] });

const searchResult = () => {
  return (
    <>
      <div className=" flex items-center">
        <Image
          src={"https://shorturl.at/imsC2"}
          alt="artist Image"
          height={200}
          width={200}
          className="h-[4em] w-[4em] rounded-full object-cover"
        />
        <span className="mx-7">
          <p className={`text-3xl ${dosis.className}`}>Arijit Singh</p>
          <p className={`text-slate-500 ${salsa.className}`}>20 Songs</p>
        </span>
      </div>
      <div className="flex items-center">
        <i className="bi bi-heart me-6 cursor-pointer text-3xl hover:text-red-600 md:inline hidden"></i>
        <i className="bi bi-play-circle-fill text-5xl cursor-pointer me-5 hover:text-[var(--primary-color)]"></i>
      </div>
    </>
  );
};

const SearchArea = ({ handleShowSearchArea,ref }) => {
  return (
    <div className="h-[100vh] w-[100vw] fixed top-0 left-0 bg-[#f8bc78d2] flex items-center flex-col z-10" ref={ref}>
      <div className="lg:w-[60vw] w-[93vw] mx-auto mt-12">
        <div
          className={`searchbar my-5 overlay_fixed_border_white flex w-100 mx-auto relative ${dosis.className} text-lg`}
        >
          <Image
            src="/Esc key.svg"
            alt="logo"
            width={50}
            height={50}
            className="absolute md:right-[7px] right-[6px] md:top-[7px] top-[6px] cursor-pointer"
            onClick={() => {
              handleShowSearchArea(false);
            }}
          />
          <div className="border-l-4 border-t-4 border-b-4 p-4 flex justify-center items-center cursor-pointer border-black rounded-tl-xl rounded-bl-xl">
            <Image src="/search_icon.svg" alt="logo" width={25} height={25} />
          </div>
          <input
            type="text"
            placeholder="Search music..."
            className="w-full border-4 border-black rounded-tr-xl rounded-br-xl px-4 py-2 outline-0 text-2xl"
          />
        </div>
      </div>
      <div className="lg:w-[60vw] w-[93vw] mx-auto">
        <ul className="flex flex-col">
          <li className="border-4 my-2 border-black rounded-2xl p-3 bg-white self-end md:w-[69%] flex items-center justify-between">
            {searchResult()}
          </li>
          <li className="border-4 my-2 border-black rounded-2xl p-3 bg-white self-end md:w-[69%] flex items-center justify-between">
            {searchResult()}
          </li>
          <li className="border-4 my-2 border-black rounded-2xl p-3 bg-white self-start md:w-[69%] flex items-center justify-between">
            {searchResult()}
          </li>
          <li className="border-4 my-2 border-black rounded-2xl p-3 bg-white self-start md:w-[69%] flex items-center justify-between">
            {searchResult()}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SearchArea;
