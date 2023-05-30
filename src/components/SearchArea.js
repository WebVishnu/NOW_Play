import React, { useContext, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Dosis, Salsa } from "next/font/google";
import AppContext from "@/context/AppContext";

const dosis = Dosis({ subsets: ["latin"], weight: ["600"] });
const salsa = Salsa({ subsets: ["latin"], weight: ["400"] });

function playSong(song, context) {
  if(song){
    if(context.audio){
      context.pauseSong();
    }
    context.setAudio({
      url: new Audio(song.previewUrl),
      songName: song.songName,
      imgUrl: song.songCoverImg,
    });
    context.setShowPlayer(true);
    context.setShowSearchArea(false);
  }
}

const searchResultCom = (results, context) => {
  return (
    <>
      {results &&
        results.map((r, i) => {
          return (
            <li
              key={i}
              className="border-4 my-2 border-black rounded-2xl p-3 bg-white self-end w-[100%] flex items-center justify-between"
            >
              <div className=" flex items-center">
                <Image
                  src={r.songCoverImg}
                  alt="artist Image"
                  height={200}
                  width={200}
                  className="h-[4em] w-[4em] rounded-full object-cover"
                />
                <span className="mx-7">
                  <p className={`sm:text-3xl text-xl ${dosis.className} truncate xl:w-auto sm:w-[12em] w-[8em]`}>{r.songName}</p>
                  <p className={`text-slate-500 ${salsa.className}`}>
                    {r.artistName}
                  </p>
                </span>
              </div>
              <div className="flex items-center">
                {/* <i className="bi bi-heart me-6 cursor-pointer text-3xl hover:text-red-600 md:inline hidden"></i> */}
                <i
                  className="bi bi-play-circle-fill text-5xl cursor-pointer me-5 hover:text-[var(--primary-color)]"
                  onClick={() => {
                    playSong(r, context);
                  }}
                ></i>
              </div>
            </li>
          );
        })}
    </>
  );
};

const SearchArea = ({ handleShowSearchArea, ref }) => {
  const [searchResults, setSearchResults] = useState("");
  const context = useContext(AppContext);
  const searchInputRef = useRef(null);

  function search(songs, query) {
    if (query != null && songs) {
      const results = songs.filter((obj) => {
        if (
          obj.songName.toLowerCase().includes(query.toLowerCase()) ||
          obj.artistName.toLowerCase().includes(query.toLowerCase())
        ) {
          return obj;
        }
      });
      setSearchResults(searchResultCom(results, context));
    }
  }

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <div
      className="h-[100vh] w-[100vw] fixed top-0 left-0 bg-[#f8bc78d2] flex items-center flex-col z-10"
      ref={ref}
    >
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
            onChange={(e) => {
              search(context.songs, e.target.value);
            }}
            ref={searchInputRef}
          />
        </div>
      </div>
      <div className="lg:w-[60vw] w-[93vw] mx-auto">
        <ul className="flex flex-col h-[75vh] overflow-auto scrollbar px-2">
          {searchResults}
        </ul>
      </div>
    </div>
  );
};

export default SearchArea;
