import React, { useState } from 'react';
import '../styles/feed.css'
import Billboard from '../components/Billboard';
import GenreList from '../components/GenreList';
import Player from '../components/Player';

const Beats = () => {
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <div className='beats feed'>
      <Billboard onSelectSong={setCurrentSong} />
      <GenreList onSelectSong={setCurrentSong}/>
      <Player song={currentSong} />
    </div>
  
);
};

export default Beats;
