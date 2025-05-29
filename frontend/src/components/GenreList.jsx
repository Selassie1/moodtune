import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/genrelist.css'

const genres = ["Electronic", "Hip-Hop", "Pop", "Rock", "Jazz", "Dancehall", "Metal", "Reggae", "Funk", "Spoken Word"];

const GenreList = ({ onSelectSong }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [songs, setSongs] = useState([]);

  const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedGenre) {
        setLoading(true);
        setError(null);
        axios
        .get(`http://localhost:5001/api/audius/genre/${selectedGenre}`)
        .then((res) => {
            setSongs(res.data.data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Failed to fetch genre songs:", err);
            setError("Failed to load songs.");
            setLoading(false);
        });
    }
    }, [selectedGenre]);



  return (
    <div className="genre-list">
      <h2 className="title">Genres</h2>
      <div className="genre-container">
        <div className="genre-buttons">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={selectedGenre === genre ? "active" : ""}
            >
              {genre}
            </button>
          ))}
        </div>

          {/* 🟡 Loading/Error Feedback */}
          {loading && <p>Loading songs...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="song-list">
          {songs.map((song, idx) => (
            <div key={idx} onClick={() => onSelectSong(song)} className="song-item">
              <img src={song.artwork?.["150x150"] || '/placeholder.jpg'} alt={song.title || 'Untitled'} />
              <div>
                <h4>{song.title  || 'Untitled'}</h4>
                <p>{song.user?.name  || 'Unknown Artist'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenreList;
