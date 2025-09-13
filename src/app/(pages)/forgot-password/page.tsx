'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from '@mui/material';
import { Email } from '@mui/icons-material';
import Image from 'next/image';
import { AuthBg } from '@/assets/images';
import { useMediaQuery as useCustomMediaQuery } from '@/hooks/useMediaQuery';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const isMobile = useCustomMediaQuery('(max-width:900px)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Send OTP to:', email);
    // Handle forgot password logic here
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: '#000000',
          py: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
              Event Force
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#1976d2',
                color: 'white',
                px: 3,
                py: 1,
                borderRadius: '25px',
                textTransform: 'none',
                fontWeight: 'bold',
              }}
            >
              Login/Register
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', pt: { xs: 8, md: 10 } }}>
        <Grid container sx={{ minHeight: { xs: 'auto', md: '100vh' } }}>
          {/* Left Side - Background Image */}
          <Grid
            size={{ xs: 0, md: 7 }}
            sx={{
              display: { xs: 'none', md: 'flex' },
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Image
              src={AuthBg}
              alt="Luxury Cars Background"
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              priority
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1))',
              }}
            />
          </Grid>

          {/* Right Side - Forgot Password Form */}
          <Grid
            size={{ xs: 12, md: 5 }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: { xs: 2, sm: 3, md: 4 },
              backgroundColor: '#f8f9fa',
              minHeight: { xs: '100vh', md: 'auto' },
            }}
          >
            <Card
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: 400 },
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                borderRadius: 3,
                mx: { xs: 1, sm: 0 },
              }}
            >
              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
                  <Typography
                    variant={isMobile ? 'h5' : 'h4'}
                    sx={{
                      fontWeight: 'bold',
                      color: '#333',
                      mb: 1,
                    }}
                  >
                    Forgot Password?
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#666',
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                    }}
                  >
                    No worries, we'll send you reset instructions.
                  </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address here"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: '#666' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />

                  {/* Send OTP Button */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: '#1976d2',
                      color: 'white',
                      py: 1.5,
                      mb: 3,
                      borderRadius: '25px',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      '&:hover': {
                        backgroundColor: '#1565c0',
                      },
                    }}
                  >
                    Send OTP
                  </Button>

                  {/* Back to Sign In */}
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ color: '#666', fontSize: '0.875rem' }}>
                      Remember your password?{' '}
                      <Button
                        href="/signin"
                        sx={{
                          color: '#1976d2',
                          textDecoration: 'none',
                          fontWeight: 'bold',
                          textTransform: 'none',
                          p: 0,
                          minWidth: 'auto',
                          '&:hover': {
                            textDecoration: 'underline',
                            backgroundColor: 'transparent',
                          },
                        }}
                      >
                        Sign in
                      </Button>
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
