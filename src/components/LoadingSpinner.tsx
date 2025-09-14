'use client';

import React from 'react';
import { Box, CircularProgress, Typography, SxProps, Theme } from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...', 
  size = 40,
  fullScreen = false 
}) => {
  const containerSx: SxProps<Theme> = fullScreen 
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 9999,
      }
    : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      };

  return (
    <Box sx={containerSx}>
      <CircularProgress 
        size={size} 
        sx={{ 
          color: '#52A4C1',
          mb: 2 
        }} 
      />
      <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{ textAlign: 'center' }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
