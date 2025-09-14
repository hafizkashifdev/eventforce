'use client';

import React, { useState, memo, useMemo, useCallback } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import Image from 'next/image';
import {
  CarBmw7Series,
  CarChinesbus49Sea,
  CarFordTaurus,
  CarGmc,
  CarHiace,
  CarMercedesS450,
  CarMercedesVClass,
  CarToyotaCoaster,
} from '@/assets/images';
import { ScaleInView, SlideSidewayInView, SlideUpInView } from '@/components/animations';

interface Car {
  name: string;
  price: string;
  duration: string;
  image: any;
  class: string;
  year: string;
  branch: string;
}

const FleetPage = memo(() => {
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const fleet: Car[] = [
    {
      name: 'Ford Taurus',
      price: '125 SAR',
      duration: 'Per hour',
      image: CarFordTaurus,
      class: 'Economy',
      year: '2023',
      branch: 'Riyadh'
    },
    {
      name: 'GMC Yukon',
      price: '150 SAR',
      duration: 'Per hour',
      image: CarGmc,
      class: 'SUV',
      year: '2023',
      branch: 'Jeddah'
    },
    {
      name: 'BMW 5 Series',
      price: '150 SAR',
      duration: 'Per day',
      image: CarBmw7Series,
      class: 'Luxury',
      year: '2024',
      branch: 'Riyadh'
    },
    {
      name: 'Mercedes S450',
      price: '400 SAR',
      duration: 'Per day',
      image: CarMercedesS450,
      class: 'Luxury',
      year: '2024',
      branch: 'Jeddah'
    },
    {
      name: 'BMW 7 Series',
      price: '400 SAR',
      duration: 'Per day',
      image: CarBmw7Series,
      class: 'Luxury',
      year: '2024',
      branch: 'Riyadh'
    },
    {
      name: 'Mercedes V Class',
      price: '100 SAR',
      duration: 'Per day',
      image: CarMercedesVClass,
      class: 'Van',
      year: '2023',
      branch: 'Jeddah'
    },
    {
      name: 'Toyota Hiace',
      price: '1000 SAR',
      duration: '12 hours',
      image: CarHiace,
      class: 'Van',
      year: '2023',
      branch: 'Riyadh'
    },
    {
      name: 'Toyota Coaster',
      price: '1500 SAR',
      duration: '12 hours',
      image: CarToyotaCoaster,
      class: 'Bus',
      year: '2023',
      branch: 'Jeddah'
    },
    {
      name: 'Chines Bus 49 Sea',
      price: '2000 SAR',
      duration: '12 hours',
      image: CarChinesbus49Sea,
      class: 'Bus',
      year: '2023',
      branch: 'Riyadh'
    },
  ];

  const filteredFleet = useMemo(() => {
    return fleet.filter(car => {
      const branchMatch = selectedBranch === 'all' || car.branch === selectedBranch;
      const classMatch = selectedClass === 'all' || car.class === selectedClass;
      const yearMatch = selectedYear === 'all' || car.year === selectedYear;
      return branchMatch && classMatch && yearMatch;
    });
  }, [fleet, selectedBranch, selectedClass, selectedYear]);

  const handleBookCar = useCallback((index: number) => {
    const car = filteredFleet[index]
    if (car) {
      // Create URL parameters for the selected car
      const params = new URLSearchParams({
        car: car.name.toLowerCase().replace(/\s+/g, '-'),
        price: car.price,
        duration: car.duration
      })
      
      // Redirect to manage booking page with car data
      window.location.href = `/manage-booking?${params.toString()}`
    }
  }, [filteredFleet]);

  return (
    <Box sx={{ py: 8, backgroundColor: 'white' }}>
      <Container maxWidth="lg">
       

        {/* Filters */}
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth>
                <InputLabel>Branch</InputLabel>
                <Select
                  value={selectedBranch}
                  label="Branch"
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                >
                  <MenuItem value="all">Select Branch</MenuItem>
                  <MenuItem value="Riyadh">Riyadh</MenuItem>
                  <MenuItem value="Jeddah">Jeddah</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth>
                <InputLabel>Fleet Class</InputLabel>
                <Select
                  value={selectedClass}
                  label="Fleet Class"
                  onChange={(e) => setSelectedClass(e.target.value)}
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="Economy">Economy</MenuItem>
                  <MenuItem value="SUV">SUV</MenuItem>
                  <MenuItem value="Luxury">Luxury</MenuItem>
                  <MenuItem value="Van">Van</MenuItem>
                  <MenuItem value="Bus">Bus</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth>
                <InputLabel>Model Year</InputLabel>
                <Select
                  value={selectedYear}
                  label="Model Year"
                  onChange={(e) => setSelectedYear(e.target.value)}
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                >
                  <MenuItem value="all">Select Year</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2023">2023</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Fleet Grid */}
        <Grid container spacing={3}>
          {filteredFleet.map((car, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <ScaleInView initialScale={0.8} duration={0.6} delay={index * 0.1}>
                <Card
                sx={{
                  height: '100%',
                  borderRadius: '8px',
                  backgroundColor: '#F8F8F8',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Vehicle Title - Top Left */}
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 'bold',
                      color: '#52A4C1',
                      mb: 2,
                      fontSize: '1.1rem',
                      textAlign: 'left',
                    }}
                  >
                    {car.name}
                  </Typography>

                  {/* Car Image - Centered */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      backgroundColor: 'white',
                      borderRadius: '4px',
                      p: 1,
                    }}
                  >
                    <Image
                      src={car.image.src || car.image}
                      alt={car.name}
                      width={200}
                      height={120}
                      style={{ objectFit: 'contain' }}
                    />
                  </Box>

                  {/* Rent Info - Left Aligned */}
                  <Box sx={{ mb: 2, textAlign: 'left' }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#333',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                      }}
                    >
                      Rent: {car.price} / {car.duration}
                    </Typography>
                  </Box>

                  {/* Book Now Button - Centered */}
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleBookCar(index)}
                    sx={{
                      backgroundColor: '#52A4C1',
                      color: 'white',
                      py: 1.2,
                      fontWeight: 'bold',
                      textTransform: 'none',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      '&:hover': {
                        backgroundColor: '#4a94b1',
                      },
                    }}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
              </ScaleInView>
            </Grid>
          ))}
        </Grid>

        {filteredFleet.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No vehicles found matching your criteria.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
});

FleetPage.displayName = 'FleetPage';

export default FleetPage;
