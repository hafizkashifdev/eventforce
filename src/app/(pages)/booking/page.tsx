'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Paper,
  Divider
} from '@mui/material';
import { 
  CalendarToday, 
  LocationOn, 
  DirectionsCar,
  CloudUpload,
  Person,
  Email,
  Phone,
  AttachMoney
} from '@mui/icons-material';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutBg from '@/assets/images/about-bg.png';
import { ScaleInView, SlideUpInView } from '@/components/animations';
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

const BookingPage = () => {
  const searchParams = useSearchParams();
  
  // Car mapping for images and default data
  const carMapping: { [key: string]: { image: any; defaultPrice: number; defaultPeriod: string } } = {
    'ford-taurus': { image: CarFordTaurus, defaultPrice: 125, defaultPeriod: 'Per hour' },
    'gmc-yukon': { image: CarGmc, defaultPrice: 150, defaultPeriod: 'Per hour' },
    'bmw-5-series': { image: CarBmw7Series, defaultPrice: 150, defaultPeriod: 'Per day' },
    'mercedes-s450': { image: CarMercedesS450, defaultPrice: 400, defaultPeriod: 'Per day' },
    'bmw-7-series': { image: CarBmw7Series, defaultPrice: 400, defaultPeriod: 'Per day' },
    'mercedes-v-class': { image: CarMercedesVClass, defaultPrice: 100, defaultPeriod: 'Per day' },
    'toyota-hiace': { image: CarHiace, defaultPrice: 1000, defaultPeriod: '12 hours' },
    'toyota-coaster': { image: CarToyotaCoaster, defaultPrice: 1500, defaultPeriod: '12 hours' },
    'chines-bus-49-sea': { image: CarChinesbus49Sea, defaultPrice: 2000, defaultPeriod: '12 hours' },
  };
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+966',
    contactNumber: '',
    selectedCar: '',
    tripType: '',
    pickupDate: '',
    returnDate: '',
    photo: null as File | null
  });

  const [selectedCar, setSelectedCar] = useState({
    name: 'Ford Taurus',
    image: CarFordTaurus,
    price: 125,
    currency: 'SAR',
    period: 'Per hour'
  });

  // Handle URL parameters to pre-populate car details
  useEffect(() => {
    const carParam = searchParams.get('car');
    const priceParam = searchParams.get('price');
    const durationParam = searchParams.get('duration');

    if (carParam && carMapping[carParam]) {
      const carData = carMapping[carParam];
      const carName = carParam.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      setSelectedCar({
        name: carName,
        image: carData.image,
        price: priceParam ? parseInt(priceParam) : carData.defaultPrice,
        currency: 'SAR',
        period: durationParam || carData.defaultPeriod
      });
      
      setFormData(prev => ({
        ...prev,
        selectedCar: carParam
      }));
    }
  }, [searchParams]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file as File | null
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
    // Handle booking submission here
  };

  const handleCancel = () => {
    // Handle cancel action
    window.history.back();
  };

  return (
    <>
      <Header />
      <Box 
        sx={{ 
          pt: 8,
          minHeight: '70vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          // Fallback background
          backgroundImage: `url(${AboutBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Background Image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0
          }}
        >
          <Image
            src={AboutBg}
            alt="Booking Background"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
            priority
          />
        </Box>
        
        {/* Overlay for better text readability */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
            zIndex: 1
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <SlideUpInView initialY={60} duration={0.8}>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 4,
                  color: 'white',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                }}
              >
                Book Your Vehicle
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'rgba(255,255,255,0.9)', 
                  lineHeight: 1.6,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                  maxWidth: '800px', 
                  mx: 'auto' 
                }}
              >
                Complete your booking details to reserve your transportation service
              </Typography>
            </SlideUpInView>
          </Box>
        </Container>
      </Box>

      {/* Booking Form Section */}
      <Box sx={{ py: 8, backgroundColor: '#f5f5f0' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Left Side - Booking Form */}
            <Grid size={{ xs: 12, lg: 8 }}>
              <ScaleInView initialScale={0.9} duration={0.8}>
                <Paper sx={{ p: 4, backgroundColor: '#fafafa', borderRadius: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: '#333' }}>
                    Booking Details
                  </Typography>
                  
                  <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      {/* Full Name */}
                      <Grid size={{ xs: 12 }}>
                        <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium', color: '#333' }}>
                          Full Name *
                        </Typography>
                        <TextField
                          fullWidth
                          placeholder="Enter your full name here"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: 'white',
                              borderRadius: 2,
                            },
                          }}
                        />
                      </Grid>

                      {/* Email */}
                      <Grid size={{ xs: 12 }}>
                        <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium', color: '#333' }}>
                          Email Address *
                        </Typography>
                        <TextField
                          fullWidth
                          type="email"
                          placeholder="Enter your email address here"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: 'white',
                              borderRadius: 2,
                            },
                          }}
                        />
                      </Grid>

                      {/* Contact Number */}
                      <Grid size={{ xs: 12 }}>
                        <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium', color: '#333' }}>
                          Contact Number *
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <TextField
                            placeholder="+966"
                            value={formData.countryCode}
                            onChange={(e) => handleInputChange('countryCode', e.target.value)}
                            sx={{
                              minWidth: 120,
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                                borderRadius: 2,
                              },
                            }}
                          />
                          <TextField
                            fullWidth
                            placeholder="Enter your contact number here"
                            value={formData.contactNumber}
                            onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                                borderRadius: 2,
                              },
                            }}
                          />
                        </Box>
                      </Grid>

                      {/* Select Car */}
                      <Grid size={{ xs: 12 }}>
                        <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium', color: '#333' }}>
                          Select Car *
                        </Typography>
                        <FormControl fullWidth>
                          <Select
                            value={formData.selectedCar}
                            displayEmpty
                            onChange={(e) => {
                              const carKey = e.target.value;
                              const carData = carMapping[carKey];
                              if (carData) {
                                const carName = carKey.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                                setSelectedCar({
                                  name: carName,
                                  image: carData.image,
                                  price: carData.defaultPrice,
                                  currency: 'SAR',
                                  period: carData.defaultPeriod
                                });
                              }
                              handleInputChange('selectedCar', carKey);
                            }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                                borderRadius: 2,
                              },
                            }}
                          >
                            <MenuItem value="" disabled>
                              <em>Select a car</em>
                            </MenuItem>
                            {Object.keys(carMapping).map((carKey) => {
                              const carName = carKey.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                              return (
                                <MenuItem key={carKey} value={carKey}>
                                  {carName}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Trip Type */}
                      <Grid size={{ xs: 12 }}>
                        <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium', color: '#333' }}>
                          Trip Type *
                        </Typography>
                        <FormControl fullWidth>
                          <Select
                            value={formData.tripType}
                            displayEmpty
                            onChange={(e) => handleInputChange('tripType', e.target.value)}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'white',
                                borderRadius: 2,
                                '&.Mui-focused': {
                                  borderColor: '#52A4C1',
                                },
                              },
                            }}
                          >
                            <MenuItem value="" disabled>
                              <em>Select trip type</em>
                            </MenuItem>
                            <MenuItem value="one-way">One Way</MenuItem>
                            <MenuItem value="round-trip">Round Trip</MenuItem>
                            <MenuItem value="hourly">Hourly</MenuItem>
                            <MenuItem value="daily">Daily</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Upload Photo */}
                      <Grid size={{ xs: 12 }}>
                        <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium', color: '#333' }}>
                          Upload Photo
                        </Typography>
                        <Paper
                          variant="outlined"
                          sx={{
                            p: 4,
                            textAlign: 'center',
                            border: '2px dashed #ccc',
                            cursor: 'pointer',
                            backgroundColor: 'white',
                            borderRadius: 2,
                            '&:hover': {
                              borderColor: '#52A4C1',
                              backgroundColor: '#f8f9fa'
                            }
                          }}
                          onClick={() => document.getElementById('photo-upload')?.click()}
                        >
                          <CloudUpload sx={{ fontSize: '2.5rem', color: '#666', mb: 2 }} />
                          <Typography variant="h6" sx={{ color: '#666', fontWeight: 'bold' }}>
                            Click to upload photo
                          </Typography>
                          <input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileUpload}
                          />
                        </Paper>
                      </Grid>

                      {/* Pickup Date */}
                      <Grid size={{ xs: 12 }}>
                        <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium', color: '#333' }}>
                          Pickup Date *
                        </Typography>
                        <TextField
                          fullWidth
                          type="date"
                          placeholder="Select pickup date"
                          value={formData.pickupDate}
                          onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                          InputLabelProps={{ shrink: true }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <CalendarToday sx={{ color: '#666' }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: 'white',
                              borderRadius: 2,
                            },
                          }}
                        />
                      </Grid>

                      {/* Return Date */}
                      <Grid size={{ xs: 12 }}>
                        <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium', color: '#333' }}>
                          Return Date *
                        </Typography>
                        <TextField
                          fullWidth
                          type="date"
                          placeholder="Select return date"
                          value={formData.returnDate}
                          onChange={(e) => handleInputChange('returnDate', e.target.value)}
                          InputLabelProps={{ shrink: true }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <CalendarToday sx={{ color: '#666' }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: 'white',
                              borderRadius: 2,
                            },
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 4 }} />

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={handleCancel}
                        sx={{
                          px: 4,
                          py: 1.5,
                          borderColor: '#ccc',
                          color: '#666',
                          backgroundColor: '#f5f5f5',
                          borderRadius: 2,
                          '&:hover': {
                            borderColor: '#999',
                            backgroundColor: '#e0e0e0'
                          }
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{
                          px: 4,
                          py: 1.5,
                          backgroundColor: '#52A4C1',
                          borderRadius: 2,
                          '&:hover': {
                            backgroundColor: '#4A8FA8'
                          }
                        }}
                      >
                        Confirm
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </ScaleInView>
            </Grid>

            {/* Right Side - Car Details */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <ScaleInView initialScale={0.9} duration={0.8} delay={0.2}>
                <Card sx={{ 
                  p: 3, 
                  position: 'sticky', 
                  top: 100,
                  backgroundColor: 'white',
                  borderRadius: 3,
                  boxShadow: 2
                }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#333', textAlign: 'center' }}>
                    {selectedCar.name}
                  </Typography>
                  
                  <Box sx={{ mb: 3, textAlign: 'center' }}>
                    <Image
                      src={selectedCar.image.src || selectedCar.image}
                      alt={selectedCar.name}
                      width={300}
                      height={200}
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '12px',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 3, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
                      Rent: {selectedCar.price} {selectedCar.currency}/{selectedCar.period}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                      backgroundColor: '#52A4C1',
                      py: 1.5,
                      fontWeight: 'bold',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: '#4A8FA8'
                      }
                    }}
                  >
                    Book Now
                  </Button>
                </Card>
              </ScaleInView>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default BookingPage;
