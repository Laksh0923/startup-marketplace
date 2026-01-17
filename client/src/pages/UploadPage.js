import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { startupAPI } from '../services/api';
import './UploadPage.css';

const UploadPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education',
    'Real Estate', 'Food & Beverage', 'Transportation', 'Entertainment',
    'Energy', 'Manufacturing', 'Agriculture', 'Other'
  ];

  const categories = [
    'SaaS', 'Mobile App', 'Web Platform', 'E-commerce Store',
    'Marketplace', 'AI/ML', 'Blockchain', 'IoT', 'Fintech',
    'Healthtech', 'Edtech', 'Other'
  ];

  const stages = [
    { value: 'idea', label: 'Idea Stage' },
    { value: 'mvp', label: 'MVP' },
    { value: 'growth', label: 'Growth Stage' },
    { value: 'established', label: 'Established' }
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Process form data
      const startupData = {
        name: data.name,
        description: data.description,
        industry: data.industry,
        category: data.category,
        pricing: {
          type: data.pricingType,
          amount: parseFloat(data.amount),
          negotiable: data.negotiable || false
        },
        details: {
          stage: data.stage,
          employees: data.employees ? parseInt(data.employees) : 1,
          revenue: data.revenue ? parseFloat(data.revenue) : 0,
          founded: data.founded ? new Date(data.founded) : null,
          location: data.location,
          website: data.website,
          technologies: data.technologies ? data.technologies.split(',').map(t => t.trim()) : []
        }
      };

      const response = await startupAPI.create(startupData);
      
      if (response.data.startup) {
        navigate(`/startup/${response.data.startup._id}`);
      }
    } catch (error) {
      console.error('Error creating startup:', error);
      setSubmitError(error.response?.data?.message || 'Failed to create startup listing');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="upload-page">
      <div className="container">
        <div className="upload-header">
          <h1>List Your Startup</h1>
          <p>Create a compelling listing to attract potential buyers and investors</p>
        </div>

        <div className="upload-content">
          <form onSubmit={handleSubmit(onSubmit)} className="upload-form">
            {submitError && (
              <div className="error-message">
                {submitError}
              </div>
            )}

            {/* Basic Information */}
            <div className="form-section">
              <h2>Basic Information</h2>
              
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Startup Name *
                </label>
                <input
                  id="name"
                  type="text"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Enter your startup name"
                  {...register('name', {
                    required: 'Startup name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    }
                  })}
                />
                {errors.name && (
                  <span className="error-message">{errors.name.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Description *
                </label>
                <textarea
                  id="description"
                  rows="6"
                  className={`form-input form-textarea ${errors.description ? 'error' : ''}`}
                  placeholder="Describe your startup, what it does, and what makes it unique..."
                  {...register('description', {
                    required: 'Description is required',
                    minLength: {
                      value: 50,
                      message: 'Description must be at least 50 characters'
                    },
                    maxLength: {
                      value: 2000,
                      message: 'Description must be less than 2000 characters'
                    }
                  })}
                ></textarea>
                {errors.description && (
                  <span className="error-message">{errors.description.message}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="industry" className="form-label">
                    Industry *
                  </label>
                  <select
                    id="industry"
                    className={`form-select ${errors.industry ? 'error' : ''}`}
                    {...register('industry', {
                      required: 'Please select an industry'
                    })}
                  >
                    <option value="">Select Industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                  {errors.industry && (
                    <span className="error-message">{errors.industry.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="category" className="form-label">
                    Category *
                  </label>
                  <select
                    id="category"
                    className={`form-select ${errors.category ? 'error' : ''}`}
                    {...register('category', {
                      required: 'Please select a category'
                    })}
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <span className="error-message">{errors.category.message}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="form-section">
              <h2>Pricing & Type</h2>
              
              <div className="form-group">
                <label className="form-label">Listing Type *</label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      value="sale"
                      {...register('pricingType', {
                        required: 'Please select a listing type'
                      })}
                    />
                    <span className="radio-content">
                      <strong>For Sale</strong>
                      <span>Sell your entire startup</span>
                    </span>
                  </label>
                  
                  <label className="radio-option">
                    <input
                      type="radio"
                      value="investment"
                      {...register('pricingType', {
                        required: 'Please select a listing type'
                      })}
                    />
                    <span className="radio-content">
                      <strong>Investment</strong>
                      <span>Raise funding for growth</span>
                    </span>
                  </label>
                </div>
                {errors.pricingType && (
                  <span className="error-message">{errors.pricingType.message}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="amount" className="form-label">
                    Amount ($) *
                  </label>
                  <input
                    id="amount"
                    type="number"
                    min="1000"
                    className={`form-input ${errors.amount ? 'error' : ''}`}
                    placeholder="100000"
                    {...register('amount', {
                      required: 'Amount is required',
                      min: {
                        value: 1000,
                        message: 'Minimum amount is $1,000'
                      }
                    })}
                  />
                  {errors.amount && (
                    <span className="error-message">{errors.amount.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      {...register('negotiable')}
                    />
                    <span className="checkmark"></span>
                    Price is negotiable
                  </label>
                </div>
              </div>
            </div>

            {/* Startup Details */}
            <div className="form-section">
              <h2>Startup Details</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="stage" className="form-label">
                    Current Stage
                  </label>
                  <select
                    id="stage"
                    className="form-select"
                    {...register('stage')}
                  >
                    {stages.map(stage => (
                      <option key={stage.value} value={stage.value}>
                        {stage.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="employees" className="form-label">
                    Team Size
                  </label>
                  <input
                    id="employees"
                    type="number"
                    min="1"
                    className="form-input"
                    placeholder="5"
                    {...register('employees')}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="revenue" className="form-label">
                    Annual Revenue ($)
                  </label>
                  <input
                    id="revenue"
                    type="number"
                    min="0"
                    className="form-input"
                    placeholder="250000"
                    {...register('revenue')}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="founded" className="form-label">
                    Founded Date
                  </label>
                  <input
                    id="founded"
                    type="date"
                    className="form-input"
                    {...register('founded')}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    className="form-input"
                    placeholder="San Francisco, CA"
                    {...register('location')}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="website" className="form-label">
                    Website
                  </label>
                  <input
                    id="website"
                    type="url"
                    className="form-input"
                    placeholder="https://yourwebsite.com"
                    {...register('website')}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="technologies" className="form-label">
                  Technology Stack
                </label>
                <input
                  id="technologies"
                  type="text"
                  className="form-input"
                  placeholder="React, Node.js, MongoDB, AWS (comma separated)"
                  {...register('technologies')}
                />
                <small className="form-help">
                  Enter technologies separated by commas
                </small>
              </div>
            </div>

            {/* Submit */}
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Creating Listing...
                  </>
                ) : (
                  'Create Listing'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;