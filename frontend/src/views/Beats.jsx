import React, { useState } from 'react';
import '../styles/feed.css'
import Billboard from '../components/Billboard';
import GenreList from '../components/GenreList';
import Player from '../components/Player';
import LoopingGif from '../components/LoopingGif';
import '../styles/beats.css';
import Headset3 from '../assets/gifs/headset3.gif';

const Beats = () => {
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <div className='beats feed'>
      <div className="top">
        <LoopingGif 
          src={Headset3} 
          alt="Description of video"
          width="600px"
        />
        <h1>Produce. Create. Dominate.</h1>
        <LoopingGif 
          src={Headset3} 
          alt="Description of video"
          width="600px"
        />
      </div>
      <div className="ranking">
        <h2 className="title">Billboard Ranking</h2>
        <Billboard onSelectSong={setCurrentSong} />
      </div>     
      <GenreList onSelectSong={setCurrentSong}/>
      <div className="player">
        <Player song={currentSong} />
      </div>
    </div>
  
);
};

export default Beats;
