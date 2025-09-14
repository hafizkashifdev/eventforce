'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  alpha,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { LogoEventForce } from '@/assets/images';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Our Fleet', href: '/our-fleet' },
    { name: 'Manage Booking', href: '/manage-booking' },
    { name: 'Contact Us', href: '/contact-us' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: '100%', height: '100%', backgroundColor: '#000000' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src={LogoEventForce}
            alt="Event Force Logo"
            width={140}
            height={42}
            style={{
              objectFit: 'contain',
            }}
          />
        </Box>
        <IconButton 
          onClick={handleDrawerToggle} 
          sx={{ 
            color: '#52A4C1',
            backgroundColor: 'rgba(82, 164, 193, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(82, 164, 193, 0.2)',
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ p: 3 }}>
        <List sx={{ gap: 1 }}>
          {navigation.map((item) => (
            <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                selected={pathname === item.href}
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: 2,
                  py: 2,
                  px: 3,
                  '&.Mui-selected': {
                    backgroundColor: '#52A4C1',
                    '& .MuiListItemText-primary': {
                      color: '#FFFFFF',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 'bold',
                      fontSize: '18px',
                    },
                    '&:hover': {
                      backgroundColor: '#4A8FA8',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(82, 164, 193, 0.1)',
                  },
                  '& .MuiListItemText-primary': {
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 600,
                    fontSize: '18px',
                    color: '#FFFFFF',
                  },
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button
            component={Link}
            href="/signup"
            variant="contained"
            fullWidth
            onClick={handleDrawerToggle}
            sx={{
              backgroundColor: '#52A4C1',
              borderRadius: '12px',
              height: '56px',
              py: '12px',
              px: '24px',
              fontSize: '18px',
              fontWeight: 'bold',
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(82, 164, 193, 0.3)',
              '&:hover': {
                backgroundColor: '#4A8FA8',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(82, 164, 193, 0.4)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: isScrolled ? '#000000' : 'transparent',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          boxShadow: isScrolled ? 4 : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <Box sx={{ px: 1.5 }}>
          <Toolbar sx={{ justifyContent: 'space-between', py: 1, maxWidth: { xs: '100%', xl: '1200px' }, mx: 'auto' }}>
            {/* Logo */}
            <Box
              component={Link}
              href="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
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
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 2 }}>
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  href={item.href}
                  sx={{
                    color: 'white',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: pathname === item.href ? 'bold' : 600,
                    fontSize: '16px',
                    borderBottom: pathname === item.href ? '2px solid #52A4C1' : 'none',
                    borderRadius: 0,
                    textTransform: 'none',
                    '&:hover': {
                      color: '#52A4C1',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>

            {/* Sign Up Button */}
            <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
              <Button
                component={Link}
                href="/signup"
                variant="contained"
                sx={{
                  backgroundColor: '#52A4C1',
                  borderRadius: '8px',
                  width: '120px',
                  height: '48px',
                  px: '24px',
                  py: '10px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#4A8FA8',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                Sign Up
              </Button>
            </Box>

            {/* Mobile menu button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { lg: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Box>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="top"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        disableScrollLock
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '100%',
            height: '100vh',
            backgroundColor: '#000000',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
