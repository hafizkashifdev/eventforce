'use client';

import React, { useState, memo, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Divider,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Apple } from '@mui/icons-material';
import { useMediaQuery as useCustomMediaQuery } from '@/hooks/useMediaQuery';
import { ScaleInView, SlideSidewayInView, SlideUpInView } from '@/components/animations';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  mode: 'signup' | 'signin';
  onSubmit?: (formData: { email: string; password: string; fullName?: string; rememberMe?: boolean }) => void;
  onSocialLogin?: (provider: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = memo(({ mode, onSubmit, onSocialLogin }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({ 
    fullName: '', 
    email: '', 
    password: '', 
    rememberMe: false 
  });
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useCustomMediaQuery('(max-width:900px)');

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  }, [formData, onSubmit]);

  const handleSocialLogin = useCallback((provider: string) => {
    onSocialLogin?.(provider);
  }, [onSocialLogin]);

  return (
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
        {/* Title */}
        <SlideUpInView initialY={30} duration={0.6}>
          <Box sx={{ textAlign: 'center', mb: { xs: 2, sm: 3 } }}>
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              sx={{ fontWeight: 'bold', color: '#333', mb: 0.5 }}
            >
              {mode === 'signup' ? 'Create Account' : 'Sign In'}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#666', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              {mode === 'signin' ? 'Welcome Back! Login to access your account' : ''}
            </Typography>
          </Box>
        </SlideUpInView>

        {/* Social Login - Only for Signup */}
        {mode === 'signup' && (
          <SlideSidewayInView initialX={-30} duration={0.7} delay={0.2}>
            <>
              <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
                mb: 1.5,
              }}
            >
              <Button
                fullWidth
                variant="contained"
                startIcon={<Google />}
                onClick={() => handleSocialLogin('Google')}
                sx={{
                  backgroundColor: '#D7D7D9',
                  color: '#333',
                  py: { xs: 0.8, sm: 1 },
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  '&:hover': { 
                    backgroundColor: '#C7C7C9' 
                  },
                }}
              >
                Google
              </Button>
              <Button
                fullWidth
                variant="contained"
                startIcon={<Apple />}
                onClick={() => handleSocialLogin('Apple')}
                sx={{
                  backgroundColor: '#D7D7D9',
                  color: '#333',
                  py: { xs: 0.8, sm: 1 },
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  '&:hover': { 
                    backgroundColor: '#C7C7C9' 
                  },
                }}
              >
                Apple
              </Button>
            </Box>

            {/* Divider */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Divider sx={{ flex: 1 }} />
              <Typography sx={{ px: 2, color: '#666', fontSize: '0.75rem' }}>
                or continue with
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>
            </>
          </SlideSidewayInView>
        )}

        {/* Form */}
        <SlideUpInView initialY={40} duration={0.8} delay={0.4}>
          <Box component="form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <>
              {/* Full Name Label */}
              <Typography
                variant="body2"
                sx={{
                  color: '#333',
                  fontWeight: 'bold',
                  mb: 0.5,
                  fontSize: '0.75rem',
                }}
              >
                Full Name*
              </Typography>
              
              {/* Full Name Field */}
              <TextField
                fullWidth
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                size="small"
                sx={{ 
                  mb: 1.5, 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: '8px' 
                  } 
                }}
              />
            </>
          )}

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
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            required
            size="small"
            sx={{ 
              mb: 1.5, 
              '& .MuiOutlinedInput-root': { 
                borderRadius: '8px' 
              } 
            }}
          />

          {/* Password Label */}
          <Typography
            variant="body2"
            sx={{
              color: '#333',
              fontWeight: 'bold',
              mb: 0.5,
              fontSize: '0.75rem',
            }}
          >
            Password*
          </Typography>
          
          {/* Password Field */}
          <TextField
            fullWidth
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={() => setShowPassword(!showPassword)} 
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ 
              mb: 1, 
              '& .MuiOutlinedInput-root': { 
                borderRadius: '8px' 
              } 
            }}
          />

          {/* Remember Me and Forgot Password - Only for Sign In */}
          {mode === 'signin' && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 1.5 
            }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    sx={{
                      color: '#1976d2',
                      '&.Mui-checked': {
                        color: '#1976d2',
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ 
                    fontSize: '0.75rem', 
                    color: '#666' 
                  }}>
                    Remember me
                  </Typography>
                }
              />
              <Link
                component="button"
                onClick={() => router.push('/forgot-password')}
                sx={{
                  color: '#52A4C1',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Forgot Password?
              </Link>
            </Box>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#52A4C1',
              color: 'white',
              py: 1,
              mb: 1.5,
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '0.875rem',
              '&:hover': { 
                backgroundColor: '#4a94b1' 
              },
            }}
          >
            {mode === 'signup' ? 'Signup' : 'Login'}
          </Button>

          {/* Links */}
          <Box sx={{ textAlign: 'center', mb: 1.5 }}>
            <Typography sx={{ color: '#666', fontSize: '0.75rem' }}>
              {mode === 'signup' ? (
                <>
                  Already have an account?{' '}
                  <Link 
                    component="button"
                    onClick={() => router.push('/signin')}
                    sx={{ 
                      color: '#52A4C1', 
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Sign in
                  </Link>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <Link 
                    component="button"
                    onClick={() => router.push('/signup')}
                    sx={{ 
                      color: '#52A4C1', 
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Create account
                  </Link>
                </>
              )}
            </Typography>
            {mode === 'signin' && (
              <Typography sx={{ color: '#666', fontSize: '0.75rem', mt: 0.5 }}>
                Join Event Force and start your journey
              </Typography>
            )}
          </Box>
          </Box>
        </SlideUpInView>
      </CardContent>
    </Card>
  );
});

AuthForm.displayName = 'AuthForm';

export default AuthForm;
