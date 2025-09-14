import React from 'react'
import { Box, Typography, Container } from '@mui/material'
import Image from 'next/image'
import Header from '@/components/Header'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import AboutBg from '@/assets/images/about-bg.png'
import { ScaleInView, SlideSidewayInView, SlideUpInView } from '@/components/animations'

const ContactUsPage = () => {
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
            alt="Contact Us Background"
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
                Contact Us
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
                Get in touch with our team for any questions or to book your next transportation service.
              </Typography>
            </SlideUpInView>
          </Box>
        </Container>
      </Box>
      
      <Box sx={{ pt: 0 }}>
        <ContactSection />
      </Box>
      <Footer />
    </>
  )
}

export default ContactUsPage