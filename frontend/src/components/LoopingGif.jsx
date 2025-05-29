import React from 'react';
import '../styles/gif.css';

const LoopingGif = ({ src, alt = '', width = '100%' }) => {
  return (
    <div className="gif">
        <img 
        src={src} 
        alt={alt}
        width={width}
        />
    </div>
  );
};

export default LoopingGif;