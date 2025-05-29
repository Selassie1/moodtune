import React, { useState } from 'react';
import '../styles/home.css';
import NavBar from '../components/NavBar';
import Feed from '../views/Feed';
import Beats from '../views/Beats';
import Radio from '../views/Radio';
import Playlists from '../views/Playlists';
import Favorites from '../views/Favorites';
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { GoBellFill } from "react-icons/go";
import { CiSearch } from "react-icons/ci";

export default function Home({ username }) {
  const [activeTab, setActiveTab] = useState('feed');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    window.location.href = '/';
  };


  const handleChange = (event) => {
    setSearchTerm(event.target.value);
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
      <NavBar className='navbar' activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="home-content">
        <div className="home-header">
          <div className="left">
            <CiSearch className='icon'/>
            <input
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="right">
              <GoBellFill className='icon'/>
              <FaUserCircle className='icon'/>
            <button onClick={handleLogout} className="logout-button">
              <span>Logout</span><FiLogOut />
            </button>
          </div>
          
        </div>

        <div className="main-view">
          {renderView()}
        </div>
      </div>
      <div className="right-section"></div>
    </div>
  );
}
