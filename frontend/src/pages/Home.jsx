import React, { useState } from 'react';
import '../styles/home.css';
import NavBar from '../components/NavBar';
import Feed from '../views/Feed';
import Beats from '../views/Beats';
import Radio from '../views/Radio';
import Playlists from '../views/Playlists';
import Favorites from '../views/Favorites';

export default function Home({ username }) {
  const [activeTab, setActiveTab] = useState('feed');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    window.location.href = '/';
  };

  const renderView = () => {
    switch (activeTab) {
      case 'feed':
        return <Feed />;
      case 'beats':
        return <Beats />;
      case 'radio':
        return <Radio />;
      case 'playlists':
        return <Playlists />;
      case 'favorites':
        return <Favorites />;
      default:
        return <Feed />;
    }
  };

  return (
    <div className="home-wrapper">
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="home-content">
        <div className="home-header">
          <h1>Welcome, {username}!</h1>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>

        <div className="main-view">
          {renderView()}
        </div>
      </div>
      <div className="right-section"></div>
    </div>
  );
}
