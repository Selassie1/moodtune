import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/signin.css';
import logo from '../assets/logo/horizontal-rgb.png';

export default function Signin({ onClose, onSwitch }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setError('');
    setMessage('');

    if (!formData.username || !formData.password) {
      setError('Please enter username and password.');
      return;
    }

    try {
      const response = await fetch('https://moodtune-m133.onrender.com/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Invalid username or password.');
      } else {
        const { access_token, username } = data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('username', username);
        setMessage('Login successful!');
        setError('');
        if (data.token) {
          localStorage.setItem('token', data.token);
          setTimeout(() => {
              onClose();
            }, 3000);
        }
        navigate('/home');
      }
    } catch (err) {
      setError('Failed to connect to server.');
    }
  };

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
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="pass">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
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
          <button onClick={handleSubmit}>Sign In</button>
          <p>
            Don't have an acccount? <span onClick={onSwitch} className="signup">Sign Up</span>
          </p>
          {error && <p className="error">{error}</p>}
          {message && <p className="success">{message}</p>}
        </div>
        <button onClick={onClose} className="close-button">
          ×
        </button>
      </div>
    </div>
  );
}


