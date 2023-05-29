import "@/styles/globals.css";
import Head from "next/head";
import "@/styles/css/border_style.css";
import AppContext from "@/context/AppContext";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { HotKeys } from "react-hotkeys";
import SearchArea from "@/components/SearchArea";
import Playbar from "@/components/Playbar";

export default function App({ Component, pageProps }) {
  const [showSearchArea, setShowSearchArea] = useState(false);
  const [audio, setAudio] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audio) {
      audio.url.pause();
      audio.url.play();
      setShowPlayer(true)
      setIsPlaying(true)
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
        playSong:()=>{setIsPlaying(true);audio.url.play()},
        pauseSong:()=>{setIsPlaying(false);audio.url.pause()},
        isPlaying,setIsPlaying
      }}
    >
      <Head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <title>NOW Play</title>
      </Head>
      <Navbar handleShowSearchArea={handleShowSearchArea} />
      {showPlayer && <Playbar audio={audio}/>}
      <Component {...pageProps} />
      {showSearchArea && (
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
    </AppContext.Provider>
  );
}
