'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Typography,
  Grid,
  Link as MuiLink,
} from '@mui/material';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
  WhatsApp,
} from '@mui/icons-material';
import { LogoEventForce } from '@/assets/images';
import { ScaleInView, SlideSidewayInView, SlideUpInView } from '@/components/animations';

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
      { name: 'Help Center', href: '/support/help-center' },
      { name: 'FAQ', href: '/support/faq' },
      { name: 'Terms of Service', href: '/support/terms' },
      { name: 'Privacy Policy', href: '/support/privacy' },
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
        backgroundColor: '#000000',
        color: 'white',
        py: 8,
      }}
    >
      <Box sx={{ px: 1.5, maxWidth: { xs: '100%', xl: '1200px' }, mx: 'auto' }}>
        <Grid container spacing={6}>
          {/* Logo and Description */}
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <SlideUpInView initialY={40} duration={0.7}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Image
                  src={LogoEventForce}
                  alt="Event Force Logo"
                  width={168}
                  height={51}
                  style={{
                    objectFit: 'contain',
                  }}
                />
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
            </SlideUpInView>
          </Grid>

          {/* Navigation Links */}
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <SlideSidewayInView initialX={-30} duration={0.8} delay={0.2}>
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
            </SlideSidewayInView>
          </Grid>

          {/* Services */}
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <SlideSidewayInView initialX={-30} duration={0.8} delay={0.4}>
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
            </SlideSidewayInView>
          </Grid>

          {/* Support */}
          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <SlideSidewayInView initialX={-30} duration={0.8} delay={0.6}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                Support
              </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {footerLinks.support.map((link) => (
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
            </SlideSidewayInView>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <SlideUpInView initialY={30} duration={0.7} delay={0.8}>
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
              <MuiLink
                href="https://wa.me/966594279012"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'grey.400',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#25D366',
                  },
                  transition: 'color 0.3s',
                }}
              >
                <Typography variant="body2">+966 59 427 9012</Typography>
              </MuiLink>
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
        </SlideUpInView>
      </Box>
    </Box>
  );
};

export default Footer;