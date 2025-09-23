# Event Force - Complete Transportation Booking System

A comprehensive full-stack transportation booking and management system built with modern technologies. Features include user authentication, vehicle management, booking system, payment processing with Stripe, and admin dashboard.

## 🚀 Features

### Backend API (NestJS)
- **Authentication & Authorization**: JWT-based auth with refresh tokens and role-based access control
- **User Management**: Complete CRUD operations with role management (CUSTOMER, STAFF, ADMIN)
- **Vehicle Management**: Fleet management with availability checking
- **Booking System**: Advanced booking system with status workflow and availability validation
- **Payment Integration**: Stripe payment processing with webhooks
- **Admin Metrics**: Comprehensive analytics and reporting
- **Security**: Rate limiting, CORS, validation, and security headers
- **Database**: PostgreSQL with Prisma ORM
- **Documentation**: Swagger/OpenAPI documentation

### Admin Dashboard (Next.js)
- **Modern UI**: Material-UI components with responsive design
- **Dashboard Overview**: Real-time metrics and interactive charts
- **User Management**: View, edit, and manage users with role-based access
- **Vehicle Management**: Add, edit, and delete vehicles from the fleet
- **Booking Management**: View and manage all bookings with status updates
- **Payment Management**: Monitor payments and process refunds
- **Real-time Updates**: Data refreshes automatically with TanStack Query

### Customer Frontend (Next.js) - Coming Soon
- **User Authentication**: Secure login and registration
- **Vehicle Selection**: Browse available vehicles with filtering
- **Booking Flow**: Complete booking process with availability checking
- **Payment Integration**: Stripe checkout for secure payments
- **Booking Management**: View and manage personal bookings
- **Responsive Design**: Mobile-first approach

## 🛠 Tech Stack

### Backend
- **Framework**: NestJS 10.x
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Payments**: Stripe
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI) v5
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Styling**: Emotion (CSS-in-JS)

## 📁 Project Structure

```
event-force/
├── backend/                    # NestJS Backend API
│   ├── src/
│   │   ├── modules/           # Feature modules
│   │   │   ├── auth/          # Authentication
│   │   │   ├── users/         # User management
│   │   │   ├── vehicles/      # Vehicle management
│   │   │   ├── bookings/      # Booking system
│   │   │   ├── payments/      # Payment processing
│   │   │   └── admin/         # Admin metrics
│   │   ├── common/            # Shared utilities
│   │   └── main.ts           # Application entry point
│   ├── prisma/               # Database schema and migrations
│   └── package.json
├── admin-dashboard/           # Next.js Admin Dashboard
│   ├── src/
│   │   ├── app/              # Next.js App Router
│   │   ├── components/       # Reusable components
│   │   └── lib/              # Utilities and API client
│   └── package.json
├── customer-frontend/         # Next.js Customer Frontend (Coming Soon)
├── docker-compose.yml         # Docker configuration
├── DEPLOYMENT_GUIDE.md        # Comprehensive deployment guide
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 13+
- Docker & Docker Compose (optional)

### 1. Clone Repository
```bash
git clone <repository-url>
cd event-force
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Setup environment
cp env.example .env
# Update .env with your configuration

# Setup database
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed

# Start development server
npm run start:dev
```

### 3. Admin Dashboard Setup
```bash
cd admin-dashboard

# Install dependencies
npm install

# Setup environment
cp env.example .env.local
# Update .env.local with your configuration

# Start development server
npm run dev
```

### 4. Access Applications
- **Backend API**: http://localhost:4000
- **API Documentation**: http://localhost:4000/api/docs
- **Admin Dashboard**: http://localhost:3001

## 🔐 Demo Credentials

### Admin Dashboard
- **Admin**: admin@eventforce.com / admin123
- **Staff**: staff@eventforce.com / staff123

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/profile` - Get current user profile

