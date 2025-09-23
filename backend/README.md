# Event Force Backend API

A comprehensive NestJS backend API for a vehicle booking and management system with Stripe payment integration.

## Features

- **Authentication & Authorization**: JWT-based auth with refresh tokens and role-based access control
- **User Management**: Complete CRUD operations for users with role management
- **Vehicle Management**: Fleet management with availability checking
- **Booking System**: Advanced booking system with status workflow and availability validation
- **Payment Integration**: Stripe payment processing with webhooks
- **Admin Dashboard**: Comprehensive metrics and management endpoints
- **Security**: Rate limiting, CORS, validation, and security headers
- **Database**: PostgreSQL with Prisma ORM
- **Documentation**: Swagger/OpenAPI documentation

## Tech Stack

- **Framework**: NestJS 10.x
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Payments**: Stripe
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI

## Prerequisites

- Node.js 18+ 
- PostgreSQL 13+
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://postgres:password@localhost:5432/eventforce?schema=public"
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key
   JWT_REFRESH_SECRET=your-super-secret-refresh-key
   
   # Stripe
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   
   # Application
   PORT=4000
   CORS_ORIGIN=http://localhost:3000,http://localhost:3001
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   
   # Seed the database
   npx prisma db seed
   ```

5. **Start the application**
   ```bash
   # Development
   npm run start:dev
   
   # Production
   npm run build
   npm run start:prod
   ```

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:4000/api/docs
- **Health Check**: http://localhost:4000/api/v1/health

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password
- `GET /api/v1/auth/profile` - Get current user profile

### Users
- `GET /api/v1/users` - Get all users (Admin/Staff only)
- `GET /api/v1/users/me` - Get current user profile
- `GET /api/v1/users/:id` - Get user by ID (Admin/Staff only)
- `PATCH /api/v1/users/me` - Update current user profile
- `PATCH /api/v1/users/:id` - Update user by ID (Admin only)
- `DELETE /api/v1/users/:id` - Delete user (Admin only)

### Vehicles
- `GET /api/v1/vehicles` - Get all vehicles
- `GET /api/v1/vehicles/:id` - Get vehicle by ID
- `POST /api/v1/vehicles` - Create vehicle (Staff/Admin only)
- `PATCH /api/v1/vehicles/:id` - Update vehicle (Staff/Admin only)
- `DELETE /api/v1/vehicles/:id` - Delete vehicle (Admin only)

### Bookings
- `GET /api/v1/bookings` - Get all bookings
- `GET /api/v1/bookings/:id` - Get booking by ID
- `POST /api/v1/bookings` - Create booking
- `PATCH /api/v1/bookings/:id` - Update booking
- `DELETE /api/v1/bookings/:id` - Cancel booking
- `POST /api/v1/bookings/:id/confirm` - Confirm booking (Staff/Admin only)
- `POST /api/v1/bookings/:id/complete` - Complete booking (Staff/Admin only)
- `POST /api/v1/bookings/availability` - Check vehicle availability

### Payments
- `POST /api/v1/payments/create-intent` - Create payment intent
- `POST /api/v1/payments/process` - Process payment
- `GET /api/v1/payments` - Get all payments
- `GET /api/v1/payments/:id` - Get payment by ID
- `POST /api/v1/payments/refund` - Refund payment (Staff/Admin only)
- `GET /api/v1/payments/stats` - Get payment statistics (Staff/Admin only)

### Admin
- `GET /api/v1/admin/dashboard` - Get dashboard metrics (Admin/Staff only)
- `GET /api/v1/admin/users/stats` - Get user statistics (Admin/Staff only)
- `GET /api/v1/admin/bookings/stats` - Get booking statistics (Admin/Staff only)
- `GET /api/v1/admin/payments/stats` - Get payment statistics (Admin/Staff only)

### Webhooks
- `POST /api/v1/webhooks/stripe` - Stripe webhook endpoint

## Database Schema

### Users
- `id` (UUID, Primary Key)
- `email` (String, Unique)
- `passwordHash` (String)
- `name` (String, Optional)
- `role` (Enum: CUSTOMER, STAFF, ADMIN)
- `isVerified` (Boolean)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Vehicles
- `id` (UUID, Primary Key)
- `name` (String)
- `description` (String, Optional)
- `seats` (Int, Optional)
- `priceCents` (Int)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Bookings
- `id` (UUID, Primary Key)
- `userId` (UUID, Foreign Key)
- `vehicleId` (UUID, Foreign Key)
- `startAt` (DateTime)
- `endAt` (DateTime)
- `totalCents` (Int)
- `status` (Enum: PENDING, CONFIRMED, CANCELED, COMPLETED)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Payments
- `id` (UUID, Primary Key)
- `bookingId` (UUID, Foreign Key, Optional)
- `amountCents` (Int)
- `currency` (String, Default: "usd")
- `stripePaymentIntent` (String, Unique, Optional)
- `status` (String)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

## Authentication

The API uses JWT-based authentication with the following flow:

1. **Register/Login**: User provides credentials
2. **Token Response**: API returns access token (15min) and refresh token (30 days)
3. **API Requests**: Include `Authorization: Bearer <access_token>` header
4. **Token Refresh**: Use refresh token to get new access token
5. **Logout**: Revoke refresh token

## Role-Based Access Control

- **CUSTOMER**: Can manage own bookings and payments
- **STAFF**: Can view all data, manage bookings, process payments
- **ADMIN**: Full access to all endpoints and data

## Payment Flow

1. **Create Booking**: User creates a booking (status: PENDING)
2. **Create Payment Intent**: Generate Stripe payment intent
3. **Process Payment**: Client completes payment with Stripe
4. **Webhook**: Stripe webhook confirms payment
5. **Update Booking**: Booking status changes to CONFIRMED

## Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run test coverage
npm run test:cov
```

## Deployment

### Docker

```bash
# Build image
docker build -t eventforce-api .

# Run container
docker run -p 4000:4000 --env-file .env eventforce-api
```

### Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f api
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_REFRESH_SECRET` | Refresh token secret | Required |
| `STRIPE_SECRET_KEY` | Stripe secret key | Required |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | Required |
| `PORT` | Server port | 4000 |
| `CORS_ORIGIN` | Allowed CORS origins | http://localhost:3000,http://localhost:3001 |

## Scripts

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod

# Database
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed

# Testing
npm run test
npm run test:e2e
npm run test:cov
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.