import React from 'react';
import { Link } from 'react-router-dom';
import './StartupCard.css';

const StartupCard = ({ startup }) => {
  const formatPrice = (amount) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };

  const getStageColor = (stage) => {
    const colors = {
      idea: '#ed8936',
      mvp: '#4299e1',
      growth: '#48bb78',
      established: '#9f7aea'
    };
    return colors[stage] || '#a0aec0';
  };

  return (
    <div className="startup-card">
      <div className="startup-card-header">
        {startup.media?.logo ? (
          <img 
            src={`http://localhost:5000${startup.media.logo}`} 
            alt={`${startup.name} logo`}
            className="startup-logo"
          />
        ) : (
          <div className="startup-logo-placeholder">
            {startup.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="startup-badges">
          <span 
            className="stage-badge"
            style={{ backgroundColor: getStageColor(startup.details?.stage) }}
          >
            {startup.details?.stage || 'MVP'}
          </span>
          <span className="type-badge">
            {startup.pricing?.type === 'sale' ? 'For Sale' : 'Investment'}
          </span>
        </div>
      </div>

      <div className="startup-card-content">
        <h3 className="startup-name">{startup.name}</h3>
        
        <div className="startup-meta">
          <span className="startup-industry">{startup.industry}</span>
          <span className="startup-category">{startup.category}</span>
        </div>

        <p className="startup-description">
          {startup.description.length > 120 
            ? `${startup.description.substring(0, 120)}...`
            : startup.description
          }
        </p>

        <div className="startup-details">
          {startup.details?.employees && (
            <div className="detail-item">
              <span className="detail-label">Team:</span>
              <span className="detail-value">{startup.details.employees} people</span>
            </div>
          )}
          
          {startup.details?.revenue > 0 && (
            <div className="detail-item">
              <span className="detail-label">Revenue:</span>
              <span className="detail-value">{formatPrice(startup.details.revenue)}</span>
            </div>
          )}

          {startup.details?.location && (
            <div className="detail-item">
              <span className="detail-label">Location:</span>
              <span className="detail-value">{startup.details.location}</span>
            </div>
          )}
        </div>

        {startup.details?.technologies && startup.details.technologies.length > 0 && (
          <div className="tech-stack">
            {startup.details.technologies.slice(0, 3).map((tech, index) => (
              <span key={index} className="tech-tag">
                {tech}
              </span>
            ))}
            {startup.details.technologies.length > 3 && (
              <span className="tech-tag more">
                +{startup.details.technologies.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="startup-card-footer">
        <div className="startup-price">
          <span className="price-label">
            {startup.pricing?.type === 'sale' ? 'Asking Price' : 'Investment Needed'}
          </span>
          <span className="price-value">
            {formatPrice(startup.pricing?.amount)}
            {startup.pricing?.negotiable && (
              <span className="negotiable"> (Negotiable)</span>
            )}
          </span>
        </div>

        <div className="startup-actions">
          <Link 
            to={`/startup/${startup._id}`} 
            className="btn btn-primary btn-small"
          >
            View Details
          </Link>
          <button className="btn btn-outline btn-small save-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="startup-metrics">
        <div className="metric">
          <span className="metric-value">{startup.metrics?.views || 0}</span>
          <span className="metric-label">Views</span>
        </div>
        <div className="metric">
          <span className="metric-value">{startup.metrics?.saves || 0}</span>
          <span className="metric-label">Saves</span>
        </div>
        <div className="metric">
          <span className="metric-value">{startup.metrics?.inquiries || 0}</span>
          <span className="metric-label">Inquiries</span>
        </div>
      </div>
    </div>
  );
};

export default StartupCard;