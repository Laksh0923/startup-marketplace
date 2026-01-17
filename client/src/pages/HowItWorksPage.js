import React from 'react';
import { Link } from 'react-router-dom';
import './StaticPages.css';

const HowItWorksPage = () => {
  return (
    <div className="static-page">
      <div className="container">
        <div className="page-header">
          <h1>How It Works</h1>
          <p>Simple steps to buy, sell, or invest in startups</p>
        </div>

        <div className="page-content">
          {/* For Founders */}
          <section className="content-section">
            <div className="section-header">
              <div className="section-icon">🚀</div>
              <div>
                <h2>For Startup Founders</h2>
                <p>Ready to sell your startup or raise investment?</p>
              </div>
            </div>

            <div className="steps-container">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Create Your Account</h3>
                  <p>
                    Sign up as a founder and complete your profile with your background 
                    and experience. This helps build trust with potential buyers.
                  </p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>List Your Startup</h3>
                  <p>
                    Upload detailed information about your startup including financials, 
                    team, technology stack, and growth metrics. Add compelling visuals 
                    and documents.
                  </p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Get Discovered</h3>
                  <p>
                    Your startup becomes visible to our network of verified buyers and 
                    investors. Track views, saves, and inquiries through your dashboard.
                  </p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Connect & Negotiate</h3>
                  <p>
                    Interested buyers will reach out directly. Engage in discussions, 
                    share additional information, and negotiate terms that work for everyone.
                  </p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h3>Close the Deal</h3>
                  <p>
                    Complete the transaction securely through our platform. We handle 
                    payment processing and provide legal framework support.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* For Buyers */}
          <section className="content-section">
            <div className="section-header">
              <div className="section-icon">💼</div>
              <div>
                <h2>For Buyers & Investors</h2>
                <p>Looking to acquire or invest in promising startups?</p>
              </div>
            </div>

            <div className="steps-container">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Join the Platform</h3>
                  <p>
                    Create your buyer account and set up your investment preferences. 
                    Tell us about your interests, budget, and investment criteria.
                  </p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Browse & Filter</h3>
                  <p>
                    Explore our curated marketplace of startups. Use advanced filters 
                    to find opportunities that match your investment thesis and budget.
                  </p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Evaluate Opportunities</h3>
                  <p>
                    Review detailed startup profiles, financial data, and growth metrics. 
                    Save interesting opportunities and track your favorites.
                  </p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Make Contact</h3>
                  <p>
                    Reach out to founders directly through our secure messaging system. 
                    Request additional information and schedule calls or meetings.
                  </p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h3>Complete Investment</h3>
                  <p>
                    Finalize your investment or acquisition through our secure platform. 
                    All transactions are protected and legally compliant.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section className="content-section">
            <h2>Platform Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🔍</div>
                <h3>Advanced Search</h3>
                <p>Find exactly what you're looking for with powerful filtering and search capabilities.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Detailed Analytics</h3>
                <p>Access comprehensive startup metrics, financial data, and performance indicators.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">💬</div>
                <h3>Direct Messaging</h3>
                <p>Communicate securely with founders and buyers through our built-in messaging system.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🔐</div>
                <h3>Secure Transactions</h3>
                <p>All payments and sensitive data are protected by enterprise-grade security.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">📋</div>
                <h3>Due Diligence Tools</h3>
                <p>Access tools and resources to help you evaluate investment opportunities thoroughly.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Smart Matching</h3>
                <p>Get personalized recommendations based on your preferences and investment history.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="content-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h4>How much does it cost to list a startup?</h4>
                <p>
                  Listing your startup is completely free. We only charge a small commission 
                  when a successful transaction is completed through our platform.
                </p>
              </div>
              
              <div className="faq-item">
                <h4>How do you verify startups and users?</h4>
                <p>
                  We have a comprehensive verification process that includes identity verification, 
                  business registration checks, and financial document review for all listings.
                </p>
              </div>
              
              <div className="faq-item">
                <h4>What types of startups can I list?</h4>
                <p>
                  We accept startups from all industries and stages, from early-stage MVPs to 
                  established businesses with proven revenue streams.
                </p>
              </div>
              
              <div className="faq-item">
                <h4>How long does the process typically take?</h4>
                <p>
                  The timeline varies depending on the complexity of the deal, but most 
                  transactions are completed within 30-90 days from initial contact.
                </p>
              </div>
            </div>
          </section>

          <section className="cta-section">
            <h2>Ready to Get Started?</h2>
            <p>Join our marketplace and discover your next opportunity</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary">
                Sign Up Now
              </Link>
              <Link to="/explore" className="btn btn-outline">
                Browse Startups
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;