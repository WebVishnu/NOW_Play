import "@/styles/globals.css";
import Head from "next/head";
import "@/styles/css/border_style.css";
import AppContext from "@/context/AppContext";
import { useEffect, useState } from "react";
import { HotKeys } from "react-hotkeys";
import axios from "axios";
import { SessionProvider } from 'next-auth/react';

import Navbar from "@/components/Navbar";
import SearchArea from "@/components/SearchArea";
import Playbar from "@/components/Playbar";

// Main function
export default function App({ Component, pageProps, session }) {
  const [showSearchArea, setShowSearchArea] = useState(false);
  const [audio, setAudio] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState(null);

  // use effect
  useEffect(() => {
    axios.get("/api/getAllSongs").then((res) => {
      setSongs(res.data);
    });
  }, []);

  useEffect(() => {
    if (audio) {
      audio.url.pause();
      audio.url.play();
      setShowPlayer(true);
      setIsPlaying(true);
    }
  }, [audio]);

  function handleShowSearchArea(cmd) {
    setShowSearchArea(cmd);
  }

  return (
    <AppContext.Provider
      value={{
        audio,
        setAudio,
        showPlayer,
        setShowPlayer,
        playSong: () => {
          setIsPlaying(true);
          audio.url.play();
        },
        pauseSong: () => {
          setIsPlaying(false);
          audio.url.pause();
        },
        isPlaying,
        setIsPlaying,
        songs,
        setShowSearchArea,
      }}
    >
      
        <SessionProvider session={session}>
        <Head>
          <link rel="shortcut icon" href="/favicon.svg" />
          <title>NOW Play</title>
        </Head>
        <Navbar handleShowSearchArea={handleShowSearchArea} />
        {showPlayer && <Playbar audio={audio} />}
        <Component {...pageProps} />
        {showSearchArea && shouldExcludeComponent && (
          <HotKeys
          keyMap={{
            handleSearchArea: "Escape",
          }}
          handlers={{
            handleSearchArea: () => {
                setShowSearchArea(false);
              },
            }}
            >
            <SearchArea handleShowSearchArea={handleShowSearchArea} />
          </HotKeys>
        )}
        </SessionProvider>
    </AppContext.Provider>
  );
}
