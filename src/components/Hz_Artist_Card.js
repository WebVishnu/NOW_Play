import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Dosis, Salsa } from "next/font/google";
const dosis = Dosis({ subsets: ["latin"], weight: ["600"] });
const salsa = Salsa({ subsets: ["latin"], weight: ["400"] });
const Hz_Artist_Card = (props) => {
  const [randomHoverColour, setrandomHoverColour] = useState("#2AB3C0");
  useEffect(() => {
    setrandomHoverColour(getRandomHoverColour());
  }, []);
  return (
    <div
      className={`border-black border-[4px] rounded-xl p-2 ${randomHoverColour} hover:text-white m-2`}
    >
      <div
        className={`flex flex-wrap items-center justify-between ${dosis.className}`}
      >
        <div className="flex items-center">
          <Image
            src={props.url}
            alt="artist Image"
            height={200}
            width={200}
            className="h-[4.5em] w-[4.5em] rounded-full object-cover"
          />
          <div className=" mx-6">
            <h1 className="text-2xl">{props.name}</h1>
            <p className={`${salsa.className}  hover:text-white`}>{props.followers} Followers</p>
          </div>
        </div>
        {/* <div>
          <i className="bi bi-play-circle-fill text-5xl cursor-pointer me-5"></i>
        </div> */}
      </div>
    </div>
  );
};

const getRandomHoverColour = () => {
  const colours = [
    "hover:bg-[#2AB3C0]",
    "hover:bg-[#F8BC78]",
    "hover:bg-[#9178BE]",
  ];
  return colours[Math.floor(Math.random() * 3)];
};

export default Hz_Artist_Card;
