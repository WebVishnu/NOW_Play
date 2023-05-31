import React, { useEffect, useState } from "react";
import Image from "next/image";
// Fonts
import "bootstrap-icons/font/bootstrap-icons.css";
import { Dosis, Salsa } from "next/font/google";
const dosis = Dosis({ subsets: ["latin"], weight: ["600"] });
const salsa = Salsa({ subsets: ["latin"], weight: ["400"] });

// component
const Music_Card = (props) => {
  const audio = props.audio
  const setAudio = props.setAudio
  if(props.key==47){
    props.setCssLoaded(true)
  }
  const [randomClass, setRandomClass] = useState("primary");
  const [randomleft, setrandomLeft] = useState(0);
  let num = Math.floor(Math.random() * 80);
  useEffect(() => {
    setRandomClass(`overlay_am_border_${getRandomColour()}`);
    setrandomLeft(num);
  }, []);

  return (
    <div
      onClick={() => {
        audio ? audio.url.pause() : null;
        setAudio({
          url:new Audio(props.previewUrl),
          songName:props.name,
          imgUrl:props.imgUrl,
        });
      }}
      className={`${randomClass} 
      ${
        randomleft > 60
          ? randomleft > 80
            ? `rotate-[-2deg]`
            : `rotate-[-1deg]`
          : randomleft < 15
          ? `rotate-[2deg]`
          : `rotate-[1deg]`
      } relative cursor-pointer border-black border-[4px] sm:w-fit w-[10em]  ${
        dosis.className
      } flex items-center flex-col  p-2 sm:m-4 m-1 mt-12 `}
    >
      <Image
        src={"/hook.svg"}
        height={40}
        width={30}
        style={{ left: `${randomleft}%` }}
        className={`absolute top-[-25px] z-10`}
        alt="Song img"
      />
      {props.imgUrl && (
        <div className="relative">
          <Image
            src={props.imgUrl}
            className="object-cover sm:w-[200px] sm:h-[200px] rounded-lg h-[120px] w-[140px]"
            height={200}
            width={200}
            alt="Song img"
          />
        </div>
      )}
      <div className={`${dosis.className}`}>
        <p className="truncate sm:w-[8em] w-[7em] sm:text-2xl text-lg mt-3">
          {props.name}
        </p>
        <p
          className={`${salsa.className} truncate w-[9em] sm:text-xl text-xs text-gray-500 flex justify-between items-center`}
        >
          <span className="sm:text-xl text-lg"> {formatTime(props.duration)}</span>
          <span>
            <i className="bi bi-play-circle-fill text-4xl cursor-pointer text-black hover:text-[var(--primary-color)]"></i>
          </span>
        </p>
      </div>
      {/* <div className="flex w-[100%] justify-between sm:p-3 p-0 px-2 items-center sm:text-xl text-xs">
        <p className={`${salsa.className} text-gray-500`}>{formatTime(props.duration)}</p>
        <i className="bi bi-play-circle-fill text-4xl cursor-pointer"></i>
      </div> */}
    </div>
  );
};

export const getRandomColour = () => {
  const colours = ["primary", "secondary", "purple", "white", "light_grey"];
  return colours[Math.floor(Math.random() * 5)];
};

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

export default Music_Card;
