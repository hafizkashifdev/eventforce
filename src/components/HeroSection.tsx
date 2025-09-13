'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Typography,
  Button,
  Container,
  Fab,
  alpha,
  keyframes,
} from '@mui/material';
import { WhatsApp as WhatsAppIcon, ArrowUpward as ArrowUpwardIcon } from '@mui/icons-material';
import { HeroImages } from '@/assets/images';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        heroRef.current.style.transform = `translateY(${parallax}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bounce = keyframes`
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  `;

  const pulse = keyframes`
    0% {
      opacity: 0.1;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 0.1;
    }
  `;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '100vh', sm: '80vh', md: '70vh', lg: '60vh' },
        minHeight: { xs: '600px', sm: '700px', md: '800px', lg: '995px' },
        maxHeight: '995px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <Box
        ref={heroRef}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
        {/* Hero Image Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            '& img': {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
            },
          }}
        >
          <Image
            src={HeroImages.src || HeroImages}
            alt="Event Force Hero Background"
            fill
            priority
            style={{ 
              objectFit: 'cover',
              objectPosition: 'center center'
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
        </Box>

        {/* Animated City Skyline */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 200,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            opacity: 0.6,
          }}
        >
          {/* Building silhouettes */}
          {[...Array(20)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                bottom: 0,
                left: `${i * 5}%`,
                width: `${(i * 0.5) % 3 + 2}%`,
                height: `${(i * 50) % 200 + 100}px`,
                backgroundColor: 'rgba(0,0,0,0.8)',
                animation: `${pulse} 3s infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </Box>

        {/* Floating Vehicles */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 80,
            left: 40,
            width: 128,
            height: 64,
            backgroundColor: 'rgba(0,0,0,0.6)',
            borderRadius: 2,
            animation: `${pulse} 2s infinite`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 64,
            right: 80,
            width: 160,
            height: 80,
            backgroundColor: 'rgba(0,0,0,0.6)',
            borderRadius: 2,
            animation: `${pulse} 2s infinite`,
            animationDelay: '1s',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 96,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 144,
            height: 72,
            backgroundColor: 'rgba(0,0,0,0.6)',
            borderRadius: 2,
            animation: `${pulse} 2s infinite`,
            animationDelay: '2s',
          }}
        />

        {/* Glowing Effects */}
        <Box
          sx={{
            position: 'absolute',
            top: '25%',
            left: '25%',
            width: 256,
            height: 256,
            backgroundColor: alpha('#1976d2', 0.1),
            borderRadius: '50%',
            animation: `${pulse} 4s infinite`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '33%',
            right: '25%',
            width: 192,
            height: 192,
            backgroundColor: alpha('#42a5f5', 0.1),
            borderRadius: '50%',
            animation: `${pulse} 4s infinite`,
            animationDelay: '1s',
          }}
        />
      </Box>

       {/* Content */}
       <Container 
         maxWidth="lg" 
         sx={{ 
           position: 'relative', 
           zIndex: 2,
           height: '100%',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
         }}
       >
         <Box
           sx={{
             textAlign: 'center',
             color: 'white',
             py: { xs: 4, sm: 6, },
             px: { xs: 2, sm: 3, md: 4 },
             width: '100%',
           }}
         >
           {/* Main Title */}
           <Typography
             variant={isMobile ? 'h3' : 'h1'}
             component="h1"
             sx={{
               fontFamily: 'Montserrat, sans-serif',
               fontWeight: 600,
               mb: { xs: 3, sm: 4, md: 4 },
               lineHeight: 1.2,
               fontSize: { 
                 xs: '2.5rem', 
                 sm: '3rem', 
                 md: '4rem', 
                 lg: '5rem',
                 xl: '60px'
               },
               '& .gradient-text': {
                 background: 'linear-gradient(45deg, #64b5f6, #1976d2)',
                 backgroundClip: 'text',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
               },
             }}
           >
             <Box component="span" display="block">
               Premium Transportation
             </Box>
             <Box component="span" display="block" sx={{ color: 'white' }}>
               & Event Logistics
             </Box>
           </Typography>

           {/* Subtitle */}
           <Typography
             variant={isMobile ? 'h6' : 'h5'}
             sx={{
               fontFamily: 'Poppins, sans-serif',
               fontWeight: 300,
               mb: { xs: 4, sm: 5, md: 6 },
               maxWidth: { xs: '100%', sm: '90%', md: '800px' },
               mx: 'auto',
               opacity: 0.9,
               lineHeight: '25px',
               fontSize: '20px',
               letterSpacing: '0.5px',
             }}
           >
             From luxury VIP vehicles to large-scale event logistics, we provide seamless, 
             reliable, and premium transportation solutions that elevate every occasion.
           </Typography>

           {/* CTA Buttons */}
           <Box
             sx={{
               display: 'flex',
               flexDirection: { xs: 'column', sm: 'row' },
               gap: { xs: 2, sm: 3, md: 3 },
               justifyContent: 'center',
               alignItems: 'center',
               pt: { xs: 2, sm: 3, md: 4 },
             }}
           >
             <Button
               component={Link}
               href="/our-fleet"
               variant="contained"
               sx={{
                 backgroundColor: '#52A4C1',
                 borderRadius: '8px',
                 px: 3,
                 py: 1.25,
                 fontSize: '1rem',
                 fontWeight: 'bold',
                 textTransform: 'none',
                 width: '193px',
                 height: '48px',
                 '&:hover': {
                   backgroundColor: '#4A8FA8',
                   transform: 'scale(1.05)',
                 },
                 transition: 'all 0.3s',
               }}
             >
               Browse Fleet
             </Button>
             <Button
               component={Link}
               href="/about-us"
               variant="outlined"
               sx={{
                 borderRadius: '8px',
                 px: 3,
                 py: 1.25,
                 fontSize: '1rem',
                 fontWeight: 'bold',
                 textTransform: 'none',
                 borderColor: 'white',
                 color: 'white',
                 width: '193px',
                 height: '48px',
                 borderWidth: '1px',
                 display: 'flex',
                 alignItems: 'center',
                 gap: 1,
                 '&:hover': {
                   backgroundColor: 'white',
                   color: '#52A4C1',
                   transform: 'scale(1.05)',
                 },
                 transition: 'all 0.3s',
               }}
             >
               Learn More
               <ArrowUpwardIcon sx={{ fontSize: '16px', transform: 'rotate(45deg)' }} />
             </Button>
           </Box>
        </Box>
      </Container>

      {/* Floating WhatsApp Button */}
      <Fab
        color="success"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          '&:hover': {
            transform: 'scale(1.1)',
          },
          transition: 'transform 0.3s',
        }}
      >
        <WhatsAppIcon />
      </Fab>

       {/* Scroll Indicator */}
       <Box
         sx={{
           position: 'absolute',
           bottom: { xs: 16, sm: 24, md: 32 },
           left: '50%',
           transform: 'translateX(-50%)',
           zIndex: 2,
           animation: `${bounce} 2s infinite`,
           display: { xs: 'none', sm: 'block' },
         }}
       >
         <Box
           sx={{
             width: { xs: 20, sm: 24, md: 24 },
             height: { xs: 32, sm: 40, md: 40 },
             border: '2px solid white',
             borderRadius: '12px',
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'flex-start',
             pt: 1,
           }}
         >
           <Box
             sx={{
               width: 4,
               height: 12,
               backgroundColor: 'white',
               borderRadius: '2px',
               animation: `${pulse} 1.5s infinite`,
             }}
           />
         </Box>
       </Box>
    </Box>
  );
};

export default HeroSection;
