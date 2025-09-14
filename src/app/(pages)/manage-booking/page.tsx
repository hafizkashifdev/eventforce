'use client';

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton
} from '@mui/material'
import { CloudUpload, CalendarToday } from '@mui/icons-material'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  CarFordTaurus,
  CarBmw7Series,
  CarMercedesS450,
  CarGmc,
  CarHiace,
  CarMercedesVClass,
  CarToyotaCoaster,
  CarChinesbus49Sea
} from '@/assets/images'
import AboutBg from '@/assets/images/about-bg.png'
import { ScaleInView, SlideSidewayInView, SlideUpInView } from '@/components/animations'

const ManageBookingPage = () => {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+966',
    contactNumber: '',
    selectedCar: '',
    tripType: '',
    pickupDate: '',
    returnDate: ''
  })

  const [selectedCarDetails, setSelectedCarDetails] = useState({
    name: 'Ford Taurus',
    price: '125 SAR',
    duration: 'Per hour',
    image: CarFordTaurus
  })

  const availableCars = [
    { value: 'ford-taurus', name: 'Ford Taurus', price: '125 SAR', duration: 'Per hour', image: CarFordTaurus },
    { value: 'gmc-yukon', name: 'GMC', price: '150 SAR', duration: 'Per hour', image: CarGmc },
    { value: 'bmw-5-series', name: 'BMW 5 Series', price: '150 SAR', duration: 'Per day', image: CarBmw7Series },
    { value: 'mercedes-s450', name: 'Mercedes S450', price: '400 SAR', duration: 'Per day', image: CarMercedesS450 },
    { value: 'bmw-7-series', name: 'BMW 7 Series', price: '400 SAR', duration: 'Per day', image: CarBmw7Series },
    { value: 'mercedes-v-class', name: 'Mercedes V Class', price: '100 SAR', duration: 'Per day', image: CarMercedesVClass },
    { value: 'hiace', name: 'Hiace', price: '1000 SAR', duration: '12 hours', image: CarHiace },
    { value: 'toyota-coaster', name: 'Toyota Coaster', price: '1500 SAR', duration: '12 hours', image: CarToyotaCoaster },
    { value: 'chines-bus-49-sea', name: 'Chines Bus 49 Sea', price: '2000 SAR', duration: '12 hours', image: CarChinesbus49Sea }
  ]

  // Handle URL parameters for car selection
  useEffect(() => {
    const carName = searchParams.get('car')
    const carPrice = searchParams.get('price')
    const carDuration = searchParams.get('duration')
    
    if (carName) {
      const car = availableCars.find(c => c.name.toLowerCase().replace(/\s+/g, '-') === carName.toLowerCase())
      if (car) {
        setSelectedCarDetails({
          name: car.name,
          price: carPrice || car.price,
          duration: carDuration || car.duration,
          image: car.image
        })
        setFormData(prev => ({
          ...prev,
          selectedCar: car.value
        }))
      }
    }
  }, [searchParams])

  const handleInputChange = (field: string) => (event: any) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    })
  }

  const handleCarSelect = (carValue: string) => {
    const selectedCar = availableCars.find(car => car.value === carValue)
    if (selectedCar) {
      setFormData({
        ...formData,
        selectedCar: carValue
      })
      setSelectedCarDetails({
        name: selectedCar.name,
        price: selectedCar.price,
        duration: selectedCar.duration,
        image: selectedCar.image
      })
    }
  }

  const handleBookNow = () => {
    // Auto-select the car in the form when Book Now is clicked
    const carValue = 'ford-taurus' // Default to Ford Taurus
    handleCarSelect(carValue)
    
    // Scroll to the form
    const formElement = document.getElementById('booking-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Form submitted:', formData)
  }

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
            alt="Manage Booking Background"
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
          <Box sx={{ textAlign: 'center', mb: 4 }}>
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
                Manage Booking
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'rgba(255,255,255,0.9)', 
                  lineHeight: 1.6,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }
                }}
              >
                Book and manage your transportation services with ease
              </Typography>
            </SlideUpInView>
          </Box>
        </Container>
      </Box>
      
      <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          
          <Grid container spacing={4}>
            {/* Booking Form - Left Side */}
            <Grid size={{ xs: 12, md: 7 }}>
              <SlideSidewayInView initialX={-50} duration={0.8}>
                <Card sx={{ p: 4, backgroundColor: 'white' }} id="booking-form">
                  <CardContent sx={{ p: 0 }}>
                    <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      {/* Full Name */}
                      <Grid size={{ xs: 12 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#333',
                            fontWeight: 'bold',
                            mb: 0.5,
                            fontSize: '0.875rem',
                          }}
                        >
                          Full Name*
                        </Typography>
                        <TextField
                          fullWidth
                          value={formData.fullName}
                          onChange={handleInputChange('fullName')}
                          placeholder="Enter your email address here"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                            }
                          }}
                        />
                      </Grid>

                      {/* Email */}
                      <Grid size={{ xs: 12 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#333',
                            fontWeight: 'bold',
                            mb: 0.5,
                            fontSize: '0.875rem',
                          }}
                        >
                          Email Address*
                        </Typography>
                        <TextField
                          fullWidth
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange('email')}
                          placeholder="Enter your email address here"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                            }
                          }}
                        />
                      </Grid>

                      {/* Contact Number */}
                      <Grid size={{ xs: 12 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#333',
                            fontWeight: 'bold',
                            mb: 0.5,
                            fontSize: '0.875rem',
                          }}
                        >
                          Contact Number*
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <TextField
                            label="Country Code"
                            value={formData.countryCode}
                            onChange={handleInputChange('countryCode')}
                            sx={{ 
                              width: '30%',
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                              }
                            }}
                          />
                          <TextField
                            fullWidth
                            value={formData.contactNumber}
                            onChange={handleInputChange('contactNumber')}
                            placeholder="Enter your email address here"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                              }
                            }}
                          />
                        </Box>
                      </Grid>

                      {/* Select Car */}
                      <Grid size={{ xs: 12 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#333',
                            fontWeight: 'bold',
                            mb: 0.5,
                            fontSize: '0.875rem',
                          }}
                        >
                          Select Car*
                        </Typography>
                        <FormControl fullWidth>
                          <Select
                            value={formData.selectedCar}
                            onChange={(e) => handleCarSelect(e.target.value)}
                            displayEmpty
                            MenuProps={{
                              disableScrollLock: true,
                            }}
                            sx={{
                              borderRadius: '8px',
                            }}
                          >
                            <MenuItem value="" disabled>
                              Enter your email address here
                            </MenuItem>
                            {availableCars.map((car) => (
                              <MenuItem key={car.value} value={car.value}>
                                {car.name} - {car.price}/{car.duration}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Trip Type */}
                      <Grid size={{ xs: 12 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#333',
                            fontWeight: 'bold',
                            mb: 0.5,
                            fontSize: '0.875rem',
                          }}
                        >
                          Trip Type*
                        </Typography>
                        <TextField
                          fullWidth
                          value={formData.tripType}
                          onChange={handleInputChange('tripType')}
                          placeholder="Enter your email address here"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                            }
                          }}
                        />
                      </Grid>

                      {/* Upload Photo */}
                      <Grid size={{ xs: 12 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#333',
                            fontWeight: 'bold',
                            mb: 0.5,
                            fontSize: '0.875rem',
                          }}
                        >
                          Upload Photo*
                        </Typography>
                        <Box
                          sx={{
                            border: '2px dashed #ccc',
                            borderRadius: '8px',
                            p: 4,
                            textAlign: 'center',
                            backgroundColor: '#f8f9fa',
                            cursor: 'pointer',
                            minHeight: '120px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': {
                              borderColor: '#52A4C1',
                              backgroundColor: '#f0f8ff',
                            }
                          }}
                        >
                          <CloudUpload sx={{ fontSize: 40, color: '#666', mb: 1 }} />
                          <Typography variant="body1" sx={{ color: '#666', fontWeight: 'bold' }}>
                            Upload Photo
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Pickup Date */}
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#333',
                            fontWeight: 'bold',
                            mb: 0.5,
                            fontSize: '0.875rem',
                          }}
                        >
                          Pickup Date*
                        </Typography>
                        <TextField
                          fullWidth
                          type="date"
                          value={formData.pickupDate}
                          onChange={handleInputChange('pickupDate')}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <CalendarToday sx={{ color: '#666' }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                            }
                          }}
                        />
                      </Grid>

                      {/* Return Date */}
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#333',
                            fontWeight: 'bold',
                            mb: 0.5,
                            fontSize: '0.875rem',
                          }}
                        >
                          Return Date*
                        </Typography>
                        <TextField
                          fullWidth
                          type="date"
                          value={formData.returnDate}
                          onChange={handleInputChange('returnDate')}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <CalendarToday sx={{ color: '#666' }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                            }
                          }}
                        />
                      </Grid>

                      {/* Action Buttons */}
                      <Grid size={{ xs: 12 }}>
                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                          <Button
                            variant="outlined"
                            size="large"
                            sx={{
                              flex: 1,
                              py: 1.5,
                              borderColor: '#D8D8D8',
                              color: '#666',
                              backgroundColor: '#D8D8D8',
                              borderRadius: '8px',
                              '&:hover': {
                                borderColor: '#ccc',
                                backgroundColor: '#ccc',
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
                              flex: 1,
                              py: 1.5,
                              backgroundColor: '#52A4C1',
                              borderRadius: '8px',
                              '&:hover': {
                                backgroundColor: '#4a94b1',
                              }
                            }}
                          >
                            Confirm
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                  </CardContent>
                </Card>
              </SlideSidewayInView>
            </Grid>

            {/* Car Details Card - Right Side */}
            <Grid size={{ xs: 12, md: 5 }}>
              <SlideUpInView initialY={60} duration={0.9} delay={0.3}>
                <Card sx={{ 
                  p: 0, 
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ p: 3 }}>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: '#52A4C1', 
                        fontWeight: 'bold', 
                        mb: 3,
                        fontSize: '1.5rem'
                      }}
                    >
                      {selectedCarDetails.name}
                    </Typography>
                    
                    <Box sx={{ mb: 3, textAlign: 'center' }}>
                      <Image
                        src={selectedCarDetails.image.src || selectedCarDetails.image}
                        alt={selectedCarDetails.name}
                        width={300}
                        height={200}
                        style={{ 
                          width: '100%', 
                          height: '200px', 
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />
                    </Box>
                    
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        color: '#333', 
                        fontWeight: 'bold', 
                        mb: 3,
                        fontSize: '1.1rem'
                      }}
                    >
                      Rent: {selectedCarDetails.price}/{selectedCarDetails.duration}
                    </Typography>
                    
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      onClick={handleBookNow}
                      sx={{
                        py: 1.5,
                        backgroundColor: '#52A4C1',
                        borderRadius: '8px',
                        '&:hover': {
                          backgroundColor: '#4a94b1',
                        }
                      }}
                    >
                      Book Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
              </SlideUpInView>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  )
}

export default ManageBookingPage