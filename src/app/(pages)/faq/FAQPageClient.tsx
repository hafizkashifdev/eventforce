'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  TextField,
  InputAdornment,
  Chip,
  Grid,
  Button,
  Card,
  CardContent
} from '@mui/material';
import { 
  Search, 
  ExpandMore, 
  Help, 
  CarRental, 
  Payment, 
  Event, 
  Security,
  Phone,
  Email
} from '@mui/icons-material';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScaleInView, SlideUpInView } from '@/components/animations';

const FAQPageClient = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | false>(false);

  const faqCategories = [
    {
      title: 'General Questions',
      icon: <Help />,
      color: '#52A4C1',
      questions: [
        {
          question: 'What is Event Force?',
          answer: 'Event Force is a premium transportation and event logistics company based in Saudi Arabia. We provide luxury vehicle rentals, chauffeur services, event transportation, and comprehensive logistics solutions for various occasions and events.'
        },
        {
          question: 'Where do you operate?',
          answer: 'We operate throughout Saudi Arabia, serving major cities including Riyadh, Jeddah, Dammam, and other regions. Our services are available nationwide with local expertise in each area.'
        },
        {
          question: 'What types of events do you handle?',
          answer: 'We handle a wide range of events including corporate meetings, weddings, conferences, airport transfers, city tours, VIP transportation, and large-scale event logistics. Our team can accommodate events of any size.'
        },
        {
          question: 'Do you provide 24/7 service?',
          answer: 'Yes, we provide 24/7 customer support and emergency services. Our fleet is available around the clock for urgent transportation needs, though advance booking is recommended for better availability.'
        }
      ]
    },
    {
      title: 'Booking & Reservations',
      icon: <CarRental />,
      color: '#1976d2',
      questions: [
        {
          question: 'How do I make a booking?',
          answer: 'You can make a booking through our website, mobile app, or by calling our customer service team. Simply select your pickup location, destination, date, time, and vehicle preference. We\'ll confirm your booking within 24 hours.'
        },
        {
          question: 'How far in advance should I book?',
          answer: 'We recommend booking at least 24-48 hours in advance for standard services. For special events, peak seasons, or large groups, booking 1-2 weeks ahead ensures better availability and pricing options.'
        },
        {
          question: 'Can I modify my booking?',
          answer: 'Yes, you can modify your booking up to 24 hours before your scheduled pickup time. Changes include date, time, pickup location, and vehicle type. Contact our support team or use the "Manage Booking" section in your account.'
        },
        {
          question: 'What if I need to cancel my booking?',
          answer: 'Free cancellation is available up to 24 hours before your scheduled pickup. Cancellations within 24 hours may incur a 50% charge. Same-day cancellations are subject to full payment. Emergency situations are handled case-by-case.'
        }
      ]
    },
    {
      title: 'Payment & Pricing',
      icon: <Payment />,
      color: '#4caf50',
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), bank transfers, and digital wallets. Corporate clients can also arrange monthly billing. All payments are processed securely through encrypted channels.'
        },
        {
          question: 'When will I be charged?',
          answer: 'Payment is typically charged at the time of booking confirmation. For long-term rentals, we may require a deposit upfront with the balance due before service delivery. Corporate accounts may have different billing arrangements.'
        },
        {
          question: 'Are there any hidden fees?',
          answer: 'No, we believe in transparent pricing. All fees are clearly displayed during the booking process. Additional charges may apply for extra services like waiting time, tolls, or special requests, but these are always communicated upfront.'
        },
        {
          question: 'Do you offer corporate discounts?',
          answer: 'Yes, we offer special rates for corporate clients with regular bookings. Contact our corporate team to discuss volume discounts and customized service packages for your business needs.'
        }
      ]
    },
    {
      title: 'Event Logistics',
      icon: <Event />,
      color: '#f57c00',
      questions: [
        {
          question: 'What is included in event logistics services?',
          answer: 'Our event logistics services include transportation planning, vehicle coordination, driver management, route optimization, timeline management, and on-site support. We handle everything from small meetings to large-scale events.'
        },
        {
          question: 'Do you provide event planning services?',
          answer: 'While we specialize in transportation and logistics, we work closely with event planners and can coordinate with other vendors. Our team can provide recommendations and connections to trusted event planning partners.'
        },
        {
          question: 'Can you handle international guests?',
          answer: 'Yes, we provide services for international guests including airport transfers, city tours, and event transportation. Our drivers are professional and can assist with language barriers and cultural considerations.'
        },
        {
          question: 'What if my event has special requirements?',
          answer: 'We accommodate special requirements including accessibility needs, luxury vehicle preferences, specific timing, and custom routes. Please discuss your needs during the booking process so we can make appropriate arrangements.'
        }
      ]
    },
    {
      title: 'Safety & Security',
      icon: <Security />,
      color: '#9c27b0',
      questions: [
        {
          question: 'Are your drivers licensed and insured?',
          answer: 'Yes, all our drivers are professionally licensed, fully insured, and undergo regular background checks. They are trained in defensive driving, customer service, and emergency procedures to ensure your safety.'
        },
        {
          question: 'What safety measures do you have in place?',
          answer: 'We maintain comprehensive safety protocols including regular vehicle inspections, GPS tracking, emergency communication systems, and 24/7 monitoring. All vehicles are equipped with safety features and maintained to the highest standards.'
        },
        {
          question: 'Do you have insurance coverage?',
          answer: 'Yes, we carry comprehensive commercial insurance coverage for all our vehicles and services. This includes liability coverage, vehicle damage protection, and passenger insurance to ensure complete protection.'
        },
        {
          question: 'What happens in case of an emergency?',
          answer: 'In case of emergency, our drivers are trained to handle various situations and can contact our 24/7 support team immediately. We have established protocols for medical emergencies, vehicle breakdowns, and other urgent situations.'
        }
      ]
    }
  ];

  const popularQuestions = [
    'How much does it cost to book a vehicle?',
    'Can I book a vehicle for the same day?',
    'What types of vehicles do you have?',
    'Do you provide airport transfers?',
    'Can I book multiple vehicles for an event?',
    'What is your cancellation policy?',
    'Do you offer chauffeur services?',
    'How do I track my vehicle?'
  ];

  const handleCategoryChange = (category: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedCategory(isExpanded ? category : false);
  };

  const filteredCategories = faqCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.questions.some(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          pt: 8,
          minHeight: '50vh',
          background: 'linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)',
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
                Frequently Asked Questions
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
                Find quick answers to the most common questions about our services
              </Typography>
            </SlideUpInView>
            
            {/* Search Bar */}
            <SlideUpInView initialY={40} duration={1.0} delay={0.4}>
              <TextField
                fullWidth
                placeholder="Search FAQ..."
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

      {/* Popular Questions Section */}
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
              Popular Questions
            </Typography>
          </SlideUpInView>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {popularQuestions.map((question, index) => (
              <ScaleInView key={index} initialScale={0.8} duration={0.6} delay={index * 0.1}>
                <Chip
                  label={question}
                  onClick={() => setSearchQuery(question)}
                  sx={{
                    backgroundColor: '#9c27b0',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#7b1fa2',
                    }
                  }}
                />
              </ScaleInView>
            ))}
          </Box>
        </Container>
      </Box>

      {/* FAQ Categories Section */}
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

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {filteredCategories.map((category, categoryIndex) => (
              <ScaleInView key={categoryIndex} initialScale={0.9} duration={0.8} delay={categoryIndex * 0.1}>
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
                      {category.questions.map((faq, faqIndex) => (
                        <Box key={faqIndex}>
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
                              {faq.question}
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>
                              {faq.answer}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                </Card>
              </ScaleInView>
            ))}
          </Box>

          {filteredCategories.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5" sx={{ mb: 2, color: '#666' }}>
                No questions found for "{searchQuery}"
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: '#999' }}>
                Try searching with different keywords or browse our categories above.
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => setSearchQuery('')}
                sx={{ 
                  backgroundColor: '#9c27b0',
                  '&:hover': { backgroundColor: '#7b1fa2' }
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
                Still Have Questions?
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
              <Typography variant="body1" sx={{ mb: 4, color: '#666', maxWidth: '600px', mx: 'auto' }}>
                If you couldn't find the answer you're looking for, our support team is ready to help you with any questions or concerns.
              </Typography>
            </SlideUpInView>
            
            <Grid container spacing={4} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <ScaleInView initialScale={0.9} duration={0.8} delay={0.4}>
                  <Card sx={{ p: 3, textAlign: 'center' }}>
                    <Phone sx={{ color: '#52A4C1', fontSize: '3rem', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Call Us
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666' }}>
                      +966 59 427 9012
                    </Typography>
                  </Card>
                </ScaleInView>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <ScaleInView initialScale={0.9} duration={0.8} delay={0.6}>
                  <Card sx={{ p: 3, textAlign: 'center' }}>
                    <Email sx={{ color: '#52A4C1', fontSize: '3rem', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Email Us
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666' }}>
                      Reservations@eventforce.sa.com
                    </Typography>
                  </Card>
                </ScaleInView>
              </Grid>
            </Grid>

            <SlideUpInView initialY={40} duration={1.0} delay={0.8}>
              <Button 
                variant="contained" 
                size="large"
                href="/support"
                sx={{ 
                  backgroundColor: '#9c27b0',
                  px: 4,
                  py: 1.5,
                  '&:hover': { backgroundColor: '#7b1fa2' }
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

export default FAQPageClient;
