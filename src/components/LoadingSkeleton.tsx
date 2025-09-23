'use client';

import React from 'react';
import { Box, Skeleton, Card, CardContent, Grid } from '@mui/material';

interface LoadingSkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: number | string;
  height?: number | string;
  lines?: number;
  showAvatar?: boolean;
  animation?: 'pulse' | 'wave' | false;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'rectangular',
  width = '100%',
  height = 20,
  lines = 1,
  showAvatar = false,
  animation = 'wave',
}) => {
  return (
    <Box sx={{ width, height }}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant={variant}
          width={width}
          height={height}
          animation={animation}
          sx={{ mb: index < lines - 1 ? 1 : 0 }}
        />
      ))}
    </Box>
  );
};

// Fleet Card Skeleton
export const FleetCardSkeleton: React.FC = () => (
  <Card sx={{ height: 500, display: 'flex', flexDirection: 'column' }}>
    <Skeleton variant="rectangular" height={200} />
    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Skeleton variant="text" width="60%" height={30} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="40%" height={20} sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Skeleton variant="rounded" width={60} height={24} />
        <Skeleton variant="rounded" width={80} height={24} />
        <Skeleton variant="rounded" width={70} height={24} />
      </Box>
      <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 'auto' }} />
    </CardContent>
  </Card>
);

// Fleet Grid Skeleton
export const FleetGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <Grid container spacing={3}>
    {Array.from({ length: count }).map((_, index) => (
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
        <FleetCardSkeleton />
      </Grid>
    ))}
  </Grid>
);

// Hero Section Skeleton
export const HeroSkeleton: React.FC = () => (
  <Box
    sx={{
      height: { xs: '100vh', sm: '80vh', md: '70vh', lg: '60vh' },
      minHeight: { xs: '600px', sm: '700px', md: '800px', lg: '995px' },
      maxHeight: '995px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'grey.100',
    }}
  >
    <Box sx={{ textAlign: 'center', width: '100%', maxWidth: 800, px: 3 }}>
      <Skeleton variant="text" width="80%" height={80} sx={{ mb: 3, mx: 'auto' }} />
      <Skeleton variant="text" width="90%" height={40} sx={{ mb: 4, mx: 'auto' }} />
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Skeleton variant="rectangular" width={150} height={48} />
        <Skeleton variant="rectangular" width={150} height={48} />
      </Box>
    </Box>
  </Box>
);

// Page Content Skeleton
export const PageContentSkeleton: React.FC = () => (
  <Box sx={{ py: 8 }}>
    <Box sx={{ textAlign: 'center', mb: 6 }}>
      <Skeleton variant="text" width="50%" height={60} sx={{ mb: 2, mx: 'auto' }} />
      <Skeleton variant="text" width="70%" height={30} sx={{ mx: 'auto' }} />
    </Box>
    <Grid container spacing={4}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
          <Card>
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
              <Skeleton variant="text" width="80%" height={30} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="90%" height={20} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default LoadingSkeleton;

