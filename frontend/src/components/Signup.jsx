import React, { useState } from 'react';
import '../styles/signin.css';
import logo from '../assets/logo/horizontal-rgb.png';

export default function Signup({ onClose, onSwitch }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('https://moodtune-m133.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          phone: formData.phone
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Something went wrong.');
      } else {
        setMessage('Signup successful!');
        setError('');
        setTimeout(() => {
            onClose();
          onSwitch();
        }, 1000);
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
          <div className="user">
            <input
              type="text"
              name="phone"
              placeholder="Phone (optional)"
              value={formData.phone}
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
          <div className="pass">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="buttom">
          <button onClick={handleSubmit}>Sign Up</button>
          <p>Already have an account? <span onClick={onSwitch} className="signup">Sign in</span></p>
          {error && <p className="error">{error}</p>}
          {message && <p className="success">{message}</p>}
        </div>
        <button onClick={onClose} className="close-button">×</button>
      </div>
    </div>
  );
}
