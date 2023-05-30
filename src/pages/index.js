import { Dosis } from "next/font/google";
import Music_Card, { formatTime } from "@/components/Music_Card";
import Artist_Card from "@/components/Hz_Artist_Card";
import Playbar from "@/components/Playbar";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Hz_Artist_Card from "@/components/Hz_Artist_Card";
import Album_Card_Skeleton from "@/components/Album_Card_Skeleton";
import Layout from "@/components/Layout";
import AppContext from "@/context/AppContext";

const dosis = Dosis({ subsets: ["latin"], weight: ["600"] });

export default function Home() {
  const context = useContext(AppContext);
  // Global variables
  let AllArtists = [];
  let LoadingSkeletons = { songs: [], artists: [] };

  // use State variable
  const songs = context.songs;
  const [loading, setLoading] = useState(true);

  // use effect
  useEffect(() => {
    if (songs) {
      setLoading(false);
    }
  }, [songs]);

  // Adding loading elements in a array
  for (let i = 0; i < 12; i++) {
    LoadingSkeletons.songs.push(
      <div key={i}>
        <Album_Card_Skeleton />
      </div>
    );
    LoadingSkeletons.artists.push(
      <div className="animate-pulse my-2" key={i}>
        <div className="h-20 w-100 bg-gray-300 rounded-lg"></div>
      </div>
    );
  }
  //  ===================================
  //  LOADING
  //  ===================================
  if (loading) {
    return (
      <div className="grid grid-cols-12 md:mt-12 mt-0">
        <div className="2xl:col-span-8 xl:col-span-8 lg:col-span-7 col-span-12 flex md:justify-start justify-around flex-wrap mb-[10em]">
          {LoadingSkeletons.songs.map((ele) => {
            return ele;
          })}
        </div>
        <div className="xl:col-span-4 lg:col-span-5 lg:flex hidden flex-col">
          <div className="sticky top-[4em]">
            <h1 className={`text-4xl mb-3 ${dosis.className}`}>Top Artists</h1>
            <div className="overflow-auto h-[75vh] w-100 scrollbar mt-5">
              {LoadingSkeletons.artists.map((ele, index) => {
                if (index < 6) {
                  return ele;
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =================================================================================================
  // MAIN CONTENT
  // =================================================================================================

  return (
    <>
      <div className="grid grid-cols-12 md:mt-12 mt-0">
        <div className="2xl:col-span-8 xl:col-span-8 lg:col-span-7 col-span-12 flex md:justify-start justify-around flex-wrap mb-[10em]">
          {songs &&
            songs.map((song, index) => {
              if (index < 48) {
                return (
                  <Music_Card
                    key={index}
                    name={song.songName}
                    duration={song.duration}
                    imgUrl={song.songCoverImg}
                    previewUrl={song.previewUrl}
                    setAudio={context.setAudio}
                    audio={context.audio}
                  />
                );
              }
            })}
        </div>
        <div className="xl:col-span-4 lg:col-span-5 lg:flex hidden flex-col">
          <div className="sticky top-[4em]">
            <h1 className={`text-4xl mb-3 ${dosis.className}`}>Top Artists</h1>
            <div className="overflow-auto h-[75vh] scrollbar">
              {songs &&
                songs.map((artist, index) => {
                  if (index < 50) {
                    if (!AllArtists.includes(artist.artistName)) {
                      AllArtists.push(artist.artistName);
                      return (
                        <Hz_Artist_Card
                          key={index}
                          name={`${artist.artistName}`}
                          url={`${artist.artistImg}`}
                          followers={`${artist.artistFollowers}`}
                        />
                      );
                    }
                  }
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
