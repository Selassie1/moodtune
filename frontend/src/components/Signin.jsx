import React from 'react'
import '../styles/signin.css';
import { useState } from 'react';
import logo from '../assets/logo/horizontal-rgb.png';
import { FiUser } from 'react-icons/fi';

export default function Signin({ onClose }) {
  const [inputValue, setInputValue] = useState('');
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="top">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <h2 className="intro">You are welcome back...</h2>
        </div>
        <div className="middle">
          <div className="user">
            <input type="text" placeholder="Username" />
          </div>
          <div className="pass">
            <input type="password" placeholder="Password" />
          </div>
          <div className="option">
            <div className="remember">
              <input type="checkbox" />
              <label>Remember me</label>
            </div>
            <div className="forgot">
              <p>Forgot Password?</p>
            </div>
          </div>
        </div>
        <div className="buttom">
          <button>Sign In</button>
          <p>Don't have an acccount? <span className="signup">Sign Up</span></p>
        </div>
        <button onClick={onClose} className="close-button">×</button>
        
        
      </div>
    </div>
  )
}
