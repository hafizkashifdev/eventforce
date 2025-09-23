'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  Card, 
  CardContent,
  Grid
} from '@mui/material';
import { 
  WifiOff, 
  Refresh, 
  Home,
  Support
} from '@mui/icons-material';
import Link from 'next/link';
import { ScaleInView, SlideUpInView } from '@/components/animations';

interface OfflineFallbackProps {
  onRetry?: () => void;
  showNavigation?: boolean;
}

const OfflineFallback: React.FC<OfflineFallbackProps> = ({ 
  onRetry, 
  showNavigation = true 
}) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleGoOnline = () => {
    if (navigator.onLine) {
      window.location.reload();
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        p: 2
      }}
    >
      <Container maxWidth="md">
        <Card sx={{ p: 4, textAlign: 'center', boxShadow: 3 }}>
          <CardContent>
            <ScaleInView initialScale={0.8} duration={0.8}>
              <Box sx={{ mb: 4 }}>
                <WifiOff 
                  sx={{ 
                    fontSize: '4rem', 
                    color: '#52A4C1',
                    mb: 2
                  }} 
                />
                <Typography 
                  variant="h3" 
                  component="h1"
                  sx={{ 
                    fontWeight: 'bold',
                    mb: 2,
                    color: '#333',
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                  }}
                >
                  You're Offline
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#666',
                    mb: 3,
                    fontSize: { xs: '1rem', sm: '1.2rem' }
                  }}
                >
                  It looks like you're not connected to the internet. 
                  Don't worry, you can still access some content that's been cached.
                </Typography>
              </Box>
            </ScaleInView>

            <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
              <Box sx={{ mb: 4 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#666',
                    mb: 3,
                    lineHeight: 1.6
                  }}
                >
                  Here's what you can do:
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                      <Refresh sx={{ color: '#52A4C1', mb: 1 }} />
                      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Check Connection
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#666' }}>
                        Make sure you're connected to WiFi or mobile data
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                      <Support sx={{ color: '#52A4C1', mb: 1 }} />
                      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Try Again
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#666' }}>
                        Retry loading the page when you're back online
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </SlideUpInView>

            <SlideUpInView initialY={40} duration={1.0} delay={0.4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Refresh />}
                  onClick={handleRetry}
                  sx={{
                    backgroundColor: '#52A4C1',
                    px: 4,
                    py: 1.5,
                    '&:hover': { 
                      backgroundColor: '#4A8FA8',
                      transform: 'scale(1.05)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Retry Connection
                </Button>

                {showNavigation && (
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Button
                      variant="outlined"
                      startIcon={<Home />}
                      component={Link}
                      href="/"
                      sx={{
                        borderColor: '#52A4C1',
                        color: '#52A4C1',
                        '&:hover': {
                          backgroundColor: '#52A4C1',
                          color: 'white',
                          borderColor: '#52A4C1'
                        }
                      }}
                    >
                      Go Home
                    </Button>
                    
                    <Button
                      variant="outlined"
                      startIcon={<Support />}
                      component={Link}
                      href="/support"
                      sx={{
                        borderColor: '#1976d2',
                        color: '#1976d2',
                        '&:hover': {
                          backgroundColor: '#1976d2',
                          color: 'white',
                          borderColor: '#1976d2'
                        }
                      }}
                    >
                      Support
                    </Button>
                  </Box>
                )}
              </Box>
            </SlideUpInView>

            <SlideUpInView initialY={40} duration={1.1} delay={0.6}>
              <Box sx={{ mt: 4, p: 3, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>
                  💡 <strong>Tip:</strong> Some pages you've visited before might still be available offline. 
                  Try navigating to previously visited pages using the menu above.
                </Typography>
              </Box>
            </SlideUpInView>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default OfflineFallback;
