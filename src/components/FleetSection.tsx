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
import { ScaleInView, SlideSidewayInView, SlideUpInView } from '@/components/animations';

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
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, fleet.length - 3));
    }, 5000);
    return () => clearInterval(interval);
  }, [fleet.length]);

  const nextFleet = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, fleet.length - 3));
  };

  const prevFleet = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, fleet.length - 3)) % Math.max(1, fleet.length - 3));
  };


  return (
    <Box sx={{ py: 10, px: { lg: 12, md: 6, xs: 2 }, backgroundColor: 'grey.50' }}>
   
        <Fade in={visible} timeout={700}>
          <Box>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <SlideUpInView initialY={60} duration={0.8}>
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
                  Most Rented Cars
                </Typography>
              </SlideUpInView>
            </Box>

            <Box sx={{ position: 'relative' }}>
              {/* Navigation Arrows */}
              <IconButton
                onClick={prevFleet}
                sx={{
                  position: 'absolute',
                  left: -60,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'white',
                  boxShadow: 4,
                  '&:hover': {
                    backgroundColor: 'grey.100',
                    transform: 'translateY(-50%) scale(1.1)',
                  },
                  zIndex: 2,
                  display: { xs: 'none', lg: 'flex' },
                }}
              >
                <ChevronLeft />
              </IconButton>

              <IconButton
                onClick={nextFleet}
                sx={{
                  position: 'absolute',
                  right: -60,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'white',
                  boxShadow: 4,
                  '&:hover': {
                    backgroundColor: 'grey.100',
                    transform: 'translateY(-50%) scale(1.1)',
                  },
                  zIndex: 2,
                  display: { xs: 'none', lg: 'flex' },
                }}
              >
                <ChevronRight />
              </IconButton>

              {/* Fleet Cards Carousel */}
              <Box sx={{ overflow: 'hidden', pb: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    transition: 'transform 0.5s ease-in-out',
                    transform: isMobile 
                      ? `translateX(-${currentIndex * 100}%)` 
                      : `translateX(-${currentIndex * 25}%)`, // 25% for 4 cards on lg
                  }}
                >
                  {fleet.map((car, index) => (
                    <Box 
                      key={index} 
                      sx={{ 
                        width: { xs: '100%', sm: '50%', md: '33.333%', lg: '25%' },
                        px: { xs: 1, sm: 2 }, 
                        py: 2,
                        flexShrink: 0,
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <Card
                        sx={{
                          height: { xs: 400, sm: 450, md: 500 },
                          display: 'flex',
                          flexDirection: 'column',
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

                        <CardContent sx={{ 
                          p: { xs: 2, sm: 3 },
                          display: 'flex',
                          flexDirection: 'column',
                          flex: 1,
                          justifyContent: 'space-between'
                        }}>
                          <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                              fontFamily: 'Poppins, sans-serif',
                              fontWeight: 'bold',
                              color: '#52A4C1',
                              mb: 2,
                              fontSize: { xs: '1.1rem', sm: '1.25rem' },
                            }}
                          >
                            {car.name}
                          </Typography>

                          <Box sx={{ mb: 3 }}>
                            <Typography
                              variant="body1"
                              sx={{
                                fontFamily: 'Poppins, sans-serif',
                                color: '#525252',
                                fontWeight: 400,
                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                lineHeight: 1.4,
                              }}
                            >
                              Rent: {car.price} / {car.duration}
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
                              backgroundColor: '#52A4C1',
                              borderRadius: 2,
                              py: 1.5,
                              fontWeight: 'bold',
                              textTransform: 'none',
                              '&:hover': {
                                backgroundColor: '#4A8FA8',
                              },
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
                {Array.from({ length: Math.max(1, fleet.length - 3) }).map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: index === currentIndex ? '#52A4C1' : 'grey.300',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': {
                        backgroundColor: index === currentIndex ? '#4A8FA8' : 'grey.400',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Fade>
    </Box>
  );
};

export default FleetSection;