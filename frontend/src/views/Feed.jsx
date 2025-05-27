import React from 'react';
import AiChat from '../components/AiChat';
import '../styles/feed.css'

const Feed = () => {
  return (
    <div className='feed'>
      <h1 className="text-2xl font-bold">Feed Section</h1>
      <AiChat />
    </div>
  
);
};

export default Feed;
