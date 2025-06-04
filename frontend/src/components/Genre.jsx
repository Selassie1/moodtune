// Genre.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/genre.css'; 

const Genre = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/genres')
      .then(res => {
        setGenres(res.data.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Music Genres</h2>
      <div style={{ display: 'flex', gap: '1rem' }} className='genre-group'>
        {genres.map(genre => (
          <div key={genre.id} style={{ textAlign: 'center' }} className='genre-item'>
            <img src={genre.picture_medium} alt={genre.name} width="150" />
            <p>{genre.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genre;
