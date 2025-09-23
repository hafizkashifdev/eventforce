'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip,
  Button,
  Grid
} from '@mui/material';
import { 
  Wifi, 
  WifiOff, 
  Cached, 
  CheckCircle,
  Error
} from '@mui/icons-material';

const PWATest: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [swStatus, setSwStatus] = useState<'loading' | 'registered' | 'error' | 'not-supported'>('loading');
  const [cacheStatus, setCacheStatus] = useState<'unknown' | 'available' | 'not-available'>('unknown');

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return;

    // Check online status
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();

    // Check service worker status
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        setSwStatus('registered');
        
        // Check cache status
        caches.open('event-force-v2.0-static').then((cache) => {
          cache.keys().then((keys) => {
            setCacheStatus(keys.length > 0 ? 'available' : 'not-available');
          });
        });
      }).catch(() => {
        setSwStatus('error');
      });
    } else {
      setSwStatus('not-supported');
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const testOfflineSupport = async () => {
    if (typeof window === 'undefined') return;
    
    try {
      // Simulate offline by disabling network
      const response = await fetch('/support', { 
        method: 'HEAD',
        cache: 'force-cache'
      });
      
      if (response.ok) {
        alert('✅ Offline support working! Support page is cached.');
      } else {
        alert('❌ Offline support not working properly.');
      }
    } catch (error) {
      alert('❌ Error testing offline support: ' + error);
    }
  };

  const clearCache = async () => {
    if (typeof window === 'undefined') return;
    
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      setCacheStatus('not-available');
      alert('✅ Cache cleared successfully!');
    } catch (error) {
      alert('❌ Error clearing cache: ' + error);
    }
  };

  return (
    <Card sx={{ p: 3, mb: 4 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
          PWA Status Test
        </Typography>
        
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              {isOnline ? <Wifi color="success" /> : <WifiOff color="error" />}
              <Typography variant="body2">
                Connection: {isOnline ? 'Online' : 'Offline'}
              </Typography>
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              {swStatus === 'registered' && <CheckCircle color="success" />}
              {swStatus === 'error' && <Error color="error" />}
              <Typography variant="body2">
                Service Worker: {swStatus}
              </Typography>
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Cached color={cacheStatus === 'available' ? 'success' : 'warning'} />
              <Typography variant="body2">
                Cache: {cacheStatus}
              </Typography>
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <Chip 
              label={isOnline ? 'Online Mode' : 'Offline Mode'} 
              color={isOnline ? 'success' : 'warning'}
              size="small"
            />
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button 
            variant="outlined" 
            size="small"
            onClick={testOfflineSupport}
            disabled={!isOnline}
          >
            Test Offline Support
          </Button>
          
          <Button 
            variant="outlined" 
            size="small"
            onClick={clearCache}
            color="warning"
          >
            Clear Cache
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PWATest;
