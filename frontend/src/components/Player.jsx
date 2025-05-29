import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaHeart, FaSyncAlt, FaStepForward, FaStepBackward, FaHandsHelping } from "react-icons/fa";
import axios from "axios";
import '../styles/player.css'

const Player = ({ song }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [streamUrl, setStreamUrl] = useState(null);

  // Fetch the stream URL when a new song is selected
  useEffect(() => {
    if (song?.id) {
      setIsPlaying(false); // Reset play state
      axios.get(`http://localhost:5001/api/audius/stream/${song.id}`)
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

  if (!song) return null;

  return (
    <div className="player-container">
      <div className="song-info">
        <img src={song.artwork?.["150x150"]} alt={song.title} />
        <div>
          <h3>{song.title}</h3>
          <p>{song.user?.name}</p>
        </div>
      </div>

      <div className="controls">
        <button><FaSyncAlt /></button>
        <button><FaStepBackward /></button>
        <button onClick={togglePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button><FaStepForward /></button>
        <button><FaHeart /></button>
      </div>

      <audio ref={audioRef}>
        {streamUrl && <source src={streamUrl} type="audio/mpeg" />}
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Player;
