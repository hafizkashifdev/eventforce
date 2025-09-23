import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  List, 
  ListItem, 
  ListItemText,
  Divider,
  Chip
} from '@mui/material';
import { Gavel, Security, CreditCard, CarRental, Event } from '@mui/icons-material';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScaleInView, SlideUpInView } from '@/components/animations';

export const metadata = {
  title: 'Terms of Service - Event Force | Legal Terms & Conditions',
  description: 'Read Event Force terms of service and conditions for using our premium transportation and event logistics services in Saudi Arabia.',
  keywords: ['terms of service', 'terms and conditions', 'legal', 'Event Force', 'transportation terms', 'event logistics terms', 'user agreement'],
};

const TermsOfServicePage = () => {
  const lastUpdated = 'December 2024';

  const sections = [
    {
      title: '1. Acceptance of Terms',
      icon: <Gavel />,
      color: '#52A4C1',
      content: [
        'By accessing and using Event Force services, you accept and agree to be bound by the terms and provision of this agreement.',
        'If you do not agree to abide by the above, please do not use this service.',
        'These terms apply to all visitors, users, and others who access or use the service.'
      ]
    },
    {
      title: '2. Service Description',
      icon: <CarRental />,
      color: '#1976d2',
      content: [
        'Event Force provides premium transportation and event logistics services across Saudi Arabia.',
        'Our services include luxury vehicle rentals, chauffeur services, event transportation, and logistics planning.',
        'All services are subject to availability and may be modified or discontinued at our discretion.',
        'We reserve the right to refuse service to anyone for any reason at any time.'
      ]
    },
    {
      title: '3. User Accounts',
      icon: <Security />,
      color: '#f57c00',
      content: [
        'You must provide accurate, current, and complete information when creating an account.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'You must notify us immediately of any unauthorized use of your account.',
        'We reserve the right to suspend or terminate accounts that violate these terms.'
      ]
    },
    {
      title: '4. Booking and Payment',
      icon: <CreditCard />,
      color: '#4caf50',
      content: [
        'All bookings are subject to availability and confirmation by Event Force.',
        'Payment is required at the time of booking unless otherwise agreed.',
        'We accept major credit cards, bank transfers, and approved corporate billing.',
        'Prices are subject to change without notice, but confirmed bookings will be honored at the agreed rate.',
        'Cancellation policies vary by service type and are detailed in your booking confirmation.'
      ]
    },
    {
      title: '5. Event Logistics Services',
      icon: <Event />,
      color: '#9c27b0',
      content: [
        'Event logistics services require detailed planning and may involve additional terms.',
        'Client cooperation is essential for successful event execution.',
        'Changes to event logistics must be communicated at least 48 hours in advance.',
        'Additional charges may apply for last-minute changes or special requirements.'
      ]
    }
  ];

  const additionalTerms = [
    {
      title: '6. Limitation of Liability',
      content: 'Event Force shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.'
    },
    {
      title: '7. Indemnification',
      content: 'You agree to defend, indemnify, and hold harmless Event Force and its officers, directors, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees arising out of or relating to your violation of these terms.'
    },
    {
      title: '8. Privacy Policy',
      content: 'Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.'
    },
    {
      title: '9. Modifications',
      content: 'We reserve the right, at our sole discretion, to modify or replace these terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.'
    },
    {
      title: '10. Governing Law',
      content: 'These terms shall be interpreted and governed by the laws of the Kingdom of Saudi Arabia. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Saudi Arabia.'
    }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          pt: 8,
          minHeight: '50vh',
          background: 'linear-gradient(135deg, #333 0%, #666 100%)',
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
                  mb: 2,
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }
                }}
              >
                Please read these terms carefully before using our services
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={1.0} delay={0.4}>
              <Chip 
                label={`Last updated: ${lastUpdated}`}
                sx={{ 
                  backgroundColor: '#52A4C1',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
            </SlideUpInView>
          </Box>
        </Container>
      </Box>

      {/* Main Terms Sections */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <SlideUpInView initialY={60} duration={0.8}>
            <Typography 
              variant="h3" 
              component="h2"
              sx={{ 
                textAlign: 'center', 
                mb: 6, 
                fontWeight: 'bold',
                color: '#333'
              }}
            >
              Terms and Conditions
            </Typography>
          </SlideUpInView>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {sections.map((section, index) => (
              <ScaleInView key={index} initialScale={0.9} duration={0.8} delay={index * 0.1}>
                <Card sx={{ overflow: 'visible' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box 
                        sx={{ 
                          color: section.color,
                          mr: 2,
                          '& .MuiSvgIcon-root': { fontSize: '2rem' }
                        }}
                      >
                        {section.icon}
                      </Box>
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: 'bold',
                          color: section.color
                        }}
                      >
                        {section.title}
                      </Typography>
                    </Box>
                    <List>
                      {section.content.map((item, itemIndex) => (
                        <ListItem key={itemIndex} sx={{ px: 0, py: 1 }}>
                          <ListItemText 
                            primary={item}
                            sx={{
                              '& .MuiListItemText-primary': {
                                lineHeight: 1.6,
                                color: '#333'
                              }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </ScaleInView>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Additional Terms Section */}
      <Box sx={{ py: 8, backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <SlideUpInView initialY={60} duration={0.8}>
            <Typography 
              variant="h3" 
              component="h2"
              sx={{ 
                textAlign: 'center', 
                mb: 6, 
                fontWeight: 'bold',
                color: '#333'
              }}
            >
              Additional Terms
            </Typography>
          </SlideUpInView>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {additionalTerms.map((term, index) => (
              <ScaleInView key={index} initialScale={0.9} duration={0.8} delay={index * 0.1}>
                <Card>
                  <CardContent sx={{ p: 4 }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 'bold',
                        mb: 2,
                        color: '#52A4C1'
                      }}
                    >
                      {term.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        lineHeight: 1.6,
                        color: '#333'
                      }}
                    >
                      {term.content}
                    </Typography>
                  </CardContent>
                </Card>
              </ScaleInView>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Contact Information Section */}
      <Box sx={{ py: 8 }}>
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
                If you have any questions about these Terms of Service, please contact our legal team.
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={1.0} delay={0.4}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
                <Typography variant="body1" sx={{ color: '#333', fontWeight: 'bold' }}>
                  Email: legal@eventforce.sa.com
                </Typography>
                <Typography variant="body1" sx={{ color: '#333', fontWeight: 'bold' }}>
                  Phone: +966 59 427 9012
                </Typography>
              </Box>
            </SlideUpInView>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default TermsOfServicePage;
