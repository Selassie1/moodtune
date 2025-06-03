import React from 'react';
import AiChat from '../components/AiChat';
import '../styles/feed.css'
import Phone from '../assets/images/phones.png';
import Last from '../assets/images/31.png';
import Trending from '../components/Trending';
import Search from '../components/Search';
import Genre from '../components/Genre';

const Feed = () => {
  return (
    <div className='feed'>
      <div className="top">
        <div className="left">
          <img src={Last} alt="" />
        </div>
        <div className="right">
          <div className="text">
            <h1>Your Feed...</h1>
            <p>Discover new music, artists, and trends tailored to your taste.</p>
          </div>
          
          <img src={Last} alt="" className='laptop'/>
        </div>
      </div>
      <Trending />
      <Search />
      <Genre />
      <div className="ai">
        <AiChat />
      </div>
    </div>
  
);
};

export default Feed;
