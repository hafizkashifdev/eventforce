# Event Force - Complete Deployment Guide

This guide covers deploying the complete Event Force system with Backend API, Admin Dashboard, and Customer Frontend.

## System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Customer      │    │   Admin         │    │   Backend       │
│   Frontend      │    │   Dashboard     │    │   API           │
│   (Next.js)     │    │   (Next.js)     │    │   (NestJS)      │
│   Port: 3000    │    │   Port: 3001    │    │   Port: 4000    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Database      │
                    │   (PostgreSQL)  │
                    └─────────────────┘
```

## Prerequisites

- Node.js 18+
- PostgreSQL 13+
- Docker & Docker Compose (optional)
- Stripe Account (for payments)
- Domain name (for production)

## Quick Start with Docker

### 1. Clone and Setup

```bash
git clone <repository-url>
cd event-force
```

### 2. Environment Configuration

Create environment files:

```bash
# Backend
cp backend/env.example backend/.env

# Admin Dashboard
cp admin-dashboard/env.example admin-dashboard/.env.local

# Customer Frontend (when created)
cp customer-frontend/env.example customer-frontend/.env.local
```

### 3. Update Environment Variables

**Backend (.env):**
```env
DATABASE_URL="postgresql://postgres:password@postgres:5432/eventforce?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
PORT=4000
CORS_ORIGIN="http://localhost:3000,http://localhost:3001"
```

**Admin Dashboard (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET="your-nextauth-secret-key"
```

### 4. Start with Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 5. Initialize Database

```bash
# Run migrations and seed data
docker-compose exec api npm run prisma:migrate
docker-compose exec api npm run prisma:seed
```

### 6. Access Applications

- **Backend API**: http://localhost:4000
- **API Documentation**: http://localhost:4000/api/docs
- **Admin Dashboard**: http://localhost:3001
- **Customer Frontend**: http://localhost:3000 (when created)

## Manual Deployment

### Backend API

1. **Setup Database**
   ```bash
   # Install PostgreSQL and create database
   createdb eventforce
   ```

2. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment**
   ```bash
   cp env.example .env
   # Update .env with your configuration
   ```

4. **Database Setup**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   ```

5. **Start Server**
   ```bash
   # Development
   npm run start:dev
   
   # Production
   npm run build
   npm run start:prod
   ```

### Admin Dashboard

1. **Install Dependencies**
   ```bash
   cd admin-dashboard
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp env.example .env.local
   # Update .env.local with your configuration
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm run start
   ```

## Production Deployment

### Using Docker (Recommended)

1. **Create Production Docker Compose**

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: eventforce
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  api:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://postgres:${DB_PASSWORD}@postgres:5432/eventforce?schema=public
      JWT_SECRET: ${JWT_SECRET}
      JWT_REFRESH_SECRET: ${JWT_REFRESH_SECRET}
      STRIPE_SECRET_KEY: ${STRIPE_SECRET_KEY}
      STRIPE_WEBHOOK_SECRET: ${STRIPE_WEBHOOK_SECRET}
      CORS_ORIGIN: ${CORS_ORIGIN}
    ports:
      - "4000:4000"
    depends_on:
      - postgres

  admin:
    build:
      context: ./admin-dashboard
      dockerfile: Dockerfile
    environment:
      NEXT_PUBLIC_API_URL: ${API_URL}
      NEXTAUTH_URL: ${ADMIN_URL}
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
    ports:
      - "3001:3000"
    depends_on:
      - api

volumes:
  postgres_data:
```

2. **Deploy to Production**

```bash
# Set environment variables
export DB_PASSWORD="your-secure-password"
export JWT_SECRET="your-jwt-secret"
export JWT_REFRESH_SECRET="your-refresh-secret"
export STRIPE_SECRET_KEY="sk_live_your_stripe_secret_key"
export STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
export CORS_ORIGIN="https://yourdomain.com,https://admin.yourdomain.com"
export API_URL="https://api.yourdomain.com/api/v1"
export ADMIN_URL="https://admin.yourdomain.com"
export NEXTAUTH_SECRET="your-nextauth-secret"

# Deploy
docker-compose -f docker-compose.prod.yml up -d

# Initialize database
docker-compose -f docker-compose.prod.yml exec api npm run prisma:migrate
docker-compose -f docker-compose.prod.yml exec api npm run prisma:seed
```

