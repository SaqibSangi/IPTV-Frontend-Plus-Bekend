import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import LoadingIndicator from './LoadingIndicator';

const Sidebar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoading(true); // Start loading indicator
    
    // Ensure the loading indicator is displayed for a short period
    setTimeout(() => {
      localStorage.removeItem('userToken');
      navigate('/signin');
    }, 1000); // 1 second delay
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img
          style={{ borderRadius: 10, height: 120, width: 120 }}
          src="https://mainstreammarketing.ca/wp-content/uploads/2021/08/Post-4-Image-scaled.jpeg"
          alt="Logo"
        />
      </div>
      <ul className="sidebar-nav">
        <li>
          <NavLink to="/genre" activeClassName="active">
            Genre
          </NavLink>
        </li>
        <li>
          <NavLink to="/series" activeClassName="active">
            Series
          </NavLink>
        </li>
        <li>
          <NavLink to="/seasons" activeClassName="active">
            Seasons
          </NavLink>
        </li>
        <li>
          <NavLink to="/episodes" activeClassName="active">
            Episodes
          </NavLink>
        </li>
        <li>
          <NavLink to="/thumnails" activeClassName="active">
            Upload thumnails
          </NavLink>
        </li>
      </ul>
      <button className="logout-button" onClick={handleLogout} disabled={isLoading}>
        {isLoading ? "Loading...." : 'Logout'}
      </button>
      {isLoading && <div className="overlay"></div>} {/* Optional overlay */}
    </div>
  );
};

export default Sidebar;
