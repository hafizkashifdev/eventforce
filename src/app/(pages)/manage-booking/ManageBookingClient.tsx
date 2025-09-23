'use client';

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Grid,
  Chip,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import { 
  Search, 
  FilterList, 
  CalendarToday, 
  LocationOn, 
  DirectionsCar,
  CheckCircle,
  Cancel,
  Edit,
  Delete
} from '@mui/icons-material';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScaleInView, SlideUpInView } from '@/components/animations';

const ManageBookingClient = () => {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock booking data
  const mockBookings = [
    {
      id: 'BK001',
      vehicle: 'Mercedes S-Class',
      pickup: 'King Khalid International Airport',
      destination: 'Riyadh City Center',
      date: '2024-12-20',
      time: '14:30',
      status: 'confirmed',
      price: '400 SAR',
      driver: 'Ahmed Al-Rashid',
      phone: '+966 50 123 4567'
    },
    {
      id: 'BK002',
      vehicle: 'BMW 5 Series',
      pickup: 'Riyadh City Center',
      destination: 'King Fahd Road',
      date: '2024-12-18',
      time: '09:00',
      status: 'completed',
      price: '200 SAR',
      driver: 'Mohammed Al-Sayed',
      phone: '+966 50 234 5678'
    },
    {
      id: 'BK003',
      vehicle: 'Toyota Coaster',
      pickup: 'Jeddah Airport',
      destination: 'Makkah',
      date: '2024-12-22',
      time: '16:00',
      status: 'pending',
      price: '300 SAR',
      driver: 'Omar Al-Hassan',
      phone: '+966 50 345 6789'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.destination.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'completed': return 'info';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle />;
      case 'completed': return <CheckCircle />;
      case 'pending': return <CircularProgress size={16} />;
      case 'cancelled': return <Cancel />;
      default: return undefined;
    }
  };

  const handleBookingAction = (bookingId: string, action: string) => {
    console.log(`${action} booking ${bookingId}`);
    // Implement booking actions here
  };

  if (loading) {
    return (
      <>
        <Header />
        <Box sx={{ minHeight: '100vh', pt: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress size={60} />
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          pt: 8,
          minHeight: '50vh',
          background: 'linear-gradient(135deg, #52A4C1 0%, #1976d2 100%)',
          display: 'flex',
          alignItems: 'center',
          color: 'white'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <SlideUpInView initialY={60} duration={0.8}>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 3,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                }}
              >
                Manage Your Bookings
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
              <Typography 
                variant="h5" 
                sx={{ 
                  opacity: 0.9,
                  maxWidth: '800px',
                  mx: 'auto',
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }
                }}
              >
                View, modify, and track all your transportation bookings in one place
              </Typography>
            </SlideUpInView>
          </Box>
        </Container>
      </Box>

      {/* Search and Filter Section */}
      <Box sx={{ py: 6, backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Search bookings by ID, vehicle, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ color: '#666', mr: 1 }} />
              }}
              sx={{ maxWidth: { md: '400px' } }}
            />
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map((status) => (
                <Chip
                  key={status}
                  label={status.charAt(0).toUpperCase() + status.slice(1)}
                  onClick={() => setFilterStatus(status)}
                  color={filterStatus === status ? 'primary' : 'default'}
                  variant={filterStatus === status ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Bookings List */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <SlideUpInView initialY={60} duration={0.8}>
            <Typography 
              variant="h3" 
              component="h2"
              sx={{ 
                textAlign: 'center', 
                mb: 6, 
                fontWeight: 'bold',
                color: '#333'
              }}
            >
              Your Bookings ({filteredBookings.length})
            </Typography>
          </SlideUpInView>

          {filteredBookings.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5" sx={{ mb: 2, color: '#666' }}>
                No bookings found
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: '#999' }}>
                {searchQuery || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'You don\'t have any bookings yet. Book your first ride!'
                }
              </Typography>
              <Button 
                variant="contained" 
                href="/our-fleet"
                sx={{ 
                  backgroundColor: '#52A4C1',
                  '&:hover': { backgroundColor: '#4A8FA8' }
                }}
              >
                Browse Fleet
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {filteredBookings.map((booking, index) => (
                <ScaleInView key={booking.id} initialScale={0.9} duration={0.8} delay={index * 0.1}>
                  <Card sx={{ overflow: 'visible' }}>
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Booking #{booking.id}
                          </Typography>
                          <Chip
                            icon={getStatusIcon(booking.status)}
                            label={booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            color={getStatusColor(booking.status) as any}
                            size="small"
                            sx={{ mb: 2 }}
                          />
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#52A4C1' }}>
                          {booking.price}
                        </Typography>
                      </Box>

                      <Grid container spacing={4} sx={{ mb: 3 }}>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <DirectionsCar sx={{ color: '#52A4C1', mr: 2 }} />
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                              {booking.vehicle}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <CalendarToday sx={{ color: '#666', mr: 2 }} />
                            <Typography variant="body2">
                              {new Date(booking.date).toLocaleDateString()} at {booking.time}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <LocationOn sx={{ color: '#666', mr: 2 }} />
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                From: {booking.pickup}
                              </Typography>
                              <Typography variant="body2">
                                To: {booking.destination}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>

                      <Divider sx={{ my: 2 }} />

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                            Driver: {booking.driver}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            Phone: {booking.phone}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {booking.status === 'pending' && (
                            <>
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<Edit />}
                                onClick={() => handleBookingAction(booking.id, 'edit')}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                startIcon={<Delete />}
                                onClick={() => handleBookingAction(booking.id, 'cancel')}
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                          {booking.status === 'confirmed' && (
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              startIcon={<Cancel />}
                              onClick={() => handleBookingAction(booking.id, 'cancel')}
                            >
                              Cancel
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </ScaleInView>
              ))}
            </Box>
          )}
        </Container>
      </Box>

      {/* Help Section */}
      <Box sx={{ py: 8, backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <SlideUpInView initialY={60} duration={0.8}>
              <Typography 
                variant="h3" 
                component="h2"
                sx={{ 
                  fontWeight: 'bold',
                  mb: 4,
                  color: '#333'
                }}
              >
                Need Help with Your Booking?
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
              <Typography variant="body1" sx={{ mb: 4, color: '#666', maxWidth: '600px', mx: 'auto' }}>
                If you need to make changes to your booking or have any questions, our support team is here to help.
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={1.0} delay={0.4}>
              <Button 
                variant="contained" 
                size="large"
                href="/support"
                sx={{ 
                  backgroundColor: '#52A4C1',
                  px: 4,
                  py: 1.5,
                  '&:hover': { backgroundColor: '#4A8FA8' }
                }}
              >
                Contact Support
              </Button>
            </SlideUpInView>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default ManageBookingClient;