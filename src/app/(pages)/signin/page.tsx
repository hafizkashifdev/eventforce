'use client';

import { Box, Grid } from '@mui/material';
import Image from 'next/image';
import AuthForm from '@/components/AuthForm';
import { AuthBg } from '@/assets/images';

const SignInPage = () => {
  const handleSubmit = (data: { email: string; password: string; fullName?: string; rememberMe?: boolean }) => {
    console.log('Sign In:', data);
    // Handle sign in logic here
    if (data.rememberMe) {
      // Store user session for longer duration
      console.log('Remember me enabled');
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Sign in with ${provider}`);
    // Handle social login logic here
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

          {/* Right Side - Sign In Form */}
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
            <AuthForm 
              mode="signin" 
              onSubmit={handleSubmit}
              onSocialLogin={handleSocialLogin}
            />
          </Grid>
        </Grid>
    </Box>
  );
};

export default SignInPage;