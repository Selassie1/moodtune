import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaHeart, FaSyncAlt } from "react-icons/fa";
import axios from "axios";
import '../styles/player.css';
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import Unknown from "../assets/examples/unknown.png";

const Player = ({ song }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [streamUrl, setStreamUrl] = useState(null);

  // Default values when `song` is null or undefined
  const defaultSong = {
    title: "No song selected",
    user: { name: "Unknown artist" },
    artwork: { "150x150": Unknown }
  };

  // Use the actual song if available, otherwise fall back to defaults
  const currentSong = song || defaultSong;

  // Fetch the stream URL when a new song is selected
  useEffect(() => {
    if (song?.id) {
      setIsPlaying(false); // Reset play state
      axios.get(`https://moodtune-m133.onrender.com/api/audius/stream/${song.id}`)
        .then(res => {
          setStreamUrl(res.data.stream_url);
        })
        .catch(err => {
          console.error("Failed to fetch stream URL:", err);
        });
    }
  }, [song]);

  // Play audio when stream URL is ready
  useEffect(() => {
    if (streamUrl && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Playback error:", err));
    }
  }, [streamUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Playback error:", err));
    }
  };

  return (
    <div className="player-container">
      <div className="song-info">
        <img 
          src={currentSong.artwork?.["150x150"]} 
          alt={currentSong.title} 
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150"; // Fallback if image fails to load
          }}
        />
        <div className="song-details">
          <div className="songtext">
            <h3>{currentSong.title}</h3>
            <p>{currentSong.user?.name || "Unknown artist"}</p>
          </div>
          <div className="controls">
            <button><MdSkipPrevious /></button>
            <button onClick={togglePlay}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button><MdSkipNext /></button>
          </div>
        </div>
      </div>

      <audio ref={audioRef}>
        {streamUrl && <source src={streamUrl} type="audio/mpeg" />}
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Player;