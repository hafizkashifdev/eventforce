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
import { Home, PrivacyTip } from '@mui/icons-material';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScaleInView, SlideUpInView } from '@/components/animations';

const PrivacyPage = () => {
  const sections = [
    {
      title: '1. Information We Collect',
      content: 'We collect information you provide directly to us, such as when you create an account, make a booking, or contact us for support. This includes:\n\n• Personal information (name, email, phone number)\n• Booking details (pickup/destination, dates, vehicle preferences)\n• Payment information (processed securely through encrypted channels)\n• Communication records (emails, calls, support tickets)\n• Usage data (website interactions, app usage, preferences)'
    },
    {
      title: '2. How We Use Your Information',
      content: 'We use the information we collect to:\n\n• Provide and improve our transportation services\n• Process bookings and payments\n• Communicate with you about your bookings\n• Send service updates and promotional offers (with your consent)\n• Provide customer support\n• Ensure safety and security\n• Comply with legal obligations\n• Analyze usage patterns to improve our services'
    },
    {
      title: '3. Information Sharing',
      content: 'We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:\n\n• With service providers who assist us in operating our business (payment processors, SMS providers)\n• With drivers and staff who need access to provide services\n• When required by law or to protect our rights\n• In case of business transfers or mergers\n• With your explicit consent'
    },
    {
      title: '4. Data Security',
      content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:\n\n• Encryption of sensitive data in transit and at rest\n• Regular security assessments and updates\n• Access controls and authentication measures\n• Secure payment processing\n• Staff training on data protection practices'
    },
    {
      title: '5. Data Retention',
      content: 'We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Generally:\n\n• Booking information: 7 years for accounting and legal purposes\n• Customer support records: 3 years\n• Marketing data: Until you opt out or 2 years of inactivity\n• Legal compliance data: As required by applicable laws'
    },
    {
      title: '6. Your Rights',
      content: 'You have the following rights regarding your personal information:\n\n• Access: Request a copy of your personal data\n• Rectification: Correct inaccurate or incomplete information\n• Erasure: Request deletion of your personal data\n• Portability: Receive your data in a structured format\n• Objection: Opt out of certain data processing activities\n• Restriction: Limit how we process your data\n• Withdraw consent: Revoke consent for marketing communications'
    },
    {
      title: '7. Cookies and Tracking',
      content: 'We use cookies and similar technologies to:\n\n• Remember your preferences and settings\n• Analyze website traffic and usage patterns\n• Provide personalized content and advertisements\n• Ensure website functionality and security\n\nYou can control cookie settings through your browser, but disabling cookies may affect website functionality.'
    },
    {
      title: '8. Third-Party Services',
      content: 'Our services may integrate with third-party services for:\n\n• Payment processing (stripe, PayPal)\n• SMS notifications (Twilio)\n• Analytics (Google Analytics)\n• Maps and navigation (Google Maps)\n\nThese services have their own privacy policies, and we encourage you to review them.'
    },
    {
      title: '9. International Transfers',
      content: 'Your personal information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data during such transfers, including:\n\n• Standard contractual clauses\n• Adequacy decisions by relevant authorities\n• Binding corporate rules\n• Your explicit consent where required'
    },
    {
      title: '10. Children\'s Privacy',
      content: 'Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.'
    },
    {
      title: '11. Changes to This Policy',
      content: 'We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by:\n\n• Posting the updated policy on our website\n• Sending email notifications to registered users\n• Displaying prominent notices on our services\n\nContinued use of our services after changes constitutes acceptance of the updated policy.'
    },
    {
      title: '12. Contact Us',
      content: 'If you have any questions about this Privacy Policy or our data practices, please contact us:\n\n• Email: privacy@eventforce.sa.com\n• Phone: +966 59 427 9012\n• Address: Riyadh, Saudi Arabia\n• Data Protection Officer: dpo@eventforce.sa.com\n\nWe will respond to your inquiry within 30 days.'
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
            <Typography color="text.primary">Privacy Policy</Typography>
          </Breadcrumbs>
        </Container>
      </Box>
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          minHeight: '40vh',
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
                Privacy Policy
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
                Learn how we protect and handle your personal information
              </Typography>
            </SlideUpInView>
          </Box>
        </Container>
      </Box>

      {/* Privacy Content */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Card sx={{ p: 4 }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                Last updated: December 2024
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>
                This Privacy Policy explains how Event Force collects, uses, and protects your personal information 
                when you use our transportation and event logistics services. We are committed to protecting your 
                privacy and ensuring the security of your personal data.
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
                Questions About Your Privacy?
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
              <Typography variant="body1" sx={{ mb: 4, color: '#666', maxWidth: '600px', mx: 'auto' }}>
                If you have any questions about this Privacy Policy or how we handle your personal information, 
                please contact our privacy team.
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={1.0} delay={0.4}>
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

export default PrivacyPage;
