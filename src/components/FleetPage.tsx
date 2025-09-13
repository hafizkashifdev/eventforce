'use client';

import React, { useState } from 'react';
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

const FleetPage = () => {
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const fleet = [
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

  const filteredFleet = fleet.filter(car => {
    const branchMatch = selectedBranch === 'all' || car.branch === selectedBranch;
    const classMatch = selectedClass === 'all' || car.class === selectedClass;
    const yearMatch = selectedYear === 'all' || car.year === selectedYear;
    return branchMatch && classMatch && yearMatch;
  });

  return (
    <Box sx={{ py: 10, backgroundColor: 'grey.50' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              mb: 2,
            }}
          >
            Our Fleet
          </Typography>
          <Box
            sx={{
              width: 60,
              height: 4,
              backgroundColor: 'primary.main',
              mx: 'auto',
              mb: 4,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Browse rental car fleet in Saudi Arabia, featuring modern, reliable vehicles for every need. 
            Choose from Economy, SUVs, luxury cars, and Buses available for daily or monthly rental in Riyadh & Jeddah
          </Typography>
        </Box>

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
                >
                  <MenuItem value="all">All Branches</MenuItem>
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
                >
                  <MenuItem value="all">All Classes</MenuItem>
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
                >
                  <MenuItem value="all">All Years</MenuItem>
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
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 8,
                  },
                }}
              >
                <CardMedia
                  sx={{
                    height: 200,
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
                    width={200}
                    height={120}
                    style={{ objectFit: 'contain' }}
                  />
                  <Chip
                    label={car.class}
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

                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 'bold',
                      color: 'text.primary',
                      mb: 2,
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
                      }}
                    >
                      Rent: {car.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        ml: 1,
                        display: 'inline',
                      }}
                    >
                      / {car.duration}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      py: 1.5,
                      fontWeight: 'bold',
                      textTransform: 'none',
                    }}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
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
};

export default FleetPage;
