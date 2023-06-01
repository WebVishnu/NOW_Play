import AppContext from "@/context/AppContext";
import React, { useState, useEffect, useContext } from "react";

import Music_Card from "@/components/Music_Card";
import Album_Card_Skeleton from "@/components/Song_Card_Skeleton";

const Songs = () => {
  const context = useContext(AppContext);
  let songs = context.songs
  // global variables
  const [Loading, setLoading] = useState(true);
  let LoadingSkeletons = { songs: [] };

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
  }
  //  ===================================
  //  LOADING
  //  ===================================
  if (Loading) {
    return (
      <div className="flex md:justify-start justify-center flex-wrap md:mt-12 mt-0 mb-12">
        {LoadingSkeletons.songs.map((song, index) => {
          return song;
        })}
      </div>
    );
  }
  // =================================================================================================
  // MAIN CONTENT
  // =================================================================================================
  return (
    <div className="flex md:justify-start justify-around flex-wrap md:mt-12 mt-0 pb-12">
      {songs &&
        songs.map((song, index) => {
          if (song) {
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
  );
};

export default Songs;
