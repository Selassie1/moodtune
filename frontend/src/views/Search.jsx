import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/search.css'

const Search = ({ query: initialQuery, type: initialType = 'track', onAutoSelectTrack }) => {
  const [query, setQuery] = useState(initialQuery || '');
  const [type, setType] = useState(initialType);
  const [results, setResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]); // ✅ NEW STATE
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlaylistTracks = async (playlistId) => {
    try {
      const res = await axios.get(`http://localhost:5001/playlist/${playlistId}`); // ✅ USE BACKEND
      const tracks = res.data.tracks || [];
      setPlaylistTracks(tracks); // ✅ SET TRACKS
      if (tracks.length > 0) {
        onAutoSelectTrack?.(tracks[0]);
      }
    } catch (err) {
      console.error("Failed to load playlist tracks:", err);
    }
  };

  const handleSearch = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPlaylistTracks([]); 

    try {
      const res = await axios.get('http://localhost:5001/search', {
        params: { q: query, type, limit: 10 }
      });

      const data = res.data.data || [];
      setResults(data);

      
      if (type === 'playlist' && data.length > 0) {
        await fetchPlaylistTracks(data[0].id);
      }

    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setType(initialType);
      handleSearch();
    }
  }, [initialQuery, initialType]);

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-controls">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for music..."
            className="search-input"
          />
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)}
            className="search-type"
          >
            <option value="track">Tracks</option>
            <option value="artist">Artists</option>
            <option value="album">Albums</option>
            <option value="playlist">Playlists</option>
          </select>
          <button 
            type="submit" 
            disabled={isLoading}
            className="search-button"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && <div className="error-message">{error}</div>}

      <div className="results-container">
        {isLoading ? (
          <div className="loading">Loading results...</div>
        ) : (
          <ul className="results-list">
            {results.map((item) => (
              <li key={item.id} className="result-item" onClick={() => type === 'playlist' && fetchPlaylistTracks(item.id)}>
                {type === 'track' && (
                  <div className='contain'>
                    <div className="track">
                      <img src={item.album?.cover_small} alt={item.album?.title} className="cover-image" />
                      <div className="track-info">
                        <div className="text-details">
                          <h1>{item.title}</h1>
                          <span>{item.artist.name}</span>
                        </div>
                        
                      </div>
                      
                    </div>
                    {item.preview && <audio controls src={item.preview} className="audio-preview" />}
                  </div>
                )}

                {type === 'artist' && (
                  <div className="artist">
                    <img src={item.picture_medium} alt={item.name} className="artist-image" />
                    <div className="artist-info">
                      <strong>{item.name}</strong>
                      <span>{item.nb_fan?.toLocaleString()} fans</span>
                    </div>
                  </div>
                )}

                {type === 'album' && (
                  <div className="album">
                    <img src={item.cover_medium} alt={item.title} className="album-cover" />
                    <div className="album-info">
                      <strong>{item.title}</strong>
                      <span>{item.artist.name}</span>
                      <span>{item.release_date}</span>
                    </div>
                  </div>
                )}

                {type === 'playlist' && (
                  <div className="playlist">
                    <img src={item.picture_medium} alt={item.title} className="playlist-image" />
                    <div className="playlist-info">
                      <strong>{item.title}</strong>
                      <span>By {item.user?.name}</span>
                      <span>{item.nb_tracks} tracks</span>
                      <em className="click-to-view">(Click to load & play)</em>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {playlistTracks.length > 0 && (
        <div className="playlist-tracks">
          <h3>Playlist Tracks</h3>
          <ul className="track-list">
            {playlistTracks.map((track) => (
              <li key={track.id} className="track-item">
                <strong>{track.title}</strong> — {track.artist.name}
                {track.preview && <audio controls src={track.preview} className="audio-preview" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
