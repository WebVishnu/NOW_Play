import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Dosis, Salsa } from "next/font/google";
import AppContext from "@/context/AppContext";
const dosis = Dosis({ subsets: ["latin"], weight: ["600"] });
const salsa = Salsa({ subsets: ["latin"], weight: ["400"] });
let timer;
const MAX_PREVIEW_SECONDS = 30;

const Playbar = (props) => {
  const context = useContext(AppContext);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    startInterval();
    if (seconds >= MAX_PREVIEW_SECONDS) {
      context.pauseSong();
      context.setShowPlayer(false);
      clearInterval(timer); // Clear the interval when the seconds reach limit
    }
    return () => clearInterval(timer);
  }, [seconds]);

  useEffect(() => {
    clearInterval(timer)
    setSeconds(0)
    startInterval()
  }, [props.audio])
  
  function closePlayer(){
    context.setShowPlayer(false);
    context.pauseSong();
    clearInterval(timer);
  }

  function startInterval() {
    timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  }

  function playSong() {
    context.playSong();
    clearInterval(timer);
    startInterval();
  }

  function pauseSong() {
    context.pauseSong();
    clearInterval(timer);
  }

  const formattedTime = `${convertSecondsToTime(seconds)}`;
  const progress = (seconds / MAX_PREVIEW_SECONDS) * 100;
  return (
    <div className="fixed bottom-7 flex left-1/2 transform -translate-x-1/2 md:w-[70vw] w-[90vw] p-2 bg-[var(--secondary-color)] border border-black rounded-lg overlay_fixed_border_white items-center justify-between z-10 relative">
      <div className="flex items-center">
        <Image
        priority
          src={props.audio.imgUrl}
          alt="artist Image"
          height={200}
          width={200}
          className="h-[3.5em] w-[3.5em] rounded-full object-cover"
        />
        <div className="flex flex-col items-baseline justify-start">
          <h2
            className={`${dosis.className} text-2xl mx-5 cursor-pointer truncate sm:w-auto w-[5em]`}
          >
            {props.audio.songName}
          </h2>
          <p className={`${salsa.className} text-gray-600 text-sm`}>
            {formattedTime} / <span className="text-black">00:30</span>
          </p>
        </div>
      </div>
      
      <div className="text-3xl flex items-center me-4">
      <div className="cursor-pointer lg:flex hidden me-5">
        <Image
        priority
          src={"/sound-unscreen.gif"}
          alt="soung"
          height={50}
          width={50}
          className="mx-1"
        />
        <Image
        priority
          src={"/sound-unscreen.gif"}
          alt="soung"
          height={50}
          width={50}
          className="mx-1"
        />
        <Image
        priority
          src={"/sound-unscreen.gif"}
          alt="soung"
          height={50}
          width={50}
          className="mx-1"
        />
        <Image
        priority
          src={"/sound-unscreen.gif"}
          alt="soung"
          height={50}
          width={50}
          className="mx-1"
        />
        <Image
        priority
          src={"/sound-unscreen.gif"}
          alt="soung"
          height={50}
          width={50}
          className="mx-1"
        />
      </div>
        <i
          className={`bi bi-${
            context.isPlaying ? "pause" : "play"
          }-circle-fill mx-1 text-5xl hover:text-white cursor-pointer`}
          onClick={context.isPlaying ? pauseSong : playSong}
        ></i>
        <i
          className={`bi bi-x text-5xl hover:text-white cursor-pointer`}
          onClick={closePlayer}
        ></i>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300 rounded-b-lg overflow-hidden">
        <div
          className="h-full bg-black"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

function convertSecondsToTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}
export default Playbar;
