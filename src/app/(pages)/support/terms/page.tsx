'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent,
  Breadcrumbs,
  Link,
  Divider,
  Button
} from '@mui/material';
import { Home, Description } from '@mui/icons-material';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScaleInView, SlideUpInView } from '@/components/animations';

const TermsPage = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing and using Event Force services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
    },
    {
      title: '2. Description of Service',
      content: 'Event Force provides premium transportation and event logistics services including but not limited to luxury vehicle rentals, chauffeur services, event transportation, and comprehensive logistics solutions for various occasions and events across Saudi Arabia.'
    },
    {
      title: '3. User Responsibilities',
      content: 'Users are responsible for providing accurate information during booking, arriving on time for scheduled services, treating drivers and staff with respect, and following all applicable laws and regulations. Any damage to vehicles or equipment will be charged to the user.'
    },
    {
      title: '4. Booking and Cancellation Policy',
      content: 'Bookings must be made at least 24 hours in advance. Free cancellation is available up to 24 hours before scheduled service. Cancellations within 24 hours may incur a 50% charge. Same-day cancellations are subject to full payment. Emergency situations are handled case-by-case.'
    },
    {
      title: '5. Payment Terms',
      content: 'Payment is required at the time of booking confirmation. We accept all major credit cards, bank transfers, and digital wallets. All payments are processed securely through encrypted channels. Corporate clients may arrange monthly billing with approved credit terms.'
    },
    {
      title: '6. Service Availability',
      content: 'While we strive to provide reliable service, we cannot guarantee availability during peak times, severe weather conditions, or other circumstances beyond our control. We reserve the right to substitute vehicles of similar quality and capacity when necessary.'
    },
    {
      title: '7. Liability and Insurance',
      content: 'Event Force carries comprehensive commercial insurance coverage for all vehicles and services. Our liability is limited to the cost of the service provided. Users are responsible for their personal belongings and any damage caused by their negligence.'
    },
    {
      title: '8. Privacy and Data Protection',
      content: 'We are committed to protecting your privacy and personal information. All data is collected, stored, and processed in accordance with applicable privacy laws and our Privacy Policy. We do not sell or share your personal information with third parties without your consent.'
    },
    {
      title: '9. Prohibited Activities',
      content: 'Users are prohibited from using our services for illegal activities, transporting prohibited items, smoking in vehicles, consuming alcohol, or engaging in any behavior that may endanger the driver, other passengers, or the public.'
    },
    {
      title: '10. Intellectual Property',
      content: 'All content, trademarks, logos, and intellectual property displayed on our website and materials are the property of Event Force or our licensors. Users may not reproduce, distribute, or use any content without written permission.'
    },
    {
      title: '11. Termination',
      content: 'We reserve the right to terminate or suspend your access to our services immediately, without prior notice, for any reason, including breach of these terms. Upon termination, your right to use the service will cease immediately.'
    },
    {
      title: '12. Governing Law',
      content: 'These terms shall be governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts of Saudi Arabia.'
    },
    {
      title: '13. Changes to Terms',
      content: 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Continued use of our services after changes constitutes acceptance of the new terms.'
    },
    {
      title: '14. Contact Information',
      content: 'For questions about these terms or our services, please contact us at:\n\nEmail: legal@eventforce.sa.com\nPhone: +966 59 427 9012\nAddress: Riyadh, Saudi Arabia'
    }
  ];

  return (
    <>
      <Header />
      
      {/* Breadcrumbs */}
      <Box sx={{ pt: 8, pb: 2, backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Breadcrumbs aria-label="breadcrumb">
            <Link href="/" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
              <Home sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Link href="/support" color="inherit">
              Support
            </Link>
            <Typography color="text.primary">Terms of Service</Typography>
          </Breadcrumbs>
        </Container>
      </Box>
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          minHeight: '40vh',
          background: 'linear-gradient(135deg, #f57c00 0%, #ff9800 100%)',
          display: 'flex',
          alignItems: 'center',
          color: 'white'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <SlideUpInView initialY={60} duration={0.8}>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 3,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                }}
              >
                Terms of Service
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
              <Typography 
                variant="h5" 
                sx={{ 
                  opacity: 0.9,
                  maxWidth: '800px',
                  mx: 'auto',
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }
                }}
              >
                Please read these terms carefully before using our services
              </Typography>
            </SlideUpInView>
          </Box>
        </Container>
      </Box>

      {/* Terms Content */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Card sx={{ p: 4 }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                Last updated: December 2024
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>
                These Terms of Service ("Terms") govern your use of Event Force's transportation and event logistics services. 
                By using our services, you agree to be bound by these terms.
              </Typography>
            </Box>

            <Divider sx={{ my: 4 }} />

            {sections.map((section, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <ScaleInView initialScale={0.9} duration={0.8} delay={index * 0.1}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 'bold', 
                      mb: 2, 
                      color: '#333'
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#666', 
                      lineHeight: 1.6,
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {section.content}
                  </Typography>
                </ScaleInView>
                {index < sections.length - 1 && <Divider sx={{ my: 3 }} />}
              </Box>
            ))}
          </Card>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box sx={{ py: 8, backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <SlideUpInView initialY={60} duration={0.8}>
              <Typography 
                variant="h3" 
                component="h2"
                sx={{ 
                  fontWeight: 'bold',
                  mb: 4,
                  color: '#333'
                }}
              >
                Questions About These Terms?
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
              <Typography variant="body1" sx={{ mb: 4, color: '#666', maxWidth: '600px', mx: 'auto' }}>
                If you have any questions about these terms or need clarification on any points, 
                please don't hesitate to contact our legal team.
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={1.0} delay={0.4}>
              <Button 
                variant="contained" 
                size="large"
                href="/support"
                sx={{ 
                  backgroundColor: '#f57c00',
                  px: 4,
                  py: 1.5,
                  '&:hover': { backgroundColor: '#ef6c00' }
                }}
              >
                Contact Support
              </Button>
            </SlideUpInView>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default TermsPage;
