import React from 'react'
import { Box, Typography, Container } from '@mui/material'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MissionVision from '@/components/MissionVision'
import BenefitsSection from '@/components/BenefitsSection'
import DownloadProfile from '@/components/DownloadProfile'
import TestimonialsSection from '@/components/TestimonialsSection'

const AboutUsPage = () => {
  return (
    <>
      <Header />
      <Box sx={{ pt: 12 }}>
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 4 }}>
              About Event Force
            </Typography>
            <Typography variant="h5" sx={{ color: 'text.secondary', maxWidth: '800px', mx: 'auto' }}>
              We are Saudi Arabia's premier transportation and event logistics company, 
              dedicated to providing exceptional service and luxury experiences.
            </Typography>
          </Box>
        </Container>
      </Box>
      
      {/* Mission & Vision Section */}
      <MissionVision />
      
      {/* Benefits Section */}
      <BenefitsSection />
      
      {/* Download Profile Section */}
      <DownloadProfile />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      <Footer />
    </>
  )
}

export default AboutUsPage