### Using Cloud Platforms

#### Vercel (Frontend)

1. **Deploy Admin Dashboard**
   ```bash
   cd admin-dashboard
   vercel --prod
   ```

2. **Deploy Customer Frontend**
   ```bash
   cd customer-frontend
   vercel --prod
   ```

#### Railway (Backend)

1. **Connect GitHub repository**
2. **Set environment variables**
3. **Deploy automatically**

#### AWS/GCP/Azure

1. **Create VM instances**
2. **Install Docker and Docker Compose**
3. **Clone repository**
4. **Configure environment variables**
5. **Deploy using production docker-compose**

## Environment Variables Reference

### Backend API

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Yes | - |
| `JWT_SECRET` | JWT signing secret | Yes | - |
| `JWT_REFRESH_SECRET` | Refresh token secret | Yes | - |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes | - |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | Yes | - |
| `PORT` | Server port | No | 4000 |
| `CORS_ORIGIN` | Allowed CORS origins | No | http://localhost:3000,http://localhost:3001 |

### Admin Dashboard

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes | http://localhost:4000/api/v1 |
| `NEXTAUTH_URL` | Admin dashboard URL | Yes | http://localhost:3001 |
| `NEXTAUTH_SECRET` | NextAuth secret | Yes | - |

### Customer Frontend

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes | http://localhost:4000/api/v1 |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes | - |

## Stripe Configuration

### 1. Create Stripe Account

1. Sign up at [stripe.com](https://stripe.com)
2. Get your API keys from the dashboard
3. Set up webhook endpoints

### 2. Configure Webhooks

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://yourdomain.com/api/v1/webhooks/stripe`
3. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `refund.created`
4. Copy webhook secret

### 3. Update Environment Variables

```env
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## Database Management

### Migrations

```bash
# Create new migration
npm run prisma:migrate dev --name migration_name

# Apply migrations
npm run prisma:migrate deploy

# Reset database
npm run prisma:migrate reset
```

### Backup and Restore

```bash
# Backup
pg_dump eventforce > backup.sql

# Restore
psql eventforce < backup.sql
```

## Monitoring and Logs

### Application Logs

```bash
# Docker logs
docker-compose logs -f api
docker-compose logs -f admin

# Individual service logs
docker logs eventforce-api
docker logs eventforce-admin
```

### Health Checks

- **Backend API**: `GET /api/v1/health`
- **Admin Dashboard**: `GET /api/health`
- **Customer Frontend**: `GET /api/health`

## Security Considerations

### Production Checklist

- [ ] Use strong, unique passwords
- [ ] Enable HTTPS with SSL certificates
- [ ] Set up proper CORS origins
- [ ] Use environment variables for secrets
- [ ] Enable database encryption
- [ ] Set up monitoring and alerting
- [ ] Regular security updates
- [ ] Backup strategy
- [ ] Rate limiting configured
- [ ] Input validation enabled

### SSL Certificates

```bash
# Using Let's Encrypt with Certbot
certbot --nginx -d yourdomain.com -d admin.yourdomain.com -d api.yourdomain.com
```

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check DATABASE_URL format
   - Verify PostgreSQL is running
   - Check network connectivity

2. **CORS Errors**
   - Update CORS_ORIGIN environment variable
   - Check frontend URLs match

3. **Stripe Webhook Failures**
   - Verify webhook URL is accessible
   - Check webhook secret
   - Review Stripe dashboard logs

4. **Authentication Issues**
   - Verify JWT secrets are set
   - Check token expiration settings
   - Review refresh token logic

### Debug Mode

```bash
# Enable debug logging
NODE_ENV=development npm run start:dev

# View detailed logs
DEBUG=* npm run start:dev
```

## Support

For issues and questions:

1. Check the logs first
2. Review environment variables
3. Verify all services are running
4. Check network connectivity
5. Review this deployment guide

## Next Steps

After successful deployment:

1. Set up monitoring (e.g., Sentry, DataDog)
2. Configure backups
3. Set up CI/CD pipeline
4. Add load balancing if needed
5. Implement caching strategies
6. Set up analytics
