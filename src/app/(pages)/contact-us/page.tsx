import React from 'react'
import { Box, Typography, Container } from '@mui/material'
import Header from '@/components/Header'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

const ContactUsPage = () => {
  return (
    <>
      <Header />
      <Box sx={{ pt: 12 }}>
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 4 }}>
              Contact Us
            </Typography>
            <Typography variant="h5" sx={{ color: 'text.secondary', maxWidth: '800px', mx: 'auto' }}>
              Get in touch with our team for any questions or to book your next transportation service.
            </Typography>
          </Box>
        </Container>
        <ContactSection />
      </Box>
      <Footer />
    </>
  )
}

export default ContactUsPage