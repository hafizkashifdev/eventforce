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
  Chip,
  Alert,
  Divider
} from '@mui/material';
import { 
  PrivacyTip, 
  Security, 
  DataUsage, 
  Cookie, 
  Shield, 
  Visibility,
  Delete,
  Settings
} from '@mui/icons-material';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScaleInView, SlideUpInView } from '@/components/animations';

export const metadata = {
  title: 'Privacy Policy - Event Force | Data Protection & Privacy Rights',
  description: 'Learn how Event Force protects your personal information and privacy. Read our comprehensive privacy policy for data collection, usage, and protection practices.',
  keywords: ['privacy policy', 'data protection', 'privacy rights', 'Event Force', 'personal information', 'GDPR', 'data security'],
};

const PrivacyPolicyPage = () => {
  const lastUpdated = 'December 2024';

  const dataTypes = [
    'Personal identification information (name, email, phone number)',
    'Payment information (credit card details, billing address)',
    'Location data (pickup and destination addresses)',
    'Booking history and preferences',
    'Communication records (emails, calls, messages)',
    'Device information (IP address, browser type, operating system)',
    'Usage data (website interactions, app usage patterns)'
  ];

  const dataUsage = [
    'Process and fulfill your transportation bookings',
    'Provide customer support and respond to inquiries',
    'Send booking confirmations and updates',
    'Process payments and prevent fraud',
    'Improve our services and user experience',
    'Send marketing communications (with your consent)',
    'Comply with legal obligations and regulations',
    'Ensure safety and security of our services'
  ];

  const dataProtection = [
    'Encryption of sensitive data in transit and at rest',
    'Regular security audits and vulnerability assessments',
    'Access controls and authentication measures',
    'Secure data centers with physical security measures',
    'Employee training on data protection practices',
    'Incident response procedures for data breaches',
    'Regular backup and recovery procedures',
    'Compliance with international data protection standards'
  ];

  const userRights = [
    {
      title: 'Right to Access',
      description: 'You can request a copy of all personal data we hold about you.',
      icon: <Visibility />
    },
    {
      title: 'Right to Rectification',
      description: 'You can request correction of inaccurate or incomplete personal data.',
      icon: <Settings />
    },
    {
      title: 'Right to Erasure',
      description: 'You can request deletion of your personal data under certain circumstances.',
      icon: <Delete />
    },
    {
      title: 'Right to Data Portability',
      description: 'You can request your data in a structured, machine-readable format.',
      icon: <DataUsage />
    }
  ];

  const cookieTypes = [
    {
      type: 'Essential Cookies',
      purpose: 'Required for basic website functionality and security',
      examples: 'Authentication, session management, security features'
    },
    {
      type: 'Analytics Cookies',
      purpose: 'Help us understand how visitors interact with our website',
      examples: 'Google Analytics, user behavior tracking, performance metrics'
    },
    {
      type: 'Marketing Cookies',
      purpose: 'Used to deliver relevant advertisements and marketing content',
      examples: 'Social media pixels, advertising networks, remarketing'
    },
    {
      type: 'Preference Cookies',
      purpose: 'Remember your choices and preferences for a better experience',
      examples: 'Language settings, theme preferences, location settings'
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
          background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
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
                  mb: 2,
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }
                }}
              >
                Your privacy is important to us. Learn how we protect your personal information.
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={1.0} delay={0.4}>
              <Chip 
                label={`Last updated: ${lastUpdated}`}
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
            </SlideUpInView>
          </Box>
        </Container>
      </Box>

      {/* Introduction Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <ScaleInView initialScale={0.9} duration={0.8}>
            <Alert severity="info" sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Important Notice
              </Typography>
              <Typography variant="body1">
                This Privacy Policy explains how Event Force collects, uses, and protects your personal information 
                when you use our transportation and event logistics services. By using our services, you agree to 
                the collection and use of information in accordance with this policy.
              </Typography>
            </Alert>
          </ScaleInView>

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
              Information We Collect
            </Typography>
          </SlideUpInView>

          <ScaleInView initialScale={0.9} duration={0.8}>
            <Card sx={{ mb: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <DataUsage sx={{ color: '#4caf50', mr: 2, fontSize: '2rem' }} />
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                    Personal Information
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                  We collect various types of personal information to provide and improve our services:
                </Typography>
                <List>
                  {dataTypes.map((type, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                      <ListItemText 
                        primary={type}
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
        </Container>
      </Box>

      {/* How We Use Information */}
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
              How We Use Your Information
            </Typography>
          </SlideUpInView>

          <ScaleInView initialScale={0.9} duration={0.8}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Settings sx={{ color: '#1976d2', mr: 2, fontSize: '2rem' }} />
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    Data Usage Purposes
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                  We use your personal information for the following purposes:
                </Typography>
                <List>
                  {dataUsage.map((usage, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                      <ListItemText 
                        primary={usage}
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
        </Container>
      </Box>

      {/* Data Protection */}
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
              Data Protection & Security
            </Typography>
          </SlideUpInView>

          <ScaleInView initialScale={0.9} duration={0.8}>
            <Card sx={{ mb: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Shield sx={{ color: '#f57c00', mr: 2, fontSize: '2rem' }} />
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f57c00' }}>
                    Security Measures
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                  We implement comprehensive security measures to protect your personal information:
                </Typography>
                <List>
                  {dataProtection.map((measure, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                      <ListItemText 
                        primary={measure}
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
        </Container>
      </Box>

      {/* User Rights */}
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
              Your Privacy Rights
            </Typography>
          </SlideUpInView>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {userRights.map((right, index) => (
              <ScaleInView key={index} initialScale={0.9} duration={0.8} delay={index * 0.1}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Box sx={{ color: '#52A4C1', mb: 2 }}>
                      {right.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                      {right.title}
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                      {right.description}
                    </Typography>
                  </CardContent>
                </Card>
              </ScaleInView>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Cookie Policy */}
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
              Cookie Policy
            </Typography>
          </SlideUpInView>

          <ScaleInView initialScale={0.9} duration={0.8}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Cookie sx={{ color: '#9c27b0', mr: 2, fontSize: '2rem' }} />
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#9c27b0' }}>
                    Types of Cookies We Use
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                  We use cookies and similar technologies to enhance your experience on our website:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {cookieTypes.map((cookie, index) => (
                    <Box key={index}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#333' }}>
                        {cookie.type}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
                        <strong>Purpose:</strong> {cookie.purpose}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        <strong>Examples:</strong> {cookie.examples}
                      </Typography>
                      {index < cookieTypes.length - 1 && <Divider sx={{ mt: 2 }} />}
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </ScaleInView>
        </Container>
      </Box>

      {/* Contact Information */}
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
                Questions About Privacy?
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
              <Typography variant="body1" sx={{ mb: 4, color: '#666', maxWidth: '600px', mx: 'auto' }}>
                If you have any questions about this Privacy Policy or how we handle your personal information, 
                please contact our privacy team.
              </Typography>
            </SlideUpInView>
            <SlideUpInView initialY={40} duration={1.0} delay={0.4}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
                <Typography variant="body1" sx={{ color: '#333', fontWeight: 'bold' }}>
                  Email: privacy@eventforce.sa.com
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

export default PrivacyPolicyPage;
