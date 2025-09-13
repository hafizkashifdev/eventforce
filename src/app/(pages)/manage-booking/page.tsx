'use client';

import React, { useState } from 'react'
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
import { CarFordTaurus } from '@/assets/images'

const ManageBookingPage = () => {
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
    price: '100 SAR',
    duration: 'Per day',
    image: CarFordTaurus
  })

  const availableCars = [
    { value: 'ford-taurus', name: 'Ford Taurus', price: '100 SAR', duration: 'Per day', image: CarFordTaurus },
    { value: 'bmw-5-series', name: 'BMW 5 Series', price: '150 SAR', duration: 'Per day', image: CarFordTaurus },
    { value: 'mercedes-s450', name: 'Mercedes S450', price: '400 SAR', duration: 'Per day', image: CarFordTaurus },
    { value: 'gmc-yukon', name: 'GMC Yukon', price: '150 SAR', duration: 'Per hour', image: CarFordTaurus }
  ]

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
      <Box sx={{ pt: 12, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 6, 
              textAlign: 'center',
              color: '#333'
            }}
          >
            Manage Booking
          </Typography>
          
          <Grid container spacing={4}>
            {/* Booking Form - Left Side */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Card sx={{ p: 4, backgroundColor: '#f8f9fa' }} id="booking-form">
                <CardContent sx={{ p: 0 }}>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      {/* Full Name */}
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          label="Full Name *"
                          value={formData.fullName}
                          onChange={handleInputChange('fullName')}
                          placeholder="Enter your full name"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: '#e9ecef',
                              borderRadius: 2,
                            }
                          }}
                        />
                      </Grid>

                      {/* Email */}
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          label="Email Address *"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange('email')}
                          placeholder="Enter your email address here"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: '#e9ecef',
                              borderRadius: 2,
                            }
                          }}
                        />
                      </Grid>

                      {/* Contact Number */}
                      <Grid size={{ xs: 12 }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <TextField
                            label="Country Code"
                            value={formData.countryCode}
                            onChange={handleInputChange('countryCode')}
                            sx={{ 
                              width: '30%',
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: '#e9ecef',
                                borderRadius: 2,
                              }
                            }}
                          />
                          <TextField
                            fullWidth
                            label="Contact Number *"
                            value={formData.contactNumber}
                            onChange={handleInputChange('contactNumber')}
                            placeholder="Enter your contact number"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: '#e9ecef',
                                borderRadius: 2,
                              }
                            }}
                          />
                        </Box>
                      </Grid>

                      {/* Select Car */}
                      <Grid size={{ xs: 12 }}>
                        <FormControl fullWidth>
                          <InputLabel>Select Car *</InputLabel>
                          <Select
                            value={formData.selectedCar}
                            onChange={(e) => handleCarSelect(e.target.value)}
                            label="Select Car *"
                            sx={{
                              backgroundColor: formData.selectedCar ? '#e3f2fd' : '#e9ecef',
                              borderRadius: 2,
                              border: formData.selectedCar ? '2px solid #1976d2' : '1px solid #ccc',
                            }}
                          >
                            {availableCars.map((car) => (
                              <MenuItem key={car.value} value={car.value}>
                                {car.name} - {car.price}/{car.duration}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {formData.selectedCar && (
                          <Typography variant="body2" sx={{ color: '#1976d2', mt: 1, fontWeight: 'bold' }}>
                            ✓ {selectedCarDetails.name} selected
                          </Typography>
                        )}
                      </Grid>

                      {/* Trip Type */}
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          label="Trip Type *"
                          value={formData.tripType}
                          onChange={handleInputChange('tripType')}
                          placeholder="Enter trip type"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: '#e9ecef',
                              borderRadius: 2,
                            }
                          }}
                        />
                      </Grid>

                      {/* Upload Photo */}
                      <Grid size={{ xs: 12 }}>
                        <Box
                          sx={{
                            border: '2px dashed #ccc',
                            borderRadius: 2,
                            p: 4,
                            textAlign: 'center',
                            backgroundColor: '#e9ecef',
                            cursor: 'pointer',
                            '&:hover': {
                              borderColor: '#1976d2',
                              backgroundColor: '#f0f0f0',
                            }
                          }}
                        >
                          <CloudUpload sx={{ fontSize: 40, color: '#666', mb: 2 }} />
                          <Typography variant="h6" sx={{ color: '#666' }}>
                            Upload Photo
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Pickup Date */}
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Pickup Date *"
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
                              backgroundColor: '#e9ecef',
                              borderRadius: 2,
                            }
                          }}
                        />
                      </Grid>

                      {/* Return Date */}
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Return Date *"
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
                              backgroundColor: '#e9ecef',
                              borderRadius: 2,
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
                              borderColor: '#666',
                              color: '#666',
                              '&:hover': {
                                borderColor: '#333',
                                color: '#333',
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
                              backgroundColor: '#1976d2',
                              '&:hover': {
                                backgroundColor: '#1565c0',
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
            </Grid>

            {/* Car Details Card - Right Side */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Card sx={{ 
                p: 0, 
                backgroundColor: 'white',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: 3
              }}>
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ p: 3 }}>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: '#1976d2', 
                        fontWeight: 'bold', 
                        mb: 3 
                      }}
                    >
                      {selectedCarDetails.name}
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
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
                        mb: 3 
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
                        backgroundColor: '#1976d2',
                        '&:hover': {
                          backgroundColor: '#1565c0',
                        }
                      }}
                    >
                      Book Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  )
}

export default ManageBookingPage