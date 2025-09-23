'use client';

import React, { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Grid,
  Chip,
  Divider,
  Button
} from '@mui/material';
import { 
  Help, 
  QuestionAnswer, 
  Description, 
  PrivacyTip,
  ArrowForward,
  Support,
  ContactSupport
} from '@mui/icons-material';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OfflineFallback from '@/components/OfflineFallback';
import PWATest from '@/components/PWATest';
import { ScaleInView, SlideUpInView } from '@/components/animations';
import { useOffline } from '@/hooks/useOffline';

const SupportPage = () => {
  const { isOffline } = useOffline();

  // Cache support pages when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'CACHE_SUPPORT_PAGES' });
    }
  }, []);

  // Show offline fallback if offline and no cached content
  if (isOffline && typeof window !== 'undefined' && !window.navigator.serviceWorker?.controller) {
    return <OfflineFallback showNavigation={true} />;
  }

  const supportItems = [
    {
      title: 'Help Center',
      description: 'Find answers to common questions and get step-by-step guides',
      icon: <Help />,
      href: '/support/help-center',
      color: '#52A4C1'
    },
    {
      title: 'FAQ',
      description: 'Browse frequently asked questions for quick solutions',
      icon: <QuestionAnswer />,
      href: '/support/faq',
      color: '#1976d2'
    },
    {
      title: 'Terms of Service',
      description: 'Read our terms and conditions for using our services',
      icon: <Description />,
      href: '/support/terms',
      color: '#f57c00'
    },
    {
      title: 'Privacy Policy',
      description: 'Learn how we protect and handle your personal information',
      icon: <PrivacyTip />,
      href: '/support/privacy',
      color: '#9c27b0'
    }
  ];

  const quickActions = [
    {
      title: 'Contact Support',
      description: 'Get in touch with our support team',
      icon: <ContactSupport />,
      href: '/contact-us',
      color: '#52A4C1'
    },
    {
      title: 'Live Chat',
      description: 'Chat with us in real-time',
      icon: <Support />,
      href: '#',
      color: '#1976d2'
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
          background: 'linear-gradient(135deg, #52A4C1 0%, #1976d2 100%)',
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
                Support Center
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
                Get help, find answers, and access all the information you need
              </Typography>
            </SlideUpInView>
          </Box>
        </Container>
      </Box>

      {/* Support Navigation Section */}
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
              How Can We Help You?
            </Typography>
          </SlideUpInView>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Card sx={{ mb: 4 }}>
                <CardContent sx={{ p: 0 }}>
                  <List sx={{ p: 0 }}>
                    {supportItems.map((item, index) => (
                      <React.Fragment key={index}>
                        <ListItem disablePadding>
                          <ListItemButton
                            component={Link}
                            href={item.href}
                            sx={{
                              p: 3,
                              '&:hover': {
                                backgroundColor: '#f8f9fa',
                                '& .MuiListItemIcon-root': {
                                  color: item.color,
                                  transform: 'scale(1.1)'
                                },
                                '& .MuiListItemText-primary': {
                                  color: item.color
                                }
                              },
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <ListItemIcon sx={{ mr: 3, color: item.color }}>
                              {item.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                  {item.title}
                                </Typography>
                              }
                              secondary={
                                <Typography variant="body2" sx={{ color: '#666' }}>
                                  {item.description}
                                </Typography>
                              }
                            />
                            <ArrowForward sx={{ color: '#ccc' }} />
                          </ListItemButton>
                        </ListItem>
                        {index < supportItems.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <PWATest />
                
                <ScaleInView initialScale={0.9} duration={0.8} delay={0.2}>
                  <Card sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
                      Quick Actions
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          component={Link}
                          href={action.href}
                          variant="outlined"
                          startIcon={action.icon}
                          sx={{
                            justifyContent: 'flex-start',
                            textAlign: 'left',
                            p: 2,
                            borderColor: action.color,
                            color: action.color,
                            '&:hover': {
                              backgroundColor: action.color,
                              color: 'white',
                              borderColor: action.color
                            }
                          }}
                        >
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              {action.title}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.8 }}>
                              {action.description}
                            </Typography>
                          </Box>
                        </Button>
                      ))}
                    </Box>
                  </Card>
                </ScaleInView>

                <ScaleInView initialScale={0.9} duration={0.8} delay={0.4}>
                  <Card sx={{ p: 3, backgroundColor: '#f8f9fa' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
                      Popular Topics
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {['Booking Issues', 'Payment Problems', 'Driver Contact', 'Cancellation', 'Refunds'].map((topic, index) => (
                        <Chip
                          key={index}
                          label={topic}
                          size="small"
                          sx={{
                            backgroundColor: '#52A4C1',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: '#4A8FA8'
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </Card>
                </ScaleInView>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact Support Section */}
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
                Still Need Help?
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
              <Typography variant="body1" sx={{ mb: 4, color: '#666', maxWidth: '600px', mx: 'auto' }}>
                If you can't find what you're looking for, our support team is ready to help you with any questions or concerns.
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={1.0} delay={0.4}>
              <Button 
                variant="contained" 
                size="large"
                href="/contact-us"
                sx={{ 
                  backgroundColor: '#52A4C1',
                  px: 4,
                  py: 1.5,
                  '&:hover': { backgroundColor: '#4A8FA8' }
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

export default SupportPage;