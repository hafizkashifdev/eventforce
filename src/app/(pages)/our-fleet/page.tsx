import React from 'react'
import { Box, Typography, Container } from '@mui/material'
import Image from 'next/image'
import Header from '@/components/Header'
import FleetPage from '@/components/FleetPage'
import Footer from '@/components/Footer'
import { FleetBg } from '@/assets/images'
import { SlideUpInView } from '@/components/animations'

const OurFleetPage = () => {
    return (
        <>
            <Header />
            
            {/* Hero Section with Fleet Background */}
            <Box 
                sx={{ 
                    pt: 8,
                    minHeight: '60vh',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                    // Fallback background
                    backgroundImage: `url(${FleetBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {/* Background Image */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 0
                    }}
                >
                    <Image
                        src={FleetBg}
                        alt="Fleet Background"
                        fill
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center'
                        }}
                        priority
                    />
                </Box>
                
                {/* Overlay for better text readability */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
                        zIndex: 1
                    }}
                />
                
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <SlideUpInView initialY={60} duration={0.8}>
                            <Typography 
                                variant="h2" 
                                component="h1" 
                                sx={{ 
                                    fontWeight: 'bold', 
                                    mb: 4,
                                    color: 'white',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                                }}
                            >
                                Our Fleet
                            </Typography>
                        </SlideUpInView>
                        <SlideUpInView initialY={40} duration={0.9} delay={0.2}>
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                    color: 'rgba(255,255,255,0.9)', 
                                    lineHeight: 1.6,
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                    fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                                    maxWidth: '800px',
                                    mx: 'auto'
                                }}
                            >
                                Browse our extensive fleet of modern, reliable vehicles for every need. 
                                Choose from Economy, SUVs, luxury cars, and buses available for daily or monthly rental.
                            </Typography>
                        </SlideUpInView>
                    </Box>
                </Container>
            </Box>
            
            <FleetPage />
            <Footer />
        </>
    )
}

export default OurFleetPage