import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './StaticPages.css';

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Contact form submitted:', data);
      setSubmitSuccess(true);
      setIsSubmitting(false);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1000);
  };

  return (
    <div className="static-page">
      <div className="container">
        <div className="page-header">
          <h1>Contact Us</h1>
          <p>Get in touch with our team</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-section">
              <h3>Get in Touch</h3>
              <p>
                Have questions about our platform? Need help with a transaction? 
                Our team is here to help you succeed.
              </p>
            </div>

            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <h4>Email Support</h4>
                  <p>support@startupmarketplace.com</p>
                  <span>Response within 24 hours</span>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h4>Phone Support</h4>
                  <p>+1 (555) 123-4567</p>
                  <span>Mon-Fri, 9AM-6PM EST</span>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">💬</div>
                <div className="contact-details">
                  <h4>Live Chat</h4>
                  <p>Available on platform</p>
                  <span>Real-time support</span>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h4>Office Address</h4>
                  <p>123 Innovation Drive<br />San Francisco, CA 94105</p>
                  <span>By appointment only</span>
                </div>
              </div>
            </div>

            <div className="contact-section">
              <h3>Office Hours</h3>
              <div className="office-hours">
                <div className="hours-item">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="hours-item">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM EST</span>
                </div>
                <div className="hours-item">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <div className="form-container">
              <h3>Send us a Message</h3>
              
              {submitSuccess && (
                <div className="success-message">
                  Thank you for your message! We'll get back to you within 24 hours.
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName" className="form-label">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      className={`form-input ${errors.firstName ? 'error' : ''}`}
                      {...register('firstName', {
                        required: 'First name is required'
                      })}
                    />
                    {errors.firstName && (
                      <span className="error-message">{errors.firstName.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName" className="form-label">
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      className={`form-input ${errors.lastName ? 'error' : ''}`}
                      {...register('lastName', {
                        required: 'Last name is required'
                      })}
                    />
                    {errors.lastName && (
                      <span className="error-message">{errors.lastName.message}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="company" className="form-label">
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    className="form-input"
                    {...register('company')}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    className={`form-select ${errors.subject ? 'error' : ''}`}
                    {...register('subject', {
                      required: 'Please select a subject'
                    })}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && (
                    <span className="error-message">{errors.subject.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows="6"
                    className={`form-input form-textarea ${errors.message ? 'error' : ''}`}
                    placeholder="Tell us how we can help you..."
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters'
                      }
                    })}
                  ></textarea>
                  {errors.message && (
                    <span className="error-message">{errors.message.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="page-content">
          <section className="content-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h4>How quickly do you respond to inquiries?</h4>
                <p>
                  We aim to respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please call our support line.
                </p>
              </div>
              
              <div className="faq-item">
                <h4>Do you offer phone support?</h4>
                <p>
                  Yes, we offer phone support during business hours (9 AM - 6 PM EST, Monday-Friday). 
                  You can also schedule a call through our platform.
                </p>
              </div>
              
              <div className="faq-item">
                <h4>Can I visit your office?</h4>
                <p>
                  Office visits are by appointment only. Please contact us in advance 
                  to schedule a meeting with our team.
                </p>
              </div>
              
              <div className="faq-item">
                <h4>Do you provide support in other languages?</h4>
                <p>
                  Currently, we provide support in English. We're working on expanding 
                  our language support in the near future.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;