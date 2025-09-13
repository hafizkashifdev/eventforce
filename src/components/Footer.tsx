'use client';

import React from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Container,
  Grid,
  Link as MuiLink,
  useMediaQuery,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
  WhatsApp,
} from '@mui/icons-material';

const Footer = () => {
  const isMobile = useMediaQuery('(max-width:900px)');
  const currentYear = 2024; // Static year to prevent hydration mismatch

  const footerLinks = {
    navigation: [
      { name: 'About us', href: '/about-us' },
      { name: 'Our Fleet', href: '/our-fleet' },
      { name: 'Booking', href: '/manage-booking' },
      { name: 'Contact Us', href: '/contact-us' },
    ],
    services: [
      { name: 'Luxury Transportation', href: '#' },
      { name: 'Event Logistics', href: '#' },
      { name: 'Corporate Events', href: '#' },
      { name: 'Wedding Services', href: '#' },
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'FAQ', href: '#' },
    ]
  };

  const socialIcons = [
    { icon: <Facebook />, href: '#' },
    { icon: <Twitter />, href: '#' },
    { icon: <Instagram />, href: '#' },
    { icon: <LinkedIn />, href: '#' },
    { icon: <YouTube />, href: '#' },
    { icon: <WhatsApp />, href: '#' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'grey.900',
        color: 'white',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Logo and Description */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  background: 'linear-gradient(45deg, #1976d2, #1565c0)',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                  EF
                </Typography>
              </Box>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                Event Force
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: 'grey.400',
                lineHeight: 1.6,
                mb: 3,
              }}
            >
              Premium transportation and event logistics solutions across Saudi Arabia. 
              Making every occasion memorable with our luxury fleet and professional service.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {socialIcons.map((social, index) => (
                <MuiLink
                  key={index}
                  href={social.href}
                  sx={{
                    color: 'grey.400',
                    '&:hover': {
                      color: 'white',
                    },
                    transition: 'color 0.3s',
                  }}
                >
                  {social.icon}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* Navigation Links */}
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Navigation
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {footerLinks.navigation.map((link) => (
                <MuiLink
                  key={link.name}
                  component={Link}
                  href={link.href}
                  sx={{
                    color: 'grey.400',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'white',
                    },
                    transition: 'color 0.3s',
                  }}
                >
                  {link.name}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* Services */}
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Services
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {footerLinks.services.map((link) => (
                <MuiLink
                  key={link.name}
                  href={link.href}
                  sx={{
                    color: 'grey.400',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'white',
                    },
                    transition: 'color 0.3s',
                  }}
                >
                  {link.name}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* Support */}
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {footerLinks.support.map((link) => (
                <MuiLink
                  key={link.name}
                  href={link.href}
                  sx={{
                    color: 'grey.400',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'white',
                    },
                    transition: 'color 0.3s',
                  }}
                >
                  {link.name}
                </MuiLink>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: 'grey.800',
            mt: 6,
            pt: 4,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              gap: 3,
              color: 'grey.400',
              fontSize: '0.875rem',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2">+966 59 427 9012</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2">Reservations@eventforce.sa.com</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2">Saudi Arabia</Typography>
            </Box>
          </Box>
          <Typography variant="body2" sx={{ color: 'grey.400' }}>
            © {currentYear} Event Force. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;