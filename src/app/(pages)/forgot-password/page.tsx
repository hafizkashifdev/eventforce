'use client';

import React, { useState } from 'react';
import {
  Box,
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
import { useRouter } from 'next/navigation';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const isMobile = useCustomMediaQuery('(max-width:900px)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Send OTP to:', email);
    // Handle forgot password logic here
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Grid container sx={{ minHeight: { xs: 'auto', md: '100vh' } }}>
        {/* Left Side - Background Image */}
        <Grid
          size={{ xs: 0, lg: 7 }}
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
                backgroundColor: 'rgba(0,0,0,0.43)',
              }}
            />
          </Grid>

        {/* Right Side - Forgot Password Form */}
        <Grid
          size={{ xs: 12, lg: 5 }}
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
                <Box sx={{ textAlign: 'center', mb: { xs: 2, sm: 3 } }}>
                  <Typography
                    variant={isMobile ? 'h6' : 'h5'}
                    sx={{
                      fontWeight: 'bold',
                      color: '#333',
                      mb: 0.5,
                    }}
                  >
                    Forgot Password?
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#666',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    }}
                  >
                    No worries, we'll send you reset instructions.
                  </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit}>
                  {/* Email Label */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#333',
                      fontWeight: 'bold',
                      mb: 0.5,
                      fontSize: '0.75rem',
                    }}
                  >
                    Email Address*
                  </Typography>
                  
                  {/* Email Field */}
                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address here"
                    required
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: '#666' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                      },
                    }}
                  />

                  {/* Send OTP Button */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: '#52A4C1',
                      color: 'white',
                      py: 1,
                      mb: 2,
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      fontSize: '0.875rem',
                      '&:hover': {
                        backgroundColor: '#4a94b1',
                      },
                    }}
                  >
                    Sent OTP
                  </Button>

                  {/* Back to Sign In */}
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ color: '#666', fontSize: '0.75rem' }}>
                      Remember your password?{' '}
                      <Button
                        onClick={() => router.push('/signin')}
                        sx={{
                          color: '#52A4C1',
                          textDecoration: 'none',
                          fontWeight: 'bold',
                          textTransform: 'none',
                          p: 0,
                          minWidth: 'auto',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
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
  );
};

export default ForgotPasswordPage;
