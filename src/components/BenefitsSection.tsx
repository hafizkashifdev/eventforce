'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
  Fade,
  Grow,
} from '@mui/material';
import {
  OnTimeGuaranteeIcon,
  LuxuryFleetIcon,
  RealTimeGPSTrackingIcon,
  InCarWiFiIcon,
  CleanComfyIcon,
  CustomerSupportIcon,
  EasyOnlineBookingIcon,
  TrainedDriversIcon,
} from './icons';
import { ScaleInView, SlideSidewayInView, SlideUpInView } from '@/components/animations';

const BenefitsSection = () => {
  const [visible, setVisible] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');

  const benefits = [
    {
      icon: <OnTimeGuaranteeIcon />,
      title: 'On-Time Guarantee',
      backgroundColor: '#FEF3E6'
    },
    {
      icon: <LuxuryFleetIcon />,
      title: 'Luxury Fleet',
      backgroundColor: '#EEF7F7'
    },
    {
      icon: <RealTimeGPSTrackingIcon />,
      title: 'Real-Time GPS Tracking',
      backgroundColor: '#FEF3E6'
    },
    {
      icon: <InCarWiFiIcon />,
      title: 'In-Car Wi-Fi',
      backgroundColor: '#EEF7F7'
    },
    {
      icon: <CleanComfyIcon />,
      title: 'Clean & Comfy',
      backgroundColor: '#FEF3E6'
    },
    {
      icon: <CustomerSupportIcon />,
      title: '24/7 Customer Support',
      backgroundColor: '#EEF7F7'
    },
    {
      icon: <EasyOnlineBookingIcon />,
      title: 'Easy Online Booking',
      backgroundColor: '#FEF3E6'
    },
    {
      icon: <TrainedDriversIcon />,
      title: 'Trained Drivers',
      backgroundColor: '#EEF7F7'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ my:4, px:2,backgroundColor: '#FFFFFF' }}>
      {/* <Container> */}
        <SlideUpInView initialY={60} duration={0.8}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              component="h2"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 'bold',
                fontSize: '36px',
                color: '#525252',
                mb: 2,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '4px',
                  backgroundColor: '#52A4C1',
                  borderRadius: '2px',
                },
              }}
            >
              Benefits
            </Typography>
          </Box>
        </SlideUpInView>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
          {benefits.map((benefit, index) => (
            <ScaleInView key={index} initialScale={0.8} duration={0.6} delay={index * 0.1}>
              <Box>
                <Grow
                  in={visible}
                  timeout={700 + index * 100}
                  style={{ transformOrigin: '0 0 0' }}
                >
                  <Card
                    sx={{
                      width: '100%',
                      height: 120,
                      textAlign: 'center',
                      backgroundColor: benefit.backgroundColor,
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 2,
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: 8,
                      },
                    }}
                  >
                  <CardContent sx={{ p: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        mt: 2,
                      }}
                    >
                      {benefit.icon}
                    </Box>
                    <Typography
                      variant="subtitle1"
                      component="h3"
                      sx={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 400,
                        color: '#000000',
                        fontSize: '14px',
                        textAlign: 'center',
                        lineHeight: 1.2,
                      }}
                    >
                      {benefit.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
              </Box>
            </ScaleInView>
          ))}
        </Box>
      {/* </Container> */}
    </Box>
  );
};

export default BenefitsSection;