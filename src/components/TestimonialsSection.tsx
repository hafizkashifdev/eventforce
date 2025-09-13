'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  useMediaQuery,
  Fade,
} from '@mui/material';
import Image from 'next/image';
import { 
  ClientAliAhmad, 
  ClientHassanRaza, 
  ClientMariamKhan
} from '@/assets/images';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');

  const testimonials = [
    {
      name: 'Ali Ahmed',
      quote: 'EventForce made my wedding day extra special! The luxury car we rented was in perfect condition and turned so many heads. The booking process was smooth, and their customer service was outstanding.',
      image: ClientAliAhmad,
      borderColor: '#52A4C1',
      quoteColor: '#52A4C1'
    },
    {
      name: 'Hassan Raza',
      quote: 'I needed a premium car for a corporate event, and EventForce exceeded my expectations. The vehicle was spotless, delivered on time, and the entire experience was hassle-free. Highly recommended!',
      image: ClientHassanRaza,
      borderColor: '#F7941D',
      quoteColor: '#F7941D'
    },
    {
      name: 'Mariam Khan',
      quote: 'EventForce is my go-to for car rentals. Their fleet is top-notch, and I love how easy it is to book online. I felt like a VIP the whole time!',
      image: ClientMariamKhan,
      borderColor: '#52A4C1',
      quoteColor: '#52A4C1'
    },
    {
      name: 'Sarah Johnson',
      quote: 'The team at EventForce went above and beyond for our company retreat. Professional drivers, immaculate vehicles, and excellent communication throughout. Will definitely use them again!',
      image: ClientAliAhmad, // Reusing existing image for now
      borderColor: '#67B6B2',
      quoteColor: '#67B6B2'
    },
    {
      name: 'Ahmed Al-Rashid',
      quote: 'Outstanding service from start to finish. The luxury SUV was perfect for our family event, and the driver was courteous and punctual. EventForce truly delivers excellence!',
      image: ClientHassanRaza, // Reusing existing image for now
      borderColor: '#F7941D',
      quoteColor: '#F7941D'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (testimonials.length - 2));
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);


  return (
    <Box sx={{ py: 10, backgroundColor: '#FFFFFF' }}>
      <Container maxWidth="lg">
        <Fade in={visible} timeout={700}>
          <Box>
            {/* Header */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              mb: 6
            }}>
              <Typography
                variant={isMobile ? 'h4' : 'h3'}
                component="h2"
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 'bold',
                  fontSize: { xs: '24px', sm: '32px' },
                  color: '#333333',
                  textAlign: 'center',
                }}
              >
                What Our Clients Say About Us
              </Typography>
            </Box>

            {/* Dots Indicator */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6, gap: 1 }}>
              {testimonials.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: index === currentIndex ? '#52A4C1' : '#CCCCCC',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: index === currentIndex ? '#4A8FA8' : '#999999',
                    },
                  }}
                />
              ))}
            </Box>

            {/* Testimonials Grid */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
              gap: 4,
              alignItems: 'start'
            }}>
              {testimonials.slice(currentIndex, currentIndex + 3).map((testimonial, index) => (
                <Box
                  key={index}
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  textAlign: 'center',
                  }}
                >
                  {/* Avatar */}
                  <Box sx={{ mb: 2, zIndex: 2 }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        border: '4px solid white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        style={{
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Name */}
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      color: '#333333',
                      mb: 2,
                      zIndex: 2,
                    }}
                  >
                    {testimonial.name}
                  </Typography>

                  {/* Quote Container with Border */}
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      maxWidth: 350,
                      minHeight: 200,
                      backgroundColor: 'white',
                      borderRadius: '20px',
                      border: `3px solid ${testimonial.borderColor}`,
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: -15,
                        left: index === 0 ? 20 : index === 1 ? '50%' : 'calc(100% - 40px)',
                        transform: index === 1 ? 'translateX(-50%)' : 'none',
                        width: 0,
                        height: 0,
                        borderLeft: index === 0 ? `15px solid transparent` : index === 1 ? `15px solid transparent` : `15px solid ${testimonial.borderColor}`,
                        borderRight: index === 0 ? `15px solid ${testimonial.borderColor}` : index === 1 ? `15px solid transparent` : `15px solid transparent`,
                        borderBottom: `15px solid ${testimonial.borderColor}`,
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: -12,
                        left: index === 0 ? 20 : index === 1 ? '50%' : 'calc(100% - 40px)',
                        transform: index === 1 ? 'translateX(-50%)' : 'none',
                        width: 0,
                        height: 0,
                        borderLeft: index === 0 ? `12px solid transparent` : index === 1 ? `12px solid transparent` : `12px solid white`,
                        borderRight: index === 0 ? `12px solid white` : index === 1 ? `12px solid transparent` : `12px solid transparent`,
                        borderBottom: `12px solid white`,
                      }
                    }}
                  >
                    {/* Quote Icon */}
                    <Typography
                      sx={{
                        fontSize: '3rem',
                        lineHeight: '1',
                        fontWeight: 'bold',
                        color: testimonial.quoteColor,
                        mb: 1,
                      }}
                    >
                      “
                    </Typography>

                    {/* Quote Text */}
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '14px',
                        color: '#333333',
                        lineHeight: 1.4,
                        textAlign: 'center',
                      }}
                    >
                      {testimonial.quote}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;