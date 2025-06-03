// PlaylistView.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlaylistView = ({ playlist, onBack }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    axios.get(`https://api.deezer.com/playlist/${playlist.id}&output=jsonp`)
      .then(res => {
        // Using JSONP may need adjustment with CORS or proxy
        if (res.data.tracks?.data) {
          setTracks(res.data.tracks.data);
        }
      })
      .catch(err => console.error(err));
  }, [playlist.id]);

  return (
    <div>
      <button onClick={onBack}>⬅ Back</button>
      <h2>{playlist.title}</h2>
      <img src={playlist.picture_big} alt={playlist.title} width="300px" />
      <ul>
        {tracks.map(track => (
          <li key={track.id}>
            {track.title} by {track.artist.name}
            <br />
            <audio controls src={track.preview}></audio>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistView;
