import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { startupAPI } from '../services/api';
import './StartupDetailPage.css';

const StartupDetailPage = () => {
  const { id } = useParams();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStartup();
  }, [id]);

  const fetchStartup = async () => {
    try {
      const response = await startupAPI.getById(id);
      setStartup(response.data.startup);
    } catch (error) {
      console.error('Error fetching startup:', error);
      setError('Startup not found');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (amount) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !startup) {
    return (
      <div className="error-page">
        <div className="container">
          <div className="error-content">
            <h1>Startup Not Found</h1>
            <p>The startup you're looking for doesn't exist or has been removed.</p>
            <Link to="/explore" className="btn btn-primary">
              Browse Other Startups
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="startup-detail-page">
      <div className="container">
        {/* Header */}
        <div className="startup-header">
          <div className="startup-header-content">
            <div className="startup-logo-section">
              {startup.media?.logo ? (
                <img 
                  src={`http://localhost:5000${startup.media.logo}`} 
                  alt={`${startup.name} logo`}
                  className="startup-logo-large"
                />
              ) : (
                <div className="startup-logo-placeholder-large">
                  {startup.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="startup-info">
              <div className="startup-badges">
                <span className="industry-badge">{startup.industry}</span>
                <span className="category-badge">{startup.category}</span>
                <span className="stage-badge">{startup.details?.stage || 'MVP'}</span>
              </div>
              
              <h1 className="startup-title">{startup.name}</h1>
              
              <div className="startup-meta">
                <div className="meta-item">
                  <span className="meta-label">Founded by</span>
                  <span className="meta-value">
                    {startup.founder?.profile?.firstName} {startup.founder?.profile?.lastName}
                  </span>
                </div>
                
                {startup.details?.location && (
                  <div className="meta-item">
                    <span className="meta-label">Location</span>
                    <span className="meta-value">{startup.details.location}</span>
                  </div>
                )}
                
                {startup.details?.founded && (
                  <div className="meta-item">
                    <span className="meta-label">Founded</span>
                    <span className="meta-value">{formatDate(startup.details.founded)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="startup-actions">
            <div className="price-section">
              <div className="price-label">
                {startup.pricing?.type === 'sale' ? 'Asking Price' : 'Investment Needed'}
              </div>
              <div className="price-value">
                {formatPrice(startup.pricing?.amount)}
                {startup.pricing?.negotiable && (
                  <span className="negotiable-text"> (Negotiable)</span>
                )}
              </div>
            </div>
            
            <div className="action-buttons">
              <button className="btn btn-primary">
                Contact Founder
              </button>
              <button className="btn btn-outline">
                Save Startup
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="startup-content">
          <div className="main-content">
            {/* Description */}
            <section className="content-section">
              <h2>About This Startup</h2>
              <p className="startup-description">{startup.description}</p>
            </section>

            {/* Images Gallery */}
            {startup.media?.images && startup.media.images.length > 0 && (
              <section className="content-section">
                <h2>Gallery</h2>
                <div className="images-gallery">
                  {startup.media.images.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5000${image}`}
                      alt={`${startup.name} screenshot ${index + 1}`}
                      className="gallery-image"
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Technology Stack */}
            {startup.details?.technologies && startup.details.technologies.length > 0 && (
              <section className="content-section">
                <h2>Technology Stack</h2>
                <div className="tech-stack">
                  {startup.details.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Founder Information */}
            <section className="content-section">
              <h2>About the Founder</h2>
              <div className="founder-info">
                <div className="founder-avatar">
                  {startup.founder?.profile?.firstName?.charAt(0)}{startup.founder?.profile?.lastName?.charAt(0)}
                </div>
                <div className="founder-details">
                  <h3>
                    {startup.founder?.profile?.firstName} {startup.founder?.profile?.lastName}
                  </h3>
                  {startup.founder?.profile?.company && (
                    <p className="founder-company">{startup.founder.profile.company}</p>
                  )}
                  {startup.founder?.profile?.bio && (
                    <p className="founder-bio">{startup.founder.profile.bio}</p>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            {/* Key Metrics */}
            <div className="sidebar-card">
              <h3>Key Metrics</h3>
              <div className="metrics-list">
                <div className="metric-item">
                  <span className="metric-label">Team Size</span>
                  <span className="metric-value">{startup.details?.employees || 1} people</span>
                </div>
                
                {startup.details?.revenue > 0 && (
                  <div className="metric-item">
                    <span className="metric-label">Revenue</span>
                    <span className="metric-value">{formatPrice(startup.details.revenue)}</span>
                  </div>
                )}
                
                <div className="metric-item">
                  <span className="metric-label">Stage</span>
                  <span className="metric-value">{startup.details?.stage || 'MVP'}</span>
                </div>
                
                {startup.details?.website && (
                  <div className="metric-item">
                    <span className="metric-label">Website</span>
                    <a 
                      href={startup.details.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="metric-link"
                    >
                      Visit Site
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Engagement Stats */}
            <div className="sidebar-card">
              <h3>Engagement</h3>
              <div className="engagement-stats">
                <div className="stat-item">
                  <div className="stat-number">{startup.metrics?.views || 0}</div>
                  <div className="stat-label">Views</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{startup.metrics?.saves || 0}</div>
                  <div className="stat-label">Saves</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{startup.metrics?.inquiries || 0}</div>
                  <div className="stat-label">Inquiries</div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="sidebar-card">
              <h3>Interested?</h3>
              <p>Get in touch with the founder to learn more about this opportunity.</p>
              <button className="btn btn-primary w-full">
                Send Message
              </button>
              <button className="btn btn-outline w-full">
                Request Information
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupDetailPage;