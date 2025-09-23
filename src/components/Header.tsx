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
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Close as CloseIcon, 
  AccountCircle,
  Logout,
  Person,
} from '@mui/icons-material';
import { LogoEventForce } from '@/assets/images';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

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
    { name: 'Contact Us', href: '/contact-us' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      handleMenuClose();
    } catch (error) {
      console.error('Logout failed:', error);
    }
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
          {isAuthenticated ? (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, backgroundColor: 'rgba(82, 164, 193, 0.1)', borderRadius: 2 }}>
                <Avatar sx={{ bgcolor: '#52A4C1', mr: 2 }}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : <Person />}
                </Avatar>
                <Box>
                  <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {user?.name || 'User'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    {user?.email}
                  </Typography>
                </Box>
              </Box>
              <Button
                onClick={handleLogout}
                variant="contained"
                fullWidth
                startIcon={<Logout />}
                sx={{
                  backgroundColor: '#ff4444',
                  borderRadius: '12px',
                  height: '56px',
                  py: '12px',
                  px: '24px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#ff3333',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Logout
              </Button>
            </Box>
          ) : (
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
          )}
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
            <Box 
              component="nav" 
              aria-label="Main navigation"
              sx={{ display: { xs: 'none', lg: 'flex' }, gap: 2 }}
            >
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
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

            {/* User Menu or Sign Up Button */}
            <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
              {isAuthenticated ? (
                <Box>
                  <IconButton
                    onClick={handleMenuOpen}
                    sx={{
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(82, 164, 193, 0.1)',
                      },
                    }}
                  >
                    <Avatar sx={{ bgcolor: '#52A4C1', width: 32, height: 32 }}>
                      {user?.name ? user.name.charAt(0).toUpperCase() : <AccountCircle />}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    sx={{
                      '& .MuiPaper-root': {
                        backgroundColor: '#1a1a1a',
                        color: 'white',
                        minWidth: 200,
                        mt: 1,
                      },
                    }}
                  >
                    <MenuItem onClick={handleMenuClose} sx={{ py: 2 }}>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {user?.name || 'User'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          {user?.email}
                        </Typography>
                      </Box>
                    </MenuItem>
                    <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
                    <MenuItem onClick={handleLogout} sx={{ color: '#ff4444' }}>
                      <Logout sx={{ mr: 1 }} />
                      Logout
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
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
              )}
            </Box>

            {/* Mobile menu button */}
            <IconButton
              color="inherit"
              aria-label="open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
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
        id="mobile-navigation"
        aria-label="Mobile navigation menu"
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
