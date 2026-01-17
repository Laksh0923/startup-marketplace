import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API service functions
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

export const startupAPI = {
  getAll: (params) => api.get('/startups', { params }),
  getFeatured: () => api.get('/startups/featured'),
  getById: (id) => api.get(`/startups/${id}`),
  create: (data) => api.post('/startups', data),
  update: (id, data) => api.put(`/startups/${id}`, data),
  delete: (id) => api.delete(`/startups/${id}`),
};

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getDashboard: () => api.get('/users/dashboard'),
};

export const uploadAPI = {
  uploadImages: (formData) => api.post('/uploads/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  uploadDocuments: (formData) => api.post('/uploads/documents', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteFile: (filename) => api.delete(`/uploads/${filename}`),
};

export const paymentAPI = {
  createIntent: (data) => api.post('/payments/create-intent', data),
  confirmPayment: (data) => api.post('/payments/confirm', data),
  getHistory: (params) => api.get('/payments/history', { params }),
};

export default api;