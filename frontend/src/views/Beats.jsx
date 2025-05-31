import React, { useState } from 'react';
import '../styles/feed.css'
import Billboard from '../components/Billboard';
import GenreList from '../components/GenreList';
import LoopingGif from '../components/LoopingGif';
import '../styles/beats.css';
import Headset3 from '../assets/gifs/headset3.gif';

const Beats = ({ onSelectSong }) => {

  return (
    <div className='beats feed' >
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
        <Billboard onSelectSong={onSelectSong} />
      </div>     
      <GenreList onSelectSong={onSelectSong}/>
    </div>
  
);
};

export default Beats;
