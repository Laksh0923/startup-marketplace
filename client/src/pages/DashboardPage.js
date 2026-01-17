import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { userAPI } from '../services/api';
import StartupCard from '../components/Startup/StartupCard';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await userAPI.getDashboard();
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  const isFounder = user?.role === 'founder';

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1>Welcome back, {user?.profile?.firstName}!</h1>
            <p>
              {isFounder 
                ? 'Manage your startup listings and track performance'
                : 'Discover new investment opportunities and manage your portfolio'
              }
            </p>
          </div>
          
          {isFounder && (
            <Link to="/upload" className="btn btn-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              Add New Startup
            </Link>
          )}
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {isFounder ? (
            <>
              <div className="stat-card">
                <div className="stat-icon">🚀</div>
                <div className="stat-content">
                  <div className="stat-number">{dashboardData?.stats?.totalStartups || 0}</div>
                  <div className="stat-label">Total Startups</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <div className="stat-number">{dashboardData?.stats?.activeStartups || 0}</div>
                  <div className="stat-label">Active Listings</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👁️</div>
                <div className="stat-content">
                  <div className="stat-number">{dashboardData?.stats?.totalViews || 0}</div>
                  <div className="stat-label">Total Views</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💬</div>
                <div className="stat-content">
                  <div className="stat-number">{dashboardData?.stats?.totalInquiries || 0}</div>
                  <div className="stat-label">Inquiries</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="stat-card">
                <div className="stat-icon">❤️</div>
                <div className="stat-content">
                  <div className="stat-number">{dashboardData?.stats?.savedStartups || 0}</div>
                  <div className="stat-label">Saved Startups</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👁️</div>
                <div className="stat-content">
                  <div className="stat-number">{dashboardData?.stats?.recentViews || 0}</div>
                  <div className="stat-label">Recent Views</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💼</div>
                <div className="stat-content">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Investments</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📈</div>
                <div className="stat-content">
                  <div className="stat-number">$0</div>
                  <div className="stat-label">Portfolio Value</div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="dashboard-content">
          {isFounder ? (
            <div className="founder-content">
              <div className="section-header">
                <h2>Your Startups</h2>
                <Link to="/upload" className="btn btn-outline">
                  Add New Startup
                </Link>
              </div>

              {dashboardData?.startups && dashboardData.startups.length > 0 ? (
                <div className="startups-grid">
                  {dashboardData.startups.map(startup => (
                    <StartupCard key={startup._id} startup={startup} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">🚀</div>
                  <h3>No startups yet</h3>
                  <p>Get started by listing your first startup on the marketplace</p>
                  <Link to="/upload" className="btn btn-primary">
                    List Your Startup
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="buyer-content">
              <div className="section-header">
                <h2>Recommended for You</h2>
                <Link to="/explore" className="btn btn-outline">
                  Browse All
                </Link>
              </div>

              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3>Start exploring</h3>
                <p>Discover amazing startups and investment opportunities</p>
                <Link to="/explore" className="btn btn-primary">
                  Explore Startups
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <Link to="/explore" className="action-card">
              <div className="action-icon">🔍</div>
              <div className="action-content">
                <h4>Browse Startups</h4>
                <p>Discover new opportunities</p>
              </div>
            </Link>
            
            {isFounder && (
              <Link to="/upload" className="action-card">
                <div className="action-icon">📝</div>
                <div className="action-content">
                  <h4>List Startup</h4>
                  <p>Add a new startup listing</p>
                </div>
              </Link>
            )}
            
            <Link to="/profile" className="action-card">
              <div className="action-icon">⚙️</div>
              <div className="action-content">
                <h4>Profile Settings</h4>
                <p>Update your information</p>
              </div>
            </Link>
            
            <Link to="/help" className="action-card">
              <div className="action-icon">❓</div>
              <div className="action-content">
                <h4>Help & Support</h4>
                <p>Get assistance</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;