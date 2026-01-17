import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const getUserInitials = () => {
    if (!user?.profile) return 'U';
    const { firstName, lastName } = user.profile;
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <div className="logo-icon">SM</div>
          Startup Marketplace
        </Link>

        <nav className="nav">
          <ul className="nav-links">
            <li>
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/explore" 
                className={`nav-link ${isActive('/explore') ? 'active' : ''}`}
              >
                Explore
              </Link>
            </li>
            <li>
              <Link 
                to="/how-it-works" 
                className={`nav-link ${isActive('/how-it-works') ? 'active' : ''}`}
              >
                How It Works
              </Link>
            </li>
            <li>
              <Link 
                to="/pricing" 
                className={`nav-link ${isActive('/pricing') ? 'active' : ''}`}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              >
                Contact
              </Link>
            </li>
          </ul>

          {isAuthenticated ? (
            <div className="user-menu" ref={userMenuRef}>
              <button 
                className="user-button"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="user-avatar">
                  {getUserInitials()}
                </div>
                <span>{user?.profile?.firstName}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </button>

              {showUserMenu && (
                <div className="user-dropdown">
                  <Link 
                    to="/dashboard" 
                    className="dropdown-item"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Dashboard
                  </Link>
                  {user?.role === 'founder' && (
                    <Link 
                      to="/upload" 
                      className="dropdown-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Upload Startup
                    </Link>
                  )}
                  <button 
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          )}

          <button 
            className="mobile-menu-button"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </button>
        </nav>

        {showMobileMenu && (
          <div className="mobile-nav">
            <ul className="mobile-nav-links">
              <li>
                <Link 
                  to="/" 
                  className="nav-link"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/explore" 
                  className="nav-link"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link 
                  to="/how-it-works" 
                  className="nav-link"
                  onClick={() => setShowMobileMenu(false)}
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link 
                  to="/pricing" 
                  className="nav-link"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="nav-link"
                  onClick={() => setShowMobileMenu(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="nav-link"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Contact
                </Link>
              </li>
              {!isAuthenticated && (
                <>
                  <li>
                    <Link 
                      to="/login" 
                      className="nav-link"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/register" 
                      className="nav-link"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;