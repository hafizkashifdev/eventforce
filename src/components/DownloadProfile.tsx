'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  useMediaQuery,
  Fade,
} from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';

const DownloadProfile = () => {
  const [visible, setVisible] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');

  React.useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    // Create a simple text file with company profile
    const profileContent = `Event Force - Premium Transportation & Event Logistics

Company Profile:
- Premium transportation services across Saudi Arabia
- Luxury VIP vehicles and event logistics
- Professional drivers and 24/7 support
- Real-time GPS tracking and in-car amenities

Contact Information:
Phone: +966 59 427 9012
Email: Reservations@eventforce.sa.com
Headquarters: White Space 2444 Taha Khasiyfan - Ash Shati Dist. Unit No 4707 Jeddah 23511
Branch: White Space, King Abdullah Dt., Riyadh 12211, Saudi Arabia

Services:
- Luxury Transportation
- Event Logistics
- Corporate Events
- Wedding Services
- VIP Chauffeur Service

Downloaded on: ${new Date().toLocaleDateString()}`;

    const blob = new Blob([profileContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Event-Force-Profile.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ 
      minHeight: { xs: 'auto', sm: 92 },
      height: { xs: 'auto', sm: 92 },
      backgroundColor: '#F5F5F5',
      display: 'flex',
      alignItems: 'center',
      px: 2,
      py: { xs: 2, sm: 0 }
    }}>
        <Fade in={visible} timeout={700}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'center', sm: 'center' },
              justifyContent: 'space-between',
              gap: { xs: 2, sm: 0 },
              height: '100%',
              minHeight: { xs: 'auto', sm: 92 },
              width: '100%',
            }}
          >
            <Typography
              variant="body1"
              component="h3"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: { xs: '16px', sm: '18px' },
                color: '#333333',
                lineHeight: 'Auto',
                letterSpacing: '0px',
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              Visit Event Force Profile
            </Typography>
            <Button
              onClick={handleDownload}
              variant="contained"
              endIcon={<DownloadIcon sx={{ fontSize: { xs: '18px', sm: '20px' } }} />}
              sx={{
                backgroundColor: '#52A4C1',
                borderRadius: '8px',
                width: { xs: '100%', sm: 212 },
                height: 48,
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: { xs: '12px', sm: '14px' },
                color: '#FFFFFF',
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                '&:hover': {
                  backgroundColor: '#4A8FA8',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.3s',
              }}
            >
              Download
            </Button>
          </Box>
        </Fade>
      </Box>
  );
};

export default DownloadProfile;