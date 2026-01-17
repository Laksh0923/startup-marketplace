import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { startupAPI } from '../services/api';
import StartupCard from '../components/Startup/StartupCard';
import './HomePage.css';

const HomePage = () => {
  const [featuredStartups, setFeaturedStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedStartups = async () => {
      try {
        const response = await startupAPI.getFeatured();
        setFeaturedStartups(response.data.startups);
      } catch (error) {
        console.error('Error fetching featured startups:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedStartups();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover Your Next
              <span className="hero-highlight"> Startup Investment</span>
            </h1>
            <p className="hero-description">
              A comprehensive marketplace connecting startup founders with entrepreneurs and investors. 
              Find ready-to-use startups for acquisition or discover your next investment opportunity.
            </p>
            <div className="hero-actions">
              <Link to="/explore" className="btn btn-primary btn-large">
                Browse Startups
              </Link>
              <Link to="/register" className="btn btn-outline btn-large">
                Get Started
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-cards">
              <div className="hero-card">
                <div className="hero-card-icon">🚀</div>
                <h3>SaaS Platform</h3>
                <p>$250K Revenue</p>
              </div>
              <div className="hero-card">
                <div className="hero-card-icon">📱</div>
                <h3>Mobile App</h3>
                <p>100K+ Users</p>
              </div>
              <div className="hero-card">
                <div className="hero-card-icon">🛒</div>
                <h3>E-commerce</h3>
                <p>$500K Valuation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Simple steps to buy, sell, or invest in startups</p>
          </div>
          
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Browse & Discover</h3>
                <p>Explore our curated marketplace of verified startups across various industries and stages.</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Evaluate & Connect</h3>
                <p>Review detailed startup information, financials, and connect directly with founders.</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Invest or Acquire</h3>
                <p>Complete secure transactions through our platform with built-in legal and financial protection.</p>
              </div>
            </div>
          </div>

          <div className="cta-section">
            <Link to="/how-it-works" className="btn btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Startups Section */}
      <section className="featured-startups">
        <div className="container">
          <div className="section-header">
            <h2>Featured Startups</h2>
            <p>Hand-picked opportunities from our marketplace</p>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="startups-grid">
              {featuredStartups.length > 0 ? (
                featuredStartups.map(startup => (
                  <StartupCard key={startup._id} startup={startup} />
                ))
              ) : (
                <div className="no-startups">
                  <p>No featured startups available at the moment.</p>
                  <Link to="/explore" className="btn btn-primary">
                    Browse All Startups
                  </Link>
                </div>
              )}
            </div>
          )}

          {featuredStartups.length > 0 && (
            <div className="cta-section">
              <Link to="/explore" className="btn btn-primary">
                View All Startups
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Startups Listed</div>
            </div>
            <div className="stat">
              <div className="stat-number">$50M+</div>
              <div className="stat-label">Total Transactions</div>
            </div>
            <div className="stat">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat">
              <div className="stat-number">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of entrepreneurs and investors already using our platform</p>
            <div className="cta-buttons">
              <Link to="/register?role=founder" className="btn btn-primary btn-large">
                List Your Startup
              </Link>
              <Link to="/register?role=buyer" className="btn btn-outline btn-large">
                Find Startups
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;