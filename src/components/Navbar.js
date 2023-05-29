import React from "react";
import Image from "next/image";
import { Dosis, Inter, Salsa } from "next/font/google";
import Link from "next/link";
import { useRouter } from 'next/router'

const dosis = Dosis({ subsets: ["latin"], weight: ["600"] });
const inter = Inter({ subsets: ["latin"], weight: ["600"] });
const salsa = Salsa({ subsets: ["latin"], weight: ["400"] });

const navLinks = [
  {
    name: "Overview",
    path: "/",
  },
  {
    name: "Songs",
    path: "/songs",
  },
  // {
  //   name: "Albums",
  //   path: "/albums",
  // },
  {
    name: "Artists",
    path: "/artists",
  },
];

const Navbar = ({ handleShowSearchArea }) => {
  
const router = useRouter()
  return (
    <>
      <nav className="flex justify-between items-center mt-7">
        <Image
          src="/full logo.svg"
          alt="logo"
          className="md:inline hidden"
          width={120}
          height={120}
        />
        <Image
          src="/favicon.svg"
          alt="logo"
          className="md:hidden inline"
          width={50}
          height={50}
        />
        <div
          className={`searchbar overlay_am_border_white cursor-pointer lg:flex hidden max-w-[28em] w-[28em] relative ${dosis.className} text-lg`}
          onClick={() => {
            handleShowSearchArea(true);
          }}
        >
          <div className="border-l-4 border-t-4 border-b-4 p-4 flex justify-center items-center border-black rounded-tl-xl rounded-bl-xl">
            <Image src="/search_icon.svg" alt="logo" width={25} height={25} />
          </div>
          <input
            type="text"
            placeholder="Search music..."
            disabled
            className="w-full border-4 border-black rounded-tr-xl rounded-br-xl px-4 py-4 outline-0 text-2xl cursor-pointer"
          />
        </div>
        <div className={`login ${inter.className} flex items-center text-xl`}>
          <p className="mx-5 cursor-pointer">Login</p>
          <button className="primary-btn md:px-9 md:py-3 px-5 py-2 hover:bg-[var(--primary-color)] hover:text-white">
            Sign Up
          </button>
        </div>
      </nav>

      <div
        className={`header ${dosis.className} md:mt-[5em] mt-8 flex md:flex-nowrap flex-wrap justify-between items-center`}
      >
        <div>
          <h1 className="md:text-5xl text-4xl">Listen Everyday</h1>
          <h6
            className={`md:text-xl text-lg text-slate-500 ${salsa.className} mt-2`}
          >
            Explore millions of music according to your taste
          </h6>
        </div>
        <div
          className={`searchbar my-5 overlay_fixed_border_white lg:hidden flex w-[130%] mx-auto relative ${dosis.className} text-lg`}
          onClick={() => {
            handleShowSearchArea(true);
          }}
        >
          <div className="border-l-4 border-t-4 border-b-4 p-4 flex justify-center items-center border-black rounded-tl-xl rounded-bl-xl">
            <Image src="/search_icon.svg" alt="logo" width={25} height={25} />
          </div>
          <input
            type="text"
            placeholder="Search music..."
            className="w-full border-4 border-black rounded-tr-xl rounded-br-xl px-4 py-2 outline-0 text-2xl"
          />
        </div>
        <div className={`nav-links text-lg ${dosis.className} md:mx-0 mx-auto`}>
          <ul className="flex">
            {navLinks.map((link,index) => {
              return (
                <li key={index} className={`mx-4 relative text-[var(--light-grey)] hover:before:opacity-100 before:transition-all ${(router.asPath === link.path)?'active':''}`}>
                  <Link href={`${link.path}`}>{link.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <hr className="w-72 border-t-2 border-gray-200 my-5 mx-auto md:hidden block"></hr>
      </div>
    </>
  );
};

export default Navbar;
