import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { startupAPI } from '../services/api';
import StartupCard from '../components/Startup/StartupCard';
import './ExplorePage.css';

const ExplorePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    industry: searchParams.get('industry') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    page: parseInt(searchParams.get('page')) || 1
  });

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

  useEffect(() => {
    fetchStartups();
  }, [filters]);

  const fetchStartups = async () => {
    setLoading(true);
    try {
      const params = {};
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params[key] = filters[key];
        }
      });

      const response = await startupAPI.getAll(params);
      setStartups(response.data.startups);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching startups:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters, page: 1 };
    setFilters(updatedFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.keys(updatedFilters).forEach(key => {
      if (updatedFilters[key]) {
        params.set(key, updatedFilters[key]);
      }
    });
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    const updatedFilters = { ...filters, page };
    setFilters(updatedFilters);
    
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      industry: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      page: 1
    });
    setSearchParams({});
  };

  return (
    <div className="explore-page">
      <div className="container">
        <div className="explore-header">
          <h1>Explore Startups</h1>
          <p>Discover your next investment opportunity or acquisition target</p>
        </div>

        <div className="explore-content">
          {/* Filters Sidebar */}
          <aside className="filters-sidebar">
            <div className="filters-header">
              <h3>Filters</h3>
              <button onClick={clearFilters} className="clear-filters">
                Clear All
              </button>
            </div>

            <div className="filter-group">
              <label className="filter-label">Search</label>
              <input
                type="text"
                className="form-input"
                placeholder="Search startups..."
                value={filters.search}
                onChange={(e) => updateFilters({ search: e.target.value })}
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Industry</label>
              <select
                className="form-select"
                value={filters.industry}
                onChange={(e) => updateFilters({ industry: e.target.value })}
              >
                <option value="">All Industries</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Category</label>
              <select
                className="form-select"
                value={filters.category}
                onChange={(e) => updateFilters({ category: e.target.value })}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Price Range</label>
              <div className="price-inputs">
                <input
                  type="number"
                  className="form-input"
                  placeholder="Min ($)"
                  value={filters.minPrice}
                  onChange={(e) => updateFilters({ minPrice: e.target.value })}
                />
                <input
                  type="number"
                  className="form-input"
                  placeholder="Max ($)"
                  value={filters.maxPrice}
                  onChange={(e) => updateFilters({ maxPrice: e.target.value })}
                />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="startups-main">
            <div className="results-header">
              <div className="results-info">
                {pagination.total ? (
                  <span>
                    Showing {((pagination.current - 1) * 12) + 1}-{Math.min(pagination.current * 12, pagination.total)} of {pagination.total} startups
                  </span>
                ) : (
                  <span>No startups found</span>
                )}
              </div>
            </div>

            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
              </div>
            ) : (
              <>
                {startups.length > 0 ? (
                  <div className="startups-grid">
                    {startups.map(startup => (
                      <StartupCard key={startup._id} startup={startup} />
                    ))}
                  </div>
                ) : (
                  <div className="no-results">
                    <div className="no-results-icon">🔍</div>
                    <h3>No startups found</h3>
                    <p>Try adjusting your filters or search terms</p>
                    <button onClick={clearFilters} className="btn btn-primary">
                      Clear Filters
                    </button>
                  </div>
                )}

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      disabled={!pagination.hasPrev}
                      onClick={() => handlePageChange(pagination.current - 1)}
                    >
                      Previous
                    </button>
                    
                    <div className="pagination-numbers">
                      {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          className={`pagination-number ${page === pagination.current ? 'active' : ''}`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      className="pagination-btn"
                      disabled={!pagination.hasNext}
                      onClick={() => handlePageChange(pagination.current + 1)}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;