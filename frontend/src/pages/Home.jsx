import React from 'react';

export default function Home({ username }) {
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    window.location.href = '/'; // Redirect to signin
  };

  return (
    <div className="home-container">
      <h1>Welcome, {username}!</h1>

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}
