import Music_Card from "@/components/Music_Card";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Album_Card_Skeleton from "@/components/Album_Card_Skeleton";
import AppContext from "@/context/AppContext";

const Songs = () => {
  const context = useContext(AppContext);
  // global variables
  const [songs, setSongs] = useState(null);
  const [Loading, setLoading] = useState(true);
  let LoadingSkeletons = { songs: [] };
  // use effect
  useEffect(() => {
    axios.get("/api/getAllSongs").then((res) => {
      setSongs(res.data);
      setLoading(false);
    });
  }, []);
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
    <div className="flex md:justify-start justify-around flex-wrap md:mt-12 mt-0 mb-12">
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
