'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Fade,
  Chip,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
  CarBmw7Series,
  CarGmc,
  CarMercedesS450,
  CarFordTaurus,
  CarMercedesVClass,
  CarToyotaCoaster,
} from '@/assets/images';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const FleetSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');

  const fleet = [
    {
      name: 'Ford Taurus',
      price: '125 SAR',
      duration: 'Per hour',
      image: CarFordTaurus,
      features: ['Luxury Interior', 'GPS Navigation', 'Wi-Fi']
    },
    {
      name: 'GMC Yukon',
      price: '150 SAR',
      duration: 'Per hour',
      image: CarGmc,
      features: ['Spacious', 'Premium Sound', 'Climate Control']
    },
    {
      name: 'BMW 5 Series',
      price: '150 SAR',
      duration: 'Per day',
      image: CarBmw7Series,
      features: ['Executive Class', 'Leather Seats', 'Advanced Safety']
    },
    {
      name: 'Mercedes S-Class',
      price: '400 SAR',
      duration: 'Per day',
      image: CarMercedesS450,
      features: ['Ultimate Luxury', 'Chauffeur Service', 'Premium Amenities']
    },
    {
      name: 'Mercedes V-Class',
      price: '200 SAR',
      duration: 'Per day',
      image: CarMercedesVClass,
      features: ['Executive Comfort', 'Advanced Tech', 'Quiet Ride']
    },
    {
      name: 'Toyota Coaster',
      price: '180 SAR',
      duration: 'Per day',
      image: CarToyotaCoaster,
      features: ['Off-Road Capable', 'Luxury SUV', 'All-Weather']
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, fleet.length - 2));
    }, 6000);
    return () => clearInterval(interval);
  }, [fleet.length]);

  const nextFleet = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, fleet.length - 2));
  };

  const prevFleet = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, fleet.length - 2)) % Math.max(1, fleet.length - 2));
  };

  return (
    <Box sx={{ py: 10, backgroundColor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Fade in={visible} timeout={700}>
          <Box>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant={isMobile ? 'h4' : 'h3'}
                component="h2"
                sx={{
                  fontWeight: 'bold',
                  color: 'text.primary',
                  mb: 2,
                }}
              >
                Most Rented Cars
              </Typography>
            </Box>

            <Box sx={{ position: 'relative' }}>
              {/* Navigation Arrows */}
              <IconButton
                onClick={prevFleet}
                sx={{
                  position: 'absolute',
                  left: { xs: 8, md: -60 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'white',
                  boxShadow: 4,
                  '&:hover': {
                    backgroundColor: 'grey.100',
                    transform: 'translateY(-50%) scale(1.1)',
                  },
                  zIndex: 2,
                  display: 'flex',
                }}
              >
                <ChevronLeft />
              </IconButton>

              <IconButton
                onClick={nextFleet}
                sx={{
                  position: 'absolute',
                  right: { xs: 8, md: -60 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'white',
                  boxShadow: 4,
                  '&:hover': {
                    backgroundColor: 'grey.100',
                    transform: 'translateY(-50%) scale(1.1)',
                  },
                  zIndex: 2,
                  display: 'flex',
                }}
              >
                <ChevronRight />
              </IconButton>

              {/* Fleet Cards */}
              <Box sx={{ overflow: 'hidden' }}>
                <Box
                  sx={{
                    display: 'flex',
                    transition: 'transform 0.5s ease-in-out',
                    transform: isMobile 
                      ? `translateX(-${currentIndex * 100}%)` 
                      : `translateX(-${currentIndex * 33.333}%)`,
                  }}
                >
                  {fleet.map((car, index) => (
                    <Box 
                      key={index} 
                      sx={{ 
                        width: isMobile ? '100%' : '33.333%', 
                        px: { xs: 1, sm: 2 }, 
                        flexShrink: 0 
                      }}
                    >
                      <Card
                        sx={{
                          height: '100%',
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          '&:hover': {
                            transform: isMobile ? 'none' : 'scale(1.05)',
                            boxShadow: 8,
                          },
                        }}
                      >
                        <CardMedia
                          sx={{
                            height: { xs: 180, sm: 200 },
                            position: 'relative',
                            backgroundColor: 'grey.100',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Image
                            src={car.image.src || car.image}
                            alt={car.name}
                            width={isMobile ? 150 : 200}
                            height={isMobile ? 90 : 120}
                            style={{ objectFit: 'contain' }}
                          />
                          <Chip
                            label="Premium"
                            color="primary"
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 16,
                              right: 16,
                              backgroundColor: 'rgba(255,255,255,0.9)',
                            }}
                          />
                        </CardMedia>

                        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                          <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                              fontWeight: 'bold',
                              color: 'text.primary',
                              mb: 2,
                              fontSize: { xs: '1.1rem', sm: '1.25rem' },
                            }}
                          >
                            {car.name}
                          </Typography>

                          <Box sx={{ mb: 3 }}>
                            <Typography
                              variant="h5"
                              sx={{
                                color: 'primary.main',
                                fontWeight: 'bold',
                                display: 'inline',
                                fontSize: { xs: '1.1rem', sm: '1.5rem' },
                              }}
                            >
                              {car.price}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'text.secondary',
                                ml: 1,
                                display: 'inline',
                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                              }}
                            >
                              {car.duration}
                            </Typography>
                          </Box>

                          {/* Features */}
                          <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {car.features.map((feature, featureIndex) => (
                                <Chip
                                  key={featureIndex}
                                  label={feature}
                                  size="small"
                                  sx={{
                                    backgroundColor: 'primary.50',
                                    color: 'primary.main',
                                    fontSize: '0.75rem',
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>

                          {/* Book Now Button */}
                          <Button
                            component={Link}
                            href="/manage-booking"
                            variant="contained"
                            fullWidth
                            sx={{
                              borderRadius: 2,
                              py: 1.5,
                              fontWeight: 'bold',
                              textTransform: 'none',
                            }}
                          >
                            Book Now
                          </Button>
                        </CardContent>
                      </Card>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Dots Indicator */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1 }}>
                {Array.from({ length: Math.max(1, fleet.length - 2) }).map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: index === currentIndex ? 'primary.main' : 'grey.300',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': {
                        backgroundColor: index === currentIndex ? 'primary.dark' : 'grey.400',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Mobile Navigation Dots */}
            {isMobile && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1 }}>
                {Array.from({ length: Math.max(1, fleet.length - 2) }).map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: currentIndex === index ? 'primary.main' : 'grey.300',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                      '&:hover': {
                        backgroundColor: currentIndex === index ? 'primary.dark' : 'grey.400',
                      },
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default FleetSection;