import React, { useEffect, useState } from "react";
import axios from "axios";

const Billboard = ({ onSelectSong }) => {
  const [topSong, setTopSong] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/audius/trending")
      .then((res) => {
        setTopSong(res.data.data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!topSong) return <p>Loading...</p>;

  return (
    <div className="billboard" onClick={() => onSelectSong(topSong)}>
      <img
        src={topSong.artwork?.["1000x1000"] || "/placeholder.jpg"}
        alt={topSong.title || "Untitled"}
      />
      <h2>{topSong.title || "Untitled"}</h2>
      <p>{topSong.user?.name || "Unknown Artist"}</p>
    </div>
  );
};

export default Billboard;
