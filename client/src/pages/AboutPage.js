import React from 'react';
import './StaticPages.css';

const AboutPage = () => {
  return (
    <div className="static-page">
      <div className="container">
        <div className="page-header">
          <h1>About Startup Marketplace</h1>
          <p>Connecting innovation with opportunity</p>
        </div>

        <div className="page-content">
          <section className="content-section">
            <h2>Our Mission</h2>
            <p>
              At Startup Marketplace, we believe that great ideas deserve great opportunities. 
              Our mission is to create a comprehensive platform that bridges the gap between 
              innovative startup founders and visionary entrepreneurs and investors.
            </p>
            <p>
              We're building the future of startup acquisitions and investments by providing 
              a secure, transparent, and efficient marketplace where deals can be made with 
              confidence and trust.
            </p>
          </section>

          <section className="content-section">
            <h2>Our Vision</h2>
            <p>
              We envision a world where startup innovation flows freely, where founders can 
              find the right partners to scale their ventures, and where investors can 
              discover the next big opportunity. Our platform serves as the catalyst for 
              these connections, fostering growth and success in the startup ecosystem.
            </p>
          </section>

          <section className="content-section">
            <h2>Why Choose Us?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Secure Transactions</h3>
                <p>
                  Industry-leading security measures protect all transactions and sensitive 
                  information throughout the entire process.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">✅</div>
                <h3>Verified Listings</h3>
                <p>
                  All startup listings go through our rigorous verification process to 
                  ensure authenticity and quality.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🤝</div>
                <h3>Expert Support</h3>
                <p>
                  Our team of experts provides guidance and support throughout your 
                  journey, from listing to closing.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">📈</div>
                <h3>Market Insights</h3>
                <p>
                  Access valuable market data and insights to make informed decisions 
                  about your investments and acquisitions.
                </p>
              </div>
            </div>
          </section>

          <section className="content-section">
            <h2>Our Story</h2>
            <p>
              Founded in 2024, Startup Marketplace was born from the recognition that the 
              startup ecosystem needed a better way to connect founders with potential 
              buyers and investors. Our founding team, with decades of combined experience 
              in startups, venture capital, and technology, set out to create a platform 
              that would democratize access to startup opportunities.
            </p>
            <p>
              Today, we're proud to serve hundreds of startups and thousands of users, 
              facilitating millions of dollars in transactions and helping shape the 
              future of entrepreneurship.
            </p>
          </section>

          <section className="content-section">
            <h2>Our Values</h2>
            <div className="values-list">
              <div className="value-item">
                <h4>Transparency</h4>
                <p>We believe in open, honest communication and clear processes.</p>
              </div>
              <div className="value-item">
                <h4>Innovation</h4>
                <p>We continuously evolve our platform to serve our users better.</p>
              </div>
              <div className="value-item">
                <h4>Trust</h4>
                <p>We build lasting relationships based on reliability and integrity.</p>
              </div>
              <div className="value-item">
                <h4>Success</h4>
                <p>Your success is our success. We're committed to your growth.</p>
              </div>
            </div>
          </section>

          <section className="cta-section">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of entrepreneurs and investors already using our platform</p>
            <div className="cta-buttons">
              <a href="/register?role=founder" className="btn btn-primary">
                List Your Startup
              </a>
              <a href="/register?role=buyer" className="btn btn-outline">
                Find Opportunities
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;