import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Dosis, Salsa } from "next/font/google";
import AppContext from "@/context/AppContext";
const dosis = Dosis({ subsets: ["latin"], weight: ["600"] });
const salsa = Salsa({ subsets: ["latin"], weight: ["400"] });
let timer;

const Playbar = (props) => {
  const context = useContext(AppContext);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    startInterval();
    if (seconds === 29) {
      context.pauseSong();
      context.setShowPlayer(false);
      clearInterval(timer); // Clear the interval when the seconds reach 30
    }
    return () => clearInterval(timer);
  }, [seconds]);

  function startInterval() {
    timer = setInterval(() => {
      let newSec = seconds + 1;
      setSeconds(newSec);
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
  return (
    <div className="fixed bottom-7 flex left-1/2 transform -translate-x-1/2 md:w-[70vw] w-[90vw] p-2 bg-[var(--secondary-color)] border border-black rounded-lg overlay_fixed_border_white items-center justify-between z-10">
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
      <div className="cursor-pointer lg:flex hidden">
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
      <div className="text-3xl flex items-center me-4">
        <i
          className={`bi bi-${
            context.isPlaying ? "pause" : "play"
          }-circle-fill mx-1 text-5xl hover:text-white cursor-pointer`}
          onClick={context.isPlaying ? pauseSong : playSong}
        ></i>
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
