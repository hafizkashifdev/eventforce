'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  TextField,
  InputAdornment,
  Chip,
  Grid,
  Button,
  Breadcrumbs,
  Link
} from '@mui/material';
import { Search, ExpandMore, Help, Book, Support, Home } from '@mui/icons-material';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScaleInView, SlideUpInView } from '@/components/animations';

const HelpCenterPageClient = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | false>(false);

  const helpCategories = [
    {
      title: 'Getting Started',
      icon: <Help />,
      color: '#52A4C1',
      articles: [
        {
          question: 'How do I create an account?',
          answer: 'Creating an account is simple! Click on "Sign Up" in the top right corner, fill in your details, and verify your email address. You can also sign up using Google or Apple for faster registration.'
        },
        {
          question: 'What information do I need to book a vehicle?',
          answer: 'To book a vehicle, you\'ll need to provide your pickup location, destination, date and time, contact information, and any special requirements. We also need to know the number of passengers and luggage requirements.'
        },
        {
          question: 'How far in advance should I book?',
          answer: 'We recommend booking at least 24-48 hours in advance for standard services. For special events or peak times, booking 1-2 weeks ahead ensures better availability and pricing options.'
        }
      ]
    },
    {
      title: 'Booking & Reservations',
      icon: <Book />,
      color: '#1976d2',
      articles: [
        {
          question: 'Can I modify my booking?',
          answer: 'Yes! You can modify your booking up to 24 hours before your scheduled pickup time. Changes include date, time, pickup location, and vehicle type. Contact our support team or use the "Manage Booking" section in your account.'
        },
        {
          question: 'What is your cancellation policy?',
          answer: 'Free cancellation is available up to 24 hours before your scheduled pickup. Cancellations within 24 hours may incur a 50% charge. Same-day cancellations are subject to full payment. Emergency situations are handled case-by-case.'
        },
        {
          question: 'How do I track my vehicle?',
          answer: 'Once your booking is confirmed, you\'ll receive a tracking link via SMS and email. You can also track your vehicle in real-time through our mobile app or website using your booking reference number.'
        }
      ]
    },
    {
      title: 'Payment & Billing',
      icon: <Support />,
      color: '#f57c00',
      articles: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), bank transfers, and digital wallets. Corporate clients can also arrange monthly billing. All payments are processed securely through encrypted channels.'
        },
        {
          question: 'When will I be charged?',
          answer: 'Payment is typically charged at the time of booking confirmation. For long-term rentals, we may require a deposit upfront with the balance due before service delivery. Corporate accounts may have different billing arrangements.'
        },
        {
          question: 'Can I get a receipt for my booking?',
          answer: 'Yes! Receipts are automatically generated and sent to your email after payment. You can also download receipts from your account dashboard. For corporate clients, detailed invoices are provided for accounting purposes.'
        }
      ]
    }
  ];

  const popularTopics = [
    'Vehicle availability',
    'Pricing information',
    'Driver details',
    'Booking modifications',
    'Payment issues',
    'Cancellation policy',
    'Event logistics',
    'Corporate services'
  ];

  const handleCategoryChange = (category: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedCategory(isExpanded ? category : false);
  };

  const filteredCategories = helpCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some(article => 
      article.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
            <Typography color="text.primary">Help Center</Typography>
          </Breadcrumbs>
        </Container>
      </Box>
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          minHeight: '40vh',
          background: 'linear-gradient(135deg, #1976d2 0%, #52A4C1 100%)',
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
                Help Center
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
              <Typography 
                variant="h5" 
                sx={{ 
                  opacity: 0.9,
                  maxWidth: '800px',
                  mx: 'auto',
                  mb: 4,
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }
                }}
              >
                Find answers to your questions and get the support you need
              </Typography>
            </SlideUpInView>
            
            {/* Search Bar */}
            <SlideUpInView initialY={40} duration={1.0} delay={0.4}>
              <TextField
                fullWidth
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  maxWidth: '600px',
                  mx: 'auto',
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    borderRadius: '50px',
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: '#666' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </SlideUpInView>
          </Box>
        </Container>
      </Box>

      {/* Popular Topics Section */}
      <Box sx={{ py: 6, backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <SlideUpInView initialY={60} duration={0.8}>
            <Typography 
              variant="h4" 
              component="h2"
              sx={{ 
                textAlign: 'center', 
                mb: 4, 
                fontWeight: 'bold',
                color: '#333'
              }}
            >
              Popular Topics
            </Typography>
          </SlideUpInView>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {popularTopics.map((topic, index) => (
              <ScaleInView key={index} initialScale={0.8} duration={0.6} delay={index * 0.1}>
                <Chip
                  label={topic}
                  onClick={() => setSearchQuery(topic)}
                  sx={{
                    backgroundColor: '#52A4C1',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#4A8FA8',
                    }
                  }}
                />
              </ScaleInView>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Help Categories Section */}
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
              Browse by Category
            </Typography>
          </SlideUpInView>

          <Grid container spacing={4}>
            {filteredCategories.map((category, categoryIndex) => (
              <Grid size={{ xs: 12 }} key={categoryIndex}>
                <ScaleInView initialScale={0.9} duration={0.8} delay={categoryIndex * 0.2}>
                  <Card sx={{ mb: 2 }}>
                    <Accordion 
                      expanded={expandedCategory === category.title}
                      onChange={handleCategoryChange(category.title)}
                      sx={{ boxShadow: 'none' }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        sx={{
                          backgroundColor: category.color,
                          color: 'white',
                          '&:hover': {
                            backgroundColor: category.color,
                            opacity: 0.9
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                          {category.icon}
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                          {category.title}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ p: 0 }}>
                        {category.articles.map((article, articleIndex) => (
                          <Box key={articleIndex}>
                            <Box sx={{ p: 3, borderBottom: '1px solid #eee' }}>
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  fontWeight: 'bold', 
                                  mb: 2, 
                                  color: '#333',
                                  cursor: 'pointer'
                                }}
                              >
                                {article.question}
                              </Typography>
                              <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>
                                {article.answer}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  </Card>
                </ScaleInView>
              </Grid>
            ))}
          </Grid>

          {filteredCategories.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5" sx={{ mb: 2, color: '#666' }}>
                No articles found for "{searchQuery}"
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: '#999' }}>
                Try searching with different keywords or browse our categories above.
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => setSearchQuery('')}
                sx={{ 
                  backgroundColor: '#52A4C1',
                  '&:hover': { backgroundColor: '#4A8FA8' }
                }}
              >
                Clear Search
              </Button>
            </Box>
          )}
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
                If you can't find the answer you're looking for, our support team is ready to help you with any questions or concerns.
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={1.0} delay={0.4}>
              <Button 
                variant="contained" 
                size="large"
                href="/support"
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

export default HelpCenterPageClient;
