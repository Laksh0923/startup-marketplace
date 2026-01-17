# Startup Marketplace

A comprehensive marketplace platform that connects startup founders seeking to sell or obtain funding for their ventures with entrepreneurs and investors looking to acquire or invest in ready-to-use startups.

## Features

### For Founders
- **Free Startup Listing**: List your startup with detailed information, images, and documents
- **Dashboard Management**: Track views, saves, inquiries, and manage your listings
- **Direct Communication**: Connect directly with potential buyers and investors
- **Performance Analytics**: Monitor engagement and optimize your listing

### For Buyers & Investors
- **Advanced Search**: Filter startups by industry, category, price range, and more
- **Detailed Profiles**: Access comprehensive startup information and metrics
- **Save & Track**: Save interesting opportunities and track your favorites
- **Secure Transactions**: Complete acquisitions and investments safely

### Platform Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Secure Authentication**: JWT-based authentication with role-based access control
- **File Upload**: Support for images, documents, and pitch decks
- **Payment Processing**: Integrated Stripe payment system for transactions
- **Real-time Updates**: Live data updates and notifications

## Technology Stack

### Frontend
- **React 18+** with functional components and hooks
- **React Router** for client-side routing
- **React Hook Form** for form management
- **Styled Components** for styling
- **Axios** for API communication

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Multer** for file uploads
- **Stripe** for payment processing
- **Helmet** for security headers
- **Rate limiting** for API protection

## Project Structure

```
startup-marketplace/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── index.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── uploads/            # File storage
│   └── index.js
└── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Stripe account for payments

### 1. Clone the Repository
```bash
git clone <repository-url>
cd startup-marketplace
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install all dependencies (client + server)
npm run install-all
```

### 3. Environment Configuration

Create a `.env` file in the `server` directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/startup-marketplace
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLIENT_URL=http://localhost:3000
```

Create a `.env` file in the `client` directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Database Setup
Make sure MongoDB is running on your system or update the `MONGODB_URI` to point to your MongoDB instance.

### 5. Start the Application
```bash
# Start both client and server concurrently
npm run dev

# Or start them separately:
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Startups
- `GET /api/startups` - Get all startups (with filtering)
- `GET /api/startups/featured` - Get featured startups
- `GET /api/startups/:id` - Get single startup
- `POST /api/startups` - Create startup (founders only)
- `PUT /api/startups/:id` - Update startup (owner only)
- `DELETE /api/startups/:id` - Delete startup (owner only)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/dashboard` - Get dashboard data

### File Uploads
- `POST /api/uploads/images` - Upload images
- `POST /api/uploads/documents` - Upload documents
- `DELETE /api/uploads/:filename` - Delete file

### Payments
- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/history` - Get payment history

## Key Features Implementation

### User Authentication
- JWT-based authentication with refresh tokens
- Role-based access control (founder/buyer)
- Protected routes and middleware
- Secure password hashing with bcrypt

### Startup Management
- CRUD operations for startup listings
- File upload support for images and documents
- Advanced search and filtering
- View tracking and engagement metrics

### Payment Processing
- Stripe integration for secure payments
- Support for both sales and investments
- Transaction history and management
- Webhook handling for payment updates

### Responsive Design
- Mobile-first approach
- CSS Grid and Flexbox layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## Design System

### Color Palette
- Primary Background: `#0f0f23`
- Secondary Background: `#1a1a2e`
- Card Background: `#1e1e3f`
- Accent Color: `#4299e1`
- Text Colors: `#e2e8f0`, `#a0aec0`

### Typography
- Font Family: Inter
- Headings: 700 weight
- Body: 400-500 weight
- Small text: 300 weight

### Components
- Rounded corners (8px, 12px)
- Soft shadows
- Hover animations
- Consistent spacing scale

## Security Features

- Helmet.js for security headers
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- JWT token expiration
- File upload restrictions
- SQL injection prevention

## Performance Optimizations

- Code splitting with React.lazy
- Image optimization
- API response caching
- Database indexing
- Pagination for large datasets
- Lazy loading for images

## Testing Strategy

The project is designed to support both unit testing and property-based testing:

- **Unit Tests**: Specific examples and edge cases
- **Property Tests**: Universal properties using fast-check
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full user journey testing

## Deployment

### Production Build
```bash
# Build the client
cd client && npm run build

# Start the server in production mode
cd server && NODE_ENV=production npm start
```

### Environment Variables for Production
Update the environment variables for production:
- Use production MongoDB URI
- Use production Stripe keys
- Set secure JWT secrets
- Configure email service
- Set production client URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact:
- Email: support@startupmarketplace.com
- Documentation: [Link to docs]
- Issues: [GitHub Issues]

---

Built with ❤️ for the startup community