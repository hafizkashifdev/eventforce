'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  People as PeopleIcon,
  DirectionsCar as CarIcon,
  BookOnline as BookingIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import api from '@/lib/api';
import DashboardChart from '@/components/DashboardChart';

interface DashboardMetrics {
  users: {
    total: number;
    byRole: Record<string, number>;
  };
  bookings: {
    total: number;
    byStatus: Record<string, number>;
    recent: any[];
  };
  payments: {
    total: number;
    totalRevenue: number;
    recent: any[];
  };
}

export default function DashboardPage() {
  const { data: metrics, isLoading, error } = useQuery<DashboardMetrics>({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      const response = await api.get('/admin/dashboard');
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Failed to load dashboard metrics. Please try again.
      </Alert>
    );
  }

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {/* Users Card */}
        <Grid size={{xs:12, sm:6, md:3}}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PeopleIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Users
                  </Typography>
                  <Typography variant="h4">
                    {metrics?.users.total || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Bookings Card */}
        <Grid size={{xs:12, sm:6, md:3}}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <BookingIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Bookings
                  </Typography>
                  <Typography variant="h4">
                    {metrics?.bookings.total || 0}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Vehicles Card */}
        <Grid size={{xs:12, sm:6, md:3}}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <CarIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Vehicles
                  </Typography>
                  <Typography variant="h4">
                    {Object.values(metrics?.users.byRole || {}).reduce((a, b) => a + b, 0)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Revenue Card */}
        <Grid size={{xs:12, sm:6, md:3}}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PaymentIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Revenue
                  </Typography>
                  <Typography variant="h4">
                    {formatCurrency(metrics?.payments.totalRevenue || 0)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Charts */}
        <Grid size={{xs:12, md:3}}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Bookings by Status
              </Typography>
              <DashboardChart
                data={Object.entries(metrics?.bookings.byStatus || {}).map(([status, count]) => ({
                  name: status,
                  value: count,
                }))}
                type="pie"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:3}}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Users by Role
              </Typography>
              <DashboardChart
                data={Object.entries(metrics?.users.byRole || {}).map(([role, count]) => ({
                  name: role,
                  value: count,
                }))}
                type="pie"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Bookings */}
        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Bookings
              </Typography>
              <Box>
                {metrics?.bookings.recent?.length ? (
                  metrics.bookings.recent.map((booking: any) => (
                    <Box key={booking.id} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                      <Typography variant="body1" fontWeight="medium">
                        {booking.user?.name || booking.user?.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {booking.vehicle?.name} - {booking.status}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography color="text.secondary">No recent bookings</Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
