import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('track');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const res = await axios.get('/search', {
        params: { 
          q: query, 
          type: type,
          limit: 10  // Request fewer items for faster response
        }
      });
      
      // Deezer API returns results in res.data.data
      setResults(res.data.data || []);
      
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

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
              <li key={item.id} className="result-item">
                {type === 'track' && (
                  <div className="track">
                    <img 
                      src={item.album?.cover_small} 
                      alt={item.album?.title} 
                      className="cover-image"
                    />
                    <div className="track-info">
                      <strong>{item.title}</strong>
                      <span>{item.artist.name}</span>
                      {item.preview && (
                        <audio controls src={item.preview} className="audio-preview" />
                      )}
                    </div>
                  </div>
                )}

                {type === 'artist' && (
                  <div className="artist">
                    <img 
                      src={item.picture_medium} 
                      alt={item.name} 
                      className="artist-image"
                    />
                    <div className="artist-info">
                      <strong>{item.name}</strong>
                      <span>{item.nb_fan?.toLocaleString()} fans</span>
                    </div>
                  </div>
                )}

                {type === 'album' && (
                  <div className="album">
                    <img 
                      src={item.cover_medium} 
                      alt={item.title} 
                      className="album-cover"
                    />
                    <div className="album-info">
                      <strong>{item.title}</strong>
                      <span>{item.artist.name}</span>
                      <span>{item.release_date}</span>
                    </div>
                  </div>
                )}

                {type === 'playlist' && (
                  <div className="playlist">
                    <img 
                      src={item.picture_medium} 
                      alt={item.title} 
                      className="playlist-image"
                    />
                    <div className="playlist-info">
                      <strong>{item.title}</strong>
                      <span>By {item.user?.name}</span>
                      <span>{item.nb_tracks} tracks</span>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;