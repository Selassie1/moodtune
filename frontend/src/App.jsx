import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const savedUsername = localStorage.getItem('username');

    if (token && savedUsername) {
      setIsAuthenticated(true);
      setUsername(savedUsername);
    } else {
      setIsAuthenticated(false);
    }
  }, [location]);

  const isFullWidthPage = location.pathname === '/home';

  return (
      <Routes>
        <Route 
          path="/" 
          element={
          isAuthenticated ? (
              <Home username={username} />
            ) : (
              <Welcome />
            )
        } 
        />
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <Home username={username} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
  );
}

export default App;
