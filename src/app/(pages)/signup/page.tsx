'use client';

import { Box, Grid } from '@mui/material';
import Image from 'next/image';
import AuthForm from '@/components/AuthForm';
import { AuthBg } from '@/assets/images';

const SignUpPage = () => {
  const handleSubmit = (data: { email: string; password: string; fullName?: string }) => {
    console.log('Sign Up:', data);
    // Handle sign up logic here
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Sign up with ${provider}`);
    // Handle social login logic here
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Main Content */}
     
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
                backgroundColor: 'rgba(0,0,0,0.43)',
              }}
            />
          </Grid>

          {/* Right Side - Sign Up Form */}
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
            <AuthForm 
              mode="signup" 
              onSubmit={handleSubmit}
              onSocialLogin={handleSocialLogin}
            />
          </Grid>
        </Grid>
      </Box>
  );
};

export default SignUpPage;