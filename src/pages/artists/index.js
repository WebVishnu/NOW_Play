import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Vt_Artist_Card from "@/components/Vt_Artist_Card";
import Artist_Card_Skeleton from "@/components/Artist_Card_Skeleton";

const artist = () => {
  let AllArtists = [];
  const [artists, setArtists] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await axios.get("/api/getAllSongs");
        setArtists(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArtist();
  }, []);
  if (loading) {
    return (
        <div className="flex md:justify-start justify-center flex-wrap md:mt-12 mt-0 mb-12">
          <Artist_Card_Skeleton />
          <Artist_Card_Skeleton />
          <Artist_Card_Skeleton />
          <Artist_Card_Skeleton />
          <Artist_Card_Skeleton />
          <Artist_Card_Skeleton />
          <Artist_Card_Skeleton />
          <Artist_Card_Skeleton />
          <Artist_Card_Skeleton />
          <Artist_Card_Skeleton />
          <Artist_Card_Skeleton />
          <Artist_Card_Skeleton />
        </div>
    );
  }
  return (
      <div className="flex md:justify-start justify-center flex-wrap md:mt-12 mt-0 mb-12">
        {artists &&
          artists.map((artist, index) => {
            if (!AllArtists.includes(artist.artistName)) {
              AllArtists.push(artist.artistName);
              return (
                <Vt_Artist_Card
                  key={index}
                  name={`${artist.artistName}`}
                  url={`${artist.artistImg}`}
                  followers={`${artist.artistFollowers}`}
                />
              );
            }
          })}
      </div>
  );
};

// loading component

export default artist;
