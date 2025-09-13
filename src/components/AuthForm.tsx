'use client';

import React, { useState } from 'react';
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
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Apple } from '@mui/icons-material';
import { useMediaQuery as useCustomMediaQuery } from '@/hooks/useMediaQuery';

interface AuthFormProps {
  mode: 'signup' | 'signin';
  onSubmit?: (formData: { email: string; password: string; fullName?: string }) => void;
  onSocialLogin?: (provider: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, onSocialLogin }) => {
  const [formData, setFormData] = useState({ 
    fullName: '', 
    email: '', 
    password: '' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useCustomMediaQuery('(max-width:900px)');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleSocialLogin = (provider: string) => {
    onSocialLogin?.(provider);
  };

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
        <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}
          >
            {mode === 'signup' ? 'Create Account' : 'Sign In'}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#666', fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            {mode === 'signup'
              ? 'Join Event Force and start your journey'
              : 'Welcome Back! Login to access your account'}
          </Typography>
        </Box>

        {/* Social Login */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 1.5, sm: 2 },
            mb: 3,
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            onClick={() => handleSocialLogin('Google')}
            sx={{
              borderColor: '#ddd',
              color: '#333',
              py: { xs: 1.2, sm: 1.5 },
              borderRadius: '25px',
              textTransform: 'none',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              '&:hover': { 
                borderColor: '#1976d2', 
                backgroundColor: '#f5f5f5' 
              },
            }}
          >
            Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Apple />}
            onClick={() => handleSocialLogin('Apple')}
            sx={{
              borderColor: '#ddd',
              color: '#333',
              py: { xs: 1.2, sm: 1.5 },
              borderRadius: '25px',
              textTransform: 'none',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              '&:hover': { 
                borderColor: '#1976d2', 
                backgroundColor: '#f5f5f5' 
              },
            }}
          >
            Apple
          </Button>
        </Box>

        {/* Divider */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Divider sx={{ flex: 1 }} />
          <Typography sx={{ px: 2, color: '#666', fontSize: '0.875rem' }}>
            or continue with
          </Typography>
          <Divider sx={{ flex: 1 }} />
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
              sx={{ 
                mb: 3, 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: 2 
                } 
              }}
            />
          )}

          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            required
            sx={{ 
              mb: 3, 
              '& .MuiOutlinedInput-root': { 
                borderRadius: 2 
              } 
            }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={() => setShowPassword(!showPassword)} 
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ 
              mb: 3, 
              '& .MuiOutlinedInput-root': { 
                borderRadius: 2 
              } 
            }}
          />

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
                backgroundColor: '#1565c0' 
              },
            }}
          >
            {mode === 'signup' ? 'Signup' : 'Login'}
          </Button>

          {/* Links */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ color: '#666', fontSize: '0.875rem' }}>
              {mode === 'signup' ? (
                <>
                  Already have an account?{' '}
                  <Link 
                    href="/signin" 
                    sx={{ 
                      color: '#1976d2', 
                      fontWeight: 'bold',
                      textDecoration: 'none',
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
                    href="/signup" 
                    sx={{ 
                      color: '#1976d2', 
                      fontWeight: 'bold',
                      textDecoration: 'none',
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
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
