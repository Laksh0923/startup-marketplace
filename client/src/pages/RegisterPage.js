import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import './AuthPages.css';

const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const defaultRole = searchParams.get('role') || 'buyer';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      role: defaultRole
    }
  });

  const watchRole = watch('role');

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await registerUser(data);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Create Your Account</h1>
            <p>Join the startup marketplace community</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {/* Role Selection */}
            <div className="form-group">
              <label className="form-label">I want to</label>
              <div className="role-selection">
                <label className={`role-option ${watchRole === 'founder' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    value="founder"
                    {...register('role', { required: 'Please select a role' })}
                  />
                  <div className="role-content">
                    <div className="role-icon">🚀</div>
                    <div className="role-text">
                      <h3>Sell my startup</h3>
                      <p>List and sell your startup to potential buyers</p>
                    </div>
                  </div>
                </label>
                
                <label className={`role-option ${watchRole === 'buyer' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    value="buyer"
                    {...register('role', { required: 'Please select a role' })}
                  />
                  <div className="role-content">
                    <div className="role-icon">💼</div>
                    <div className="role-text">
                      <h3>Buy or invest</h3>
                      <p>Discover and acquire promising startups</p>
                    </div>
                  </div>
                </label>
              </div>
              {errors.role && (
                <span className="error-message">{errors.role.message}</span>
              )}
            </div>

            {/* Personal Information */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className={`form-input ${errors.firstName ? 'error' : ''}`}
                  placeholder="John"
                  {...register('firstName', {
                    required: 'First name is required',
                    minLength: {
                      value: 2,
                      message: 'First name must be at least 2 characters'
                    }
                  })}
                />
                {errors.firstName && (
                  <span className="error-message">{errors.firstName.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className={`form-input ${errors.lastName ? 'error' : ''}`}
                  placeholder="Doe"
                  {...register('lastName', {
                    required: 'Last name is required',
                    minLength: {
                      value: 2,
                      message: 'Last name must be at least 2 characters'
                    }
                  })}
                />
                {errors.lastName && (
                  <span className="error-message">{errors.lastName.message}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="john@example.com"
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
                Company {watchRole === 'founder' ? '(Optional)' : ''}
              </label>
              <input
                id="company"
                type="text"
                className="form-input"
                placeholder="Your company name"
                {...register('company')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Create a strong password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  {...register('terms', {
                    required: 'You must accept the terms and conditions'
                  })}
                />
                <span className="checkmark"></span>
                I agree to the{' '}
                <Link to="/terms" className="auth-link">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="auth-link">
                  Privacy Policy
                </Link>
              </label>
              {errors.terms && (
                <span className="error-message">{errors.terms.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="auth-visual">
          <div className="visual-content">
            <h2>Start Your Journey</h2>
            <p>
              Whether you're looking to sell your startup or find your next investment, 
              we've got you covered with our comprehensive marketplace.
            </p>
            <div className="visual-features">
              <div className="feature">
                <div className="feature-icon">🔒</div>
                <div className="feature-text">
                  <h4>Secure Transactions</h4>
                  <p>Protected by industry-leading security</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">🤝</div>
                <div className="feature-text">
                  <h4>Verified Users</h4>
                  <p>All users go through verification process</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">📈</div>
                <div className="feature-text">
                  <h4>Growth Focused</h4>
                  <p>Tools to help your business succeed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;