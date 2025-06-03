// Genre.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Genre = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/deezer/genres')
      .then(res => {
        setGenres(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>🎶 Music Genres</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {genres.map(genre => (
          <div key={genre.id} style={{ textAlign: 'center' }}>
            <img src={genre.picture_medium} alt={genre.name} width="150" />
            <p>{genre.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genre;
