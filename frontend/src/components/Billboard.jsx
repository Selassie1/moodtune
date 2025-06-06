import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/billboard.css";

const Billboard = ({ onSelectSong }) => {
  const [topSongs, setTopSongs] = useState([]);

  useEffect(() => {
    axios
      .get("https://moodtune-m133.onrender.com/api/audius/trending")
      .then((res) => {
        setTopSongs(res.data.data.slice(0, 2)); // Get first and second song
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (topSongs.length < 2) return <p>Loading...</p>;

  return (
    <div className="billboard-container">
      {/* First Song */}
      <div className="billboard first" onClick={() => onSelectSong(topSongs[0])}>
        <div className="rank">
          <h1>#1</h1>
        </div>
        <img
          src={topSongs[0].artwork?.["1000x1000"] || "/placeholder.jpg"}
          alt={topSongs[0].title || "Untitled"}
        />
        <div className="details">
          <h2>{topSongs[0].title || "Untitled"}</h2>
          <p>{topSongs[0].user?.name || "Unknown Artist"}</p>
        </div>
      </div>

      <div className="billboard second" onClick={() => onSelectSong(topSongs[1])}>
        <div className="rank">
          <h1>#2</h1>
        </div>
        <img
          src={topSongs[1].artwork?.["1000x1000"] || "/placeholder.jpg"}
          alt={topSongs[1].title || "Untitled"}
        />
        <div className="details">
          <h2>{topSongs[1].title || "Untitled"}</h2>
          <p>{topSongs[1].user?.name || "Unknown Artist"}</p>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
