import React, { useState } from 'react';
import AiChat from './AiChat';
import Search from '../views/Search';
import Player from './Player';

const DJTunzContainer = () => {
  const [keywords, setKeywords] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);

  const handleAIResponse = (response, extractedKeywords) => {
    setKeywords(extractedKeywords); // triggers new search
  };

  const handleSongSelect = (song) => {
    setSelectedSong(song);
  };

  return (
    <div>
      <AiChat onResponse={handleAIResponse} />
      {keywords && (
        <Search
          query={keywords}
          type="playlist"
          onAutoSelectTrack={handleSongSelect}
        />
      )}
      <Player song={selectedSong} />
    </div>
  );
};

export default DJTunzContainer;
