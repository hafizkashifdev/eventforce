# 🚀 Event Force - Complete Application Startup Guide

This guide will help you run all three parts of your Event Force application:
1. **Backend API** (NestJS + Prisma + PostgreSQL)
2. **Frontend Website** (Next.js)
3. **Admin Dashboard** (React + Vite)

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ Node.js (v18 or higher)
- ✅ PostgreSQL database running
- ✅ Redis server running
- ✅ Git installed

## 🗄️ Database Setup

### 1. Install PostgreSQL
- Download from: https://www.postgresql.org/download/
- Create a database named `eventforce`
- Note your database credentials

### 2. Install Redis
- Windows: Download from https://github.com/microsoftarchive/redis/releases
- Or use Docker: `docker run -d -p 6379:6379 redis:alpine`

## ⚙️ Environment Configuration

### 1. Backend Environment
```bash
# Copy the example environment file
cd backend
copy env.example .env
```

Edit `backend/.env` with your actual values:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/eventforce?schema=public"

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT (generate secure keys)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production

# Stripe (get from https://stripe.com)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Application
NODE_ENV=development
PORT=3001
CORS_ORIGIN=http://localhost:3000
```

## 🚀 Step-by-Step Startup

### Step 1: Start Backend API

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed the database with sample data
npm run prisma:seed

# Start the backend server
npm run start:dev
```

**Backend will run on:** http://localhost:3001
**API Documentation:** http://localhost:3001/api/docs

### Step 2: Start Frontend Website

```bash
# Navigate to root directory (where package.json is)
cd ..

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

**Frontend will run on:** http://localhost:3000

### Step 3: Start Admin Dashboard

```bash
# Navigate to admin dashboard directory
cd admin-dashboard

# Create React app with Vite
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install

# Install additional dependencies for admin dashboard
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material @mui/x-data-grid
npm install axios react-router-dom
npm install @tanstack/react-query
npm install recharts
npm install @types/node

# Start the admin dashboard
npm run dev
```

**Admin Dashboard will run on:** http://localhost:5173

## 🔧 Quick Start Scripts

### Windows (PowerShell)
Create `start-all.ps1`:
```powershell
# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run start:dev"

# Wait 5 seconds
Start-Sleep -Seconds 5

# Start Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd ..; npm run dev"

# Wait 5 seconds
Start-Sleep -Seconds 5

# Start Admin Dashboard
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd admin-dashboard; npm run dev"

Write-Host "All applications starting..."
Write-Host "Backend: http://localhost:3001"
Write-Host "Frontend: http://localhost:3000"
Write-Host "Admin Dashboard: http://localhost:5173"
```

### Linux/Mac (Bash)
Create `start-all.sh`:
```bash
#!/bin/bash

# Start Backend
cd backend && npm run start:dev &
BACKEND_PID=$!

# Wait 5 seconds
sleep 5

# Start Frontend
cd .. && npm run dev &
FRONTEND_PID=$!

# Wait 5 seconds
sleep 5

# Start Admin Dashboard
cd admin-dashboard && npm run dev &
ADMIN_PID=$!

echo "All applications starting..."
echo "Backend: http://localhost:3001"
echo "Frontend: http://localhost:3000"
echo "Admin Dashboard: http://localhost:5173"

# Wait for all processes
wait $BACKEND_PID $FRONTEND_PID $ADMIN_PID
```

## 🌐 Application URLs

| Application | URL | Description |
|-------------|-----|-------------|
| **Frontend Website** | http://localhost:3000 | Customer-facing website |
| **Backend API** | http://localhost:3001 | REST API server |
| **API Docs** | http://localhost:3001/api/docs | Swagger documentation |
| **Admin Dashboard** | http://localhost:5173 | Administrative interface |

## 🔐 Default Admin Account

After running the seed script, you can login with:
- **Email:** admin@eventforce.com
- **Password:** admin123
- **Role:** ADMIN

## 📊 Testing the Applications

### 1. Test Backend API
```bash
# Health check
curl http://localhost:3001/health

# Get all vehicles
curl http://localhost:3001/api/v1/vehicles

# Register a new user
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","firstName":"Test","lastName":"User"}'
```

### 2. Test Frontend
- Open http://localhost:3000
- Navigate through all pages
- Test the booking flow
- Check responsive design

### 3. Test Admin Dashboard
- Open http://localhost:5173
- Login with admin credentials
- Test all admin features
- Check dashboard statistics

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check DATABASE_URL in .env
   - Run `npm run prisma:migrate`

2. **Redis Connection Error**
   - Ensure Redis is running
   - Check REDIS_HOST and REDIS_PORT in .env

3. **Port Already in Use**
   - Change PORT in .env files
   - Kill existing processes: `netstat -ano | findstr :3001`

4. **Module Not Found**
   - Run `npm install` in each directory
   - Clear node_modules and reinstall

### Reset Everything
```bash
# Stop all processes
# Delete node_modules
rm -rf node_modules backend/node_modules admin-dashboard/node_modules

# Reinstall everything
npm install
cd backend && npm install
cd ../admin-dashboard && npm install

# Reset database
cd ../backend
npm run prisma:migrate:reset
npm run prisma:seed
```

## 🎯 Next Steps

1. **Configure Stripe** for payment processing
2. **Set up email service** (SendGrid) for notifications
3. **Deploy to production** when ready
4. **Add monitoring** and logging
5. **Implement real-time features** with WebSockets

## 📞 Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure all services (PostgreSQL, Redis) are running
4. Check the API documentation at http://localhost:3001/api/docs

Happy coding! 🚀
