'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  TextField,
  Button,
  CircularProgress,
  IconButton,
} from '@mui/material';
import {
  MobileIcon,
  EmailIcon,
  LocationIcon,
  WhatsAppIcon,
} from './icons';
import { ScaleInView, SlideSidewayInView, SlideUpInView } from '@/components/animations';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <Box sx={{ py: 10, px: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Grid container sx={{ position: 'relative', minHeight: { xs: 'auto', lg: '500px' }, width: '100%' }}>

          {/* Contact Us Card - Left side */}
          <Grid size={{ xs: 12, lg: 5 }} sx={{ zIndex: 2, position: { xs: 'relative', lg: 'absolute' }, top: { xs: 0, lg: 140 }, left: 0, height: { xs: 'auto', lg: '392px' } }}>
            <SlideSidewayInView initialX={-50} duration={0.8}>
              <Card sx={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              p: { xs: 4, lg: 6 },
              height: '100%',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 2
            }}>
              <Box>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                    mb: 4,
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  Contact Us
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <IconButton size="small" sx={{ color: '#52A4C1', mr: 2 }}>
                    <MobileIcon />
                  </IconButton>
                  <Typography variant="body1" sx={{ fontSize: '16px', fontFamily: 'Poppins, sans-serif' }}>
                    +966 59 427 9012
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <IconButton size="small" sx={{ color: '#52A4C1', mr: 2 }}>
                    <EmailIcon />
                  </IconButton>
                  <Typography variant="body1" sx={{ fontSize: '16px', fontFamily: 'Poppins, sans-serif' }}>
                    Reservations@eventforce.sa.com
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
                  <IconButton size="small" sx={{ color: '#52A4C1', mr: 2, mt: '2px' }}>
                    <LocationIcon />
                  </IconButton>
                  <Typography variant="body1" sx={{ fontSize: '16px', fontFamily: 'Poppins, sans-serif' }}>
                    <Box component="span" sx={{ fontWeight: 'bold' }}>Head Quarter:</Box><br />
                    White Space 2444 Taha Khasiyfan - Ash Shati Dist. Unit No 4707 Jeddah 23511
                    <br />
                    <Box component="span" sx={{ fontWeight: 'bold' }}>Branch:</Box><br />
                    White Space, King Abdullah Dt. Riyadh 12211, Saudi Arabia
                  </Typography>
                </Box>
              </Box>
              
              {/* <Box sx={{ display: 'flex', gap: 2, mt: 'auto', p: 1 }}>
                <IconButton sx={{ color: '#52A4C1' }}>
                  <WhatsAppIcon />
                </IconButton>
                <IconButton sx={{ color: '#52A4C1' }}>
                  <MobileIcon />
                </IconButton>
                <IconButton sx={{ color: '#52A4C1' }}>
                  <EmailIcon />
                </IconButton>
              </Box> */}
            </Card>
            </SlideSidewayInView>
          </Grid>

          {/* Contact Form Card - Right side with overlap */}
          <Grid size={{ xs: 12, lg: 10}} sx={{ ml: { xs: 0, lg: 'auto' }, mt: { xs: 2, lg: 6 }, zIndex: 1, position: 'relative' }}>
            <SlideUpInView initialY={60} duration={0.9} delay={0.3}>
              <Card sx={{
              p: { xs: 4, lg: 6 },
              backgroundColor: '#FFFFFF',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              borderRadius: 2,
              height: '100%',
            
            }}>
              <Box component="form" onSubmit={handleSubmit} sx={{ display: { xs: 'block', lg: 'none' } }}>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    fontFamily: 'Poppins, sans-serif',
                    color: '#333333'
                  }}
                >
                  Love to hear from you
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#666666',
                    mb: 4,
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  Get in touch!
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'bold',
                        mb: 1,
                        fontFamily: 'Poppins, sans-serif',
                        color: '#333333'
                      }}
                    >
                      Your Name *
                    </Typography>
                    <TextField
                      fullWidth
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#F5F5F5',
                          borderRadius: 1,
                        },
                      }}
                    />
                  </Box>
                  
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'bold',
                        mb: 1,
                        fontFamily: 'Poppins, sans-serif',
                        color: '#333333'
                      }}
                    >
                      Your Email *
                    </Typography>
                    <TextField
                      fullWidth
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email address"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#F5F5F5',
                          borderRadius: 1,
                        },
                      }}
                    />
                  </Box>
                  
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'bold',
                        mb: 1,
                        fontFamily: 'Poppins, sans-serif',
                        color: '#333333'
                      }}
                    >
                      Message *
                    </Typography>
                    <TextField
                      fullWidth
                      name="message"
                      multiline
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your message here"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#F5F5F5',
                          borderRadius: 1,
                        },
                      }}
                    />
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={isSubmitting}
                    sx={{
                      backgroundColor: '#52A4C1',
                      borderRadius: 1,
                      py: 2,
                      textTransform: 'none',
                      fontWeight: 'bold',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '16px',
                      '&:hover': {
                        backgroundColor: '#4A8FA8',
                      },
                    }}
                  >
                    {isSubmitting ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                        <CircularProgress size={20} color="inherit" />
                        <span>Sending Message...</span>
                      </Box>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </Box>
              </Box>

              <Grid container sx={{ display: { xs: 'none', lg: 'flex' } }}>
                <Grid size={{ xs: 12, lg: 5}}>
                  <Box>
                    
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, lg: 7}}>
                  <Box component="form" onSubmit={handleSubmit}>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    fontFamily: 'Poppins, sans-serif',
                    color: '#333333'
                  }}
                >
                  Love to hear from you
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#666666',
                    mb: 4,
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  Get in touch!
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'bold',
                        mb: 1,
                        fontFamily: 'Poppins, sans-serif',
                        color: '#333333'
                      }}
                    >
                      Your Name *
                    </Typography>
                    <TextField
                      fullWidth
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#F5F5F5',
                          borderRadius: 1,
                        },
                      }}
                    />
                  </Box>
                  
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'bold',
                        mb: 1,
                        fontFamily: 'Poppins, sans-serif',
                        color: '#333333'
                      }}
                    >
                      Your Email *
                    </Typography>
                    <TextField
                      fullWidth
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email address"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#F5F5F5',
                          borderRadius: 1,
                        },
                      }}
                    />
                  </Box>
                  
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'bold',
                        mb: 1,
                        fontFamily: 'Poppins, sans-serif',
                        color: '#333333'
                      }}
                    >
                      Message *
                    </Typography>
                    <TextField
                      fullWidth
                      name="message"
                      multiline
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your message here"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#F5F5F5',
                          borderRadius: 1,
                        },
                      }}
                    />
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={isSubmitting}
                    sx={{
                      backgroundColor: '#52A4C1',
                      borderRadius: 1,
                      py: 2,
                      textTransform: 'none',
                      fontWeight: 'bold',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '16px',
                      '&:hover': {
                        backgroundColor: '#4A8FA8',
                      },
                    }}
                  >
                    {isSubmitting ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                        <CircularProgress size={20} color="inherit" />
                        <span>Sending Message...</span>
                      </Box>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </Box>
                  </Box>
                </Grid>
              </Grid>
            </Card>
            </SlideUpInView>
          </Grid>
      </Grid>
    </Box>
  );
};

export default ContactSection;