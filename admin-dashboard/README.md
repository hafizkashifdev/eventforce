# Event Force Admin Dashboard

A modern admin dashboard built with Next.js 14, TypeScript, and Material-UI for managing the Event Force transportation booking system.

## Features

- **Authentication**: Secure login with JWT tokens
- **Dashboard Overview**: Real-time metrics and charts
- **User Management**: View, edit, and manage users with role-based access
- **Vehicle Management**: Add, edit, and delete vehicles from the fleet
- **Booking Management**: View and manage all bookings with status updates
- **Payment Management**: Monitor payments and process refunds
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Data refreshes automatically

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI) v5
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Styling**: Emotion (CSS-in-JS)

## Prerequisites

- Node.js 18+
- npm or yarn
- Running Event Force Backend API

## Installation

1. **Navigate to admin dashboard directory**
   ```bash
   cd admin-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env.local
   ```
   
   Update the `.env.local` file:
   ```env
   API_URL=http://localhost:4000/api/v1
   NEXTAUTH_URL=http://localhost:3001
   NEXTAUTH_SECRET=your-nextauth-secret-key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3001](http://localhost:3001)

## Demo Credentials

- **Admin**: admin@eventforce.com / admin123
- **Staff**: staff@eventforce.com / staff123

## Features Overview

### Dashboard
- Overview metrics (users, bookings, vehicles, revenue)
- Interactive charts showing data distribution
- Recent activity feed
- Quick access to key management functions

### User Management
- View all users with pagination
- Edit user details and roles
- Delete users (admin only)
- Role-based access control (CUSTOMER, STAFF, ADMIN)

### Vehicle Management
- Add new vehicles to the fleet
- Edit vehicle details (name, description, seats, pricing)
- Delete vehicles (admin only)
- View vehicle statistics

### Booking Management
- View all bookings with filtering
- Change booking status (pending → confirmed → completed)
- Quick confirm/complete actions
- View booking details and customer information

### Payment Management
- Monitor all payments and their status
- View payment statistics and revenue
- Process refunds for successful payments
- Track Stripe payment intents

## API Integration

The dashboard communicates with the Event Force Backend API:

- **Authentication**: JWT-based auth with automatic token refresh
- **Data Fetching**: TanStack Query for efficient data management
- **Error Handling**: Comprehensive error handling and user feedback
- **Real-time Updates**: Automatic data refresh and optimistic updates

## Project Structure

```
admin-dashboard/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/          # Dashboard pages
│   │   ├── login/              # Login page
│   │   ├── contexts/           # React contexts
│   │   └── layout.tsx          # Root layout
│   ├── components/             # Reusable components
│   └── lib/                    # Utilities and API client
├── public/                     # Static assets
├── package.json
├── next.config.js
└── tsconfig.json
```

## Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint

# Type checking
npm run type-check
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `API_URL` | Backend API URL | http://localhost:4000/api/v1 |
| `NEXTAUTH_URL` | Next.js app URL | http://localhost:3001 |
| `NEXTAUTH_SECRET` | NextAuth secret key | Required |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Docker

```bash
# Build image
docker build -t eventforce-admin .

# Run container
docker run -p 3001:3001 --env-file .env.local eventforce-admin
```

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Different access levels for admin and staff
- **Token Refresh**: Automatic token refresh to maintain sessions
- **Input Validation**: Client-side validation for all forms
- **Error Handling**: Secure error handling without exposing sensitive data

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
