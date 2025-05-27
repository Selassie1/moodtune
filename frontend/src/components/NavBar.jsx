import React from 'react';
import { FaList, FaUser, FaHeart } from 'react-icons/fa';
import { LuPodcast } from "react-icons/lu";
import { MdRssFeed } from "react-icons/md";
import { SiBeatsbydre } from "react-icons/si";
import { IoIosAddCircle } from "react-icons/io";
import logo from '../assets/logo/horizontal-rgb.png';
import { IoSettingsSharp } from "react-icons/io5";
import '../styles/navbar.css';

const NavBar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { name: 'Feed', icon: <MdRssFeed />, key: 'feed' },
    { name: 'Radio / Podcast', icon: <LuPodcast />, key: 'radio' },
    { name: 'Beats', icon: <SiBeatsbydre />, key: 'beats' },
  ];

   const collectionsTabs = [
    { name: 'Playlists', icon: <FaList />, key: 'playlists' },
    { name: 'Favorites', icon: <FaHeart />, key: 'favorites' },
  ];

  const controlTabs = [
    {name: 'Settings', icon: <IoSettingsSharp />, key: 'settings'},  
  ]

  return (
    <div className="nav-container">
        <div className="nav-logo">
            <img src={logo} alt="Logo" className="logo-image" />
        </div>
      <h2 className="nav-title">Library</h2>
      <ul className="nav-list library">
        {tabs.map(tab => (
          <li
            key={tab.key}
            className={`nav-item ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span className="icon">{tab.icon}</span>
            <span className="text">{tab.name}</span>
          </li>
        ))}
      </ul>

      <h2 className="nav-title head">Collections</h2>
      
        <ul className="nav-list collections">
          {collectionsTabs.map(tab => (
            <li
              key={tab.key}
              className={`nav-item ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="icon">{tab.icon}</span>
              <span className="text">{tab.name}</span>
            </li>
          ))}
        </ul>
        <button><span>New playlist</span><IoIosAddCircle /></button>

      
    </div>
    
  );
};

export default NavBar;
