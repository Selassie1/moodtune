import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [userId, setUserId] = useState(''); // Replace with actual logic (e.g. from context or login)

  // Fetch playlists (adjust route if different)
  useEffect(() => {
    axios.get('http://localhost:5001/api/playlists')
      .then(res => setPlaylists(res.data))
      .catch(err => console.error('Error fetching playlists:', err));
  }, []);

  const handleCreatePlaylist = async () => {
    if (!userId || !newPlaylistName) {
      alert("User ID and Playlist Name are required.");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5001/api/create', {
        user_id: userId,
        name: newPlaylistName
      });

      // Add new playlist locally if successful
      if (res.data.playlist_id) {
        setPlaylists(prev => [
          ...prev,
          { id: res.data.playlist_id, name: newPlaylistName, user_id: userId }
        ]);
        setNewPlaylistName('');
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
      alert(error.response?.data?.error || 'Failed to create playlist');
    }
  };

  return (
    <div className="playlists feed px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">🎵 Your Playlists</h1>

      {/* Create Playlist Form */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Create a New Playlist</h2>
        <input
          type="text"
          placeholder="Your User ID"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Playlist Name"
          value={newPlaylistName}
          onChange={e => setNewPlaylistName(e.target.value)}
          className="block w-full mb-2 p-2 border rounded"
        />
        <button
          onClick={handleCreatePlaylist}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Playlist
        </button>
      </div>

      {/* Playlist Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="bg-white shadow rounded p-4">
            <h3 className="text-lg font-semibold">{playlist.name}</h3>
            <p className="text-sm text-gray-600">User: {playlist.user_id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlists;
