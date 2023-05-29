import React from "react";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { HotKeys } from "react-hotkeys";
import SearchArea from "@/components/SearchArea";
import Playbar from "./Playbar";

const Layout = ({ children, props }) => {
  // constants
  const [showSearchArea, setShowSearchArea] = useState(false);
  const [showPlayer, setShowPlayer] = useState(true);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setisPlaying] = useState(false);


  //use Effect
  useEffect(() => {
    if (audio) {
      if (!isPlaying) {
        audio.url.play();
        setisPlaying(true);
        setShowPlayer(true);
      } else {
        audio.url.pause();
        setisPlaying(false);
      }
    }
  }, [audio]);
  // functions
  function handleShowSearchArea(cmd) {
    setShowSearchArea(cmd);
  }

  return (
    <div>
      {/* NAVBAR */}
      <Navbar handleShowSearchArea={handleShowSearchArea} />
      {/* SEARCHAREA */}
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
      {showPlayer && (
        <Playbar
          audio="{audio}"
          setShowPlayer="{setShowPlayer}"
          setAudio="{setAudio}"
          isPlaying="{isPlaying}"
          setisPlaying="{setisPlaying}"
          playSong="{playSong}"
          pauseSong="{pauseSong}"
        />
      )}

      {children}
    </div>
  );
};

export default Layout;
