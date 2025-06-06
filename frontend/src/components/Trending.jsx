// Trending.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlaylistView from '../components/PlaylistView';
import '../styles/trending.css'; 
import { FaPlay } from "react-icons/fa6";
import { IoChevronForward } from "react-icons/io5";

const Trending = () => {
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
    axios.get('https://moodtune-m133.onrender.com/trending')
      .then(res => {
        setTracks(res.data.tracks);
        setArtists(res.data.artists);
        setPlaylists(res.data.playlists);
      })
      .catch(err => console.error(err));
  }, []);

  if (selectedPlaylist) {
    return (
      <PlaylistView 
        playlist={selectedPlaylist} 
        onBack={() => setSelectedPlaylist(null)} 
      />
    );
  }

  return (
    <div>
      <div className="top-text">
        <h2>Trending Playlists</h2>
        <span>View all <IoChevronForward /></span>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }} className='playlist'>
        {playlists.map(playlist => (
          <div 
            key={playlist.id} 
            onClick={() => setSelectedPlaylist(playlist)}
            style={{ cursor: 'pointer', width: '200px' }}
            className='playlist-item'
          >
            <img src={playlist.picture} alt={playlist.title} width="100%" />
            <p>{playlist.title}</p>
            <FaPlay className='play-icon'/>
          </div>
        ))}
      </div>
      


      <h2>Trending Artists</h2>
      <div className="artist-list">
        <ul className='artist-group'>
        {artists.map(artist => (
          <li key={artist.id} className='artist-item'>
            <h2># {artist.position}</h2>
            <div className="right-side">
              <img src={artist.picture_medium} alt={artist.name} /> 
              <span>{artist.name}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="more"></div>
      </div>
      

      {/* <h2>Trending Songs</h2>
      <ul className='artist-group song-group'>
        {tracks.map(track => (
          <li key={track.id} style={{ marginBottom: '1rem' }} className='song-item'>
            <img src={track.album?.cover_medium} alt={track.title} width="100" />
            <div className="details">
              <div>{track.album?.title}</div>
              <div>{track.artist.name}</div>
              <audio controls src={track.preview}></audio>
            </div>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Trending;
