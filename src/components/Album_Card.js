import React, { useEffect, useState } from "react";
import { getRandomColour } from "./Music_Card";
import { Dosis, Salsa } from "next/font/google";
import Image from "next/image";
// fonts
const dosis = Dosis({ subsets: ["latin"], weight: ["600"] });
const salsa = Salsa({ subsets: ["latin"], weight: ["400"] });

// component
const Album_Card = (props) => {
  const [randomClass, setRandomClass] = useState("primary");
  useEffect(() => {
    setRandomClass(`overlay_am_border_${getRandomColour()}`);
  }, []);
  
  return (
    <div
      className={`${randomClass} relative cursor-pointer border-black border-[4px] sm:w-fit w-[10em]  ${dosis.className} flex items-center flex-col  p-3 sm:m-4 m-1 md:mt-12 `}
    >
      <div className="relative">
        <Image
          src={props.url}
          className="object-cover sm:w-[200px] sm:h-[200px] rounded-lg h-[120px] w-[140px]"
          height={200}
          width={200}
          alt="Song img"
        />
      </div>
      <div className={`${dosis.className} mt-3`}>
        <p className="truncate sm:w-[8em] w-[6em] sm:text-2xl text-lg">
          {props.name}
        </p>
        <p className={`${salsa.className} text-gray-500 flex justify-between`}>
          <span>{props.total_tracks} songs</span>
          <span>{props.total_tracks} <i className="bi bi-suit-heart-fill text-red-700"></i></span>
        </p>
      </div>
    </div>
  );
};

export default Album_Card;
