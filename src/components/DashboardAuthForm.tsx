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
  Alert,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Apple } from '@mui/icons-material';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ScaleInView, SlideSidewayInView, SlideUpInView } from './animations';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardAuthFormProps {
  mode: 'signup' | 'signin';
  onSocialLogin?: (provider: string) => void;
}

const DashboardAuthForm: React.FC<DashboardAuthFormProps> = memo(({ mode, onSocialLogin }) => {
  const router = useRouter();
  const { login, register, error, isLoading, clearError } = useAuth();
  const [formData, setFormData] = useState({ 
    fullName: '', 
    email: '', 
    password: '', 
    rememberMe: false 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const isMobile = useMediaQuery('(max-width:900px)');

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setAuthError('');
    
    try {
      if (mode === 'signin') {
        const credentials = {
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe,
        };
        await login(credentials);
        router.push('/dashboard');
      } else {
        const credentials = {
          email: formData.email,
          password: formData.password,
          name: formData.fullName,
        };
        await register(credentials);
        router.push('/dashboard');
      }
    } catch (error: any) {
      setAuthError(error.message || 'Authentication failed');
    }
  }, [formData, mode, login, register, clearError, router]);

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
              {mode === 'signup' ? 'Create Account' : 'Admin Sign In'}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#666', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              {mode === 'signin' ? 'Welcome Back! Login to access admin dashboard' : 'Sign up for Event Force'}
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

        {/* Error Alert */}
        {(error || authError) && (
          <SlideUpInView initialY={20} duration={0.6} delay={0.3}>
            <Alert 
              severity="error" 
              sx={{ mb: 2, fontSize: '0.875rem' }}
              onClose={() => {
                clearError();
                setAuthError('');
              }}
            >
              {error || authError}
            </Alert>
          </SlideUpInView>
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
            disabled={isLoading}
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
              '&:disabled': {
                backgroundColor: '#ccc',
                color: '#666',
              },
            }}
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              mode === 'signup' ? 'Signup' : 'Login'
            )}
          </Button>

          {/* Links */}
          <Box sx={{ textAlign: 'center', mb: 1.5 }}>
            <Typography sx={{ color: '#666', fontSize: '0.75rem' }}>
              {mode === 'signup' ? (
                <>
                  Already have an account?{' '}
                  <Link 
                    component="button"
                    onClick={() => router.push('/admin-login')}
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

          {/* Demo Credentials for Admin */}
          {mode === 'signin' && (
            <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', mb: 1 }}>
                Demo Credentials:
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                Admin: admin@eventforce.com / admin123
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                Staff: staff@eventforce.com / staff123
              </Typography>
            </Box>
          )}
          </Box>
        </SlideUpInView>
      </CardContent>
    </Card>
  );
});

DashboardAuthForm.displayName = 'DashboardAuthForm';

export default DashboardAuthForm;
