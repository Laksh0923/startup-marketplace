import React from 'react';
import { Link } from 'react-router-dom';
import './StaticPages.css';

const PricingPage = () => {
  return (
    <div className="static-page">
      <div className="container">
        <div className="page-header">
          <h1>Simple, Transparent Pricing</h1>
          <p>No hidden fees. Pay only when you succeed.</p>
        </div>

        <div className="page-content">
          {/* Pricing Cards */}
          <section className="pricing-section">
            <div className="pricing-grid">
              <div className="pricing-card">
                <div className="pricing-header">
                  <h3>For Founders</h3>
                  <div className="price">
                    <span className="price-amount">Free</span>
                    <span className="price-period">to list</span>
                  </div>
                </div>
                <div className="pricing-features">
                  <ul>
                    <li>✅ Free startup listing</li>
                    <li>✅ Unlimited photo uploads</li>
                    <li>✅ Basic analytics dashboard</li>
                    <li>✅ Direct buyer messaging</li>
                    <li>✅ Profile verification</li>
                    <li>✅ 24/7 platform support</li>
                  </ul>
                </div>
                <div className="pricing-footer">
                  <div className="commission-info">
                    <strong>5% commission</strong> only on successful sales
                  </div>
                  <Link to="/register?role=founder" className="btn btn-primary w-full">
                    List Your Startup
                  </Link>
                </div>
              </div>

              <div className="pricing-card featured">
                <div className="featured-badge">Most Popular</div>
                <div className="pricing-header">
                  <h3>For Buyers & Investors</h3>
                  <div className="price">
                    <span className="price-amount">Free</span>
                    <span className="price-period">to browse</span>
                  </div>
                </div>
                <div className="pricing-features">
                  <ul>
                    <li>✅ Browse all startup listings</li>
                    <li>✅ Advanced search & filters</li>
                    <li>✅ Save favorite startups</li>
                    <li>✅ Direct founder messaging</li>
                    <li>✅ Investment tracking dashboard</li>
                    <li>✅ Priority customer support</li>
                  </ul>
                </div>
                <div className="pricing-footer">
                  <div className="commission-info">
                    <strong>2.5% processing fee</strong> on completed transactions
                  </div>
                  <Link to="/register?role=buyer" className="btn btn-primary w-full">
                    Start Investing
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Commission Breakdown */}
          <section className="content-section">
            <h2>How Our Commission Works</h2>
            <div className="commission-breakdown">
              <div className="breakdown-item">
                <div className="breakdown-icon">🚀</div>
                <div className="breakdown-content">
                  <h4>For Startup Sales</h4>
                  <p>
                    We charge a 5% commission on the final sale price, split between 
                    platform fees (3%) and payment processing (2%). This is only charged 
                    when your startup successfully sells.
                  </p>
                </div>
              </div>
              
              <div className="breakdown-item">
                <div className="breakdown-icon">💰</div>
                <div className="breakdown-content">
                  <h4>For Investments</h4>
                  <p>
                    Buyers pay a 2.5% processing fee on completed investment transactions. 
                    This covers secure payment processing, legal documentation, and 
                    platform maintenance.
                  </p>
                </div>
              </div>
              
              <div className="breakdown-item">
                <div className="breakdown-icon">🔒</div>
                <div className="breakdown-content">
                  <h4>What's Included</h4>
                  <p>
                    Our fees include secure payment processing, legal framework support, 
                    escrow services, and ongoing platform support throughout the transaction.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Value Proposition */}
          <section className="content-section">
            <h2>Why Our Pricing Makes Sense</h2>
            <div className="value-grid">
              <div className="value-card">
                <div className="value-icon">💡</div>
                <h4>No Upfront Costs</h4>
                <p>
                  List your startup or browse opportunities completely free. 
                  You only pay when you achieve success.
                </p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">🎯</div>
                <h4>Performance-Based</h4>
                <p>
                  Our success is tied to yours. We're motivated to help you 
                  find the right match and close deals.
                </p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">🛡️</div>
                <h4>Full Protection</h4>
                <p>
                  All transactions are secured with escrow services, legal 
                  support, and fraud protection.
                </p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">📈</div>
                <h4>Market Value</h4>
                <p>
                  Our commission rates are competitive with traditional 
                  business brokers and investment platforms.
                </p>
              </div>
            </div>
          </section>

          {/* Comparison */}
          <section className="content-section">
            <h2>Compare with Alternatives</h2>
            <div className="comparison-table">
              <div className="comparison-header">
                <div className="comparison-cell"></div>
                <div className="comparison-cell">Startup Marketplace</div>
                <div className="comparison-cell">Traditional Brokers</div>
                <div className="comparison-cell">Direct Sales</div>
              </div>
              
              <div className="comparison-row">
                <div className="comparison-cell">Listing Fee</div>
                <div className="comparison-cell success">Free</div>
                <div className="comparison-cell">$5,000 - $25,000</div>
                <div className="comparison-cell success">Free</div>
              </div>
              
              <div className="comparison-row">
                <div className="comparison-cell">Success Fee</div>
                <div className="comparison-cell success">5%</div>
                <div className="comparison-cell">10% - 15%</div>
                <div className="comparison-cell success">0%</div>
              </div>
              
              <div className="comparison-row">
                <div className="comparison-cell">Time to Market</div>
                <div className="comparison-cell success">24 hours</div>
                <div className="comparison-cell">2-4 weeks</div>
                <div className="comparison-cell">Varies</div>
              </div>
              
              <div className="comparison-row">
                <div className="comparison-cell">Buyer Network</div>
                <div className="comparison-cell success">1000+ verified</div>
                <div className="comparison-cell">Limited</div>
                <div className="comparison-cell">Your network</div>
              </div>
              
              <div className="comparison-row">
                <div className="comparison-cell">Legal Support</div>
                <div className="comparison-cell success">Included</div>
                <div className="comparison-cell success">Included</div>
                <div className="comparison-cell">Extra cost</div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="content-section">
            <h2>Pricing FAQ</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h4>When do I pay the commission?</h4>
                <p>
                  Commission is only charged when a transaction is successfully completed. 
                  There are no upfront fees or monthly charges.
                </p>
              </div>
              
              <div className="faq-item">
                <h4>Are there any hidden fees?</h4>
                <p>
                  No hidden fees. Our pricing is completely transparent. The only costs 
                  are the success-based commissions clearly outlined above.
                </p>
              </div>
              
              <div className="faq-item">
                <h4>Can I negotiate the commission rate?</h4>
                <p>
                  For high-value transactions (over $1M), we offer custom pricing. 
                  Contact our team to discuss your specific needs.
                </p>
              </div>
              
              <div className="faq-item">
                <h4>What payment methods do you accept?</h4>
                <p>
                  We accept all major credit cards, bank transfers, and wire transfers. 
                  All payments are processed securely through our platform.
                </p>
              </div>
            </div>
          </section>

          <section className="cta-section">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of entrepreneurs using our platform</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary">
                Sign Up Free
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Contact Sales
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;