### User Management
- `GET /api/v1/users` - Get all users (Admin/Staff only)
- `GET /api/v1/users/me` - Get current user profile
- `PATCH /api/v1/users/me` - Update current user profile
- `PATCH /api/v1/users/:id` - Update user by ID (Admin only)
- `DELETE /api/v1/users/:id` - Delete user (Admin only)

### Vehicle Management
- `GET /api/v1/vehicles` - Get all vehicles
- `GET /api/v1/vehicles/:id` - Get vehicle by ID
- `POST /api/v1/vehicles` - Create vehicle (Staff/Admin only)
- `PATCH /api/v1/vehicles/:id` - Update vehicle (Staff/Admin only)
- `DELETE /api/v1/vehicles/:id` - Delete vehicle (Admin only)

### Booking Management
- `GET /api/v1/bookings` - Get all bookings
- `GET /api/v1/bookings/:id` - Get booking by ID
- `POST /api/v1/bookings` - Create booking
- `PATCH /api/v1/bookings/:id` - Update booking
- `DELETE /api/v1/bookings/:id` - Cancel booking
- `POST /api/v1/bookings/availability` - Check vehicle availability

### Payment Processing
- `POST /api/v1/payments/create-intent` - Create payment intent
- `POST /api/v1/payments/process` - Process payment
- `GET /api/v1/payments` - Get all payments
- `POST /api/v1/payments/refund` - Refund payment (Staff/Admin only)

### Admin Dashboard
- `GET /api/v1/admin/dashboard` - Get dashboard metrics (Admin/Staff only)
- `GET /api/v1/admin/users/stats` - Get user statistics (Admin/Staff only)
- `GET /api/v1/admin/bookings/stats` - Get booking statistics (Admin/Staff only)
- `GET /api/v1/admin/payments/stats` - Get payment statistics (Admin/Staff only)

## 🗄 Database Schema

### Core Models
- **User**: User accounts with role-based access
- **Vehicle**: Fleet vehicles with pricing and availability
- **Booking**: Booking records with status workflow
- **Payment**: Payment records linked to Stripe

### Relationships
- User → Bookings (One-to-Many)
- User → Payments (One-to-Many)
- Vehicle → Bookings (One-to-Many)
- Booking → Payment (One-to-One)

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Different access levels for users
- **Rate Limiting**: Protection against abuse
- **Input Validation**: Comprehensive data validation
- **CORS Configuration**: Secure cross-origin requests
- **Password Hashing**: bcrypt for secure password storage
- **Stripe Webhooks**: Secure payment processing

## 💳 Payment Integration

### Stripe Configuration
1. Create Stripe account
2. Get API keys from dashboard
3. Set up webhook endpoints
4. Configure environment variables

### Payment Flow
1. User creates booking
2. Payment intent created
3. Client completes payment with Stripe
4. Webhook confirms payment
5. Booking status updated to confirmed

## 🚀 Deployment

### Docker (Recommended)
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### Manual Deployment
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm run test
npm run test:e2e
npm run test:cov
```

### Frontend Tests
```bash
cd admin-dashboard
npm run test
```

## 📈 Monitoring

### Health Checks
- **Backend API**: `GET /api/v1/health`
- **Admin Dashboard**: Built-in health monitoring

### Logging
- Structured logging with Pino
- Request/response logging
- Error tracking and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the documentation
2. Review the deployment guide
3. Check existing issues
4. Create a new issue with detailed information

## 🔮 Roadmap

### Phase 1 (Current)
- [x] Backend API with all core features
- [x] Admin Dashboard
- [x] Authentication and authorization
- [x] Payment integration
- [x] Database schema and migrations

### Phase 2 (Coming Soon)
- [ ] Customer Frontend
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Email notifications
- [ ] SMS notifications

### Phase 3 (Future)
- [ ] Multi-tenant support
- [ ] Advanced reporting
- [ ] Integration with external services
- [ ] Machine learning features
- [ ] Advanced booking features

## 📞 Contact

For questions and support, please contact the development team or create an issue in the repository.

---

**Event Force** - Premium Transportation & Event Logistics Platform