import React from 'react';
import '../styles/feed.css'
import DJTunzContainer from '../components/DJTunzContainer';

const Favorites = () => {
  return (
    <div className='favorites feed'>
      <h1 className="text-2xl font-bold">Favorites Section</h1>
      <DJTunzContainer />
    </div>
  
);
};

export default Favorites;
