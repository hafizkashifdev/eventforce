'use client';

import React, { useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Fade,
  Slide,
} from '@mui/material';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ScaleInView, SlideSidewayInView, SlideUpInView } from '@/components/animations';

const MissionVision = () => {
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const [missionVisible, setMissionVisible] = React.useState(false);
  const [visionVisible, setVisionVisible] = React.useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === missionRef.current) {
              setMissionVisible(true);
            } else if (entry.target === visionRef.current) {
              setVisionVisible(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (missionRef.current) observer.observe(missionRef.current);
    if (visionRef.current) observer.observe(visionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Box sx={{ mt: 6, px:2, }}>
      {/* <Container maxWidth="lg"> */}
        {/* Mission Section */}
        <Fade in={missionVisible} timeout={700}>
          <Box ref={missionRef} sx={{ mb: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
              <SlideSidewayInView initialX={-30} duration={0.8}>
                <Box
                  sx={{
                    width: 23,
                    height: 92,
                    backgroundColor: '#52A4C1',
                    borderRadius: '3px',
                    flexShrink: 0,
                  }}
                />
              </SlideSidewayInView>
              <Box sx={{ flex: 1 }}>
                <SlideUpInView initialY={40} duration={0.8} delay={0.2}>
                  <Typography
                    variant={isMobile ? 'h4' : 'h3'}
                    component="h2"
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 'bold',
                      color: 'text.primary',
                      mb: 3,
                      fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                    }}
                  >
                    Our Mission
                  </Typography>
                </SlideUpInView>
                <SlideUpInView initialY={30} duration={0.9} delay={0.4}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      color: 'text.secondary',
                      lineHeight: 1.7,
                      fontWeight: 400,
                      fontSize: '16px',
                    }}
                  >
                    To deliver seamless, high-quality transportation and logistical solutions that elevate events and experiences across Saudi Arabia, with a focus on professionalism, precision, and customer satisfaction.
                  </Typography>
                </SlideUpInView>
              </Box>
            </Box>
          </Box>
        </Fade>

        {/* Vision Section */}
        <Fade in={visionVisible} timeout={700}>
          <Box ref={visionRef} sx={{ mb: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
              <SlideSidewayInView initialX={-30} duration={0.8} delay={0.2}>
                <Box
                  sx={{
                    width: 23,
                    height: 92,
                    backgroundColor: '#52A4C1',
                    borderRadius: '3px',
                    flexShrink: 0,
                  }}
                />
              </SlideSidewayInView>
              <Box sx={{ flex: 1 }}>
                <SlideUpInView initialY={40} duration={0.8} delay={0.4}>
                  <Typography
                    variant={isMobile ? 'h4' : 'h3'}
                    component="h2"
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 'bold',
                      color: 'text.primary',
                      mb: 3,
                      fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                    }}
                  >
                    Our Vision
                  </Typography>
                </SlideUpInView>
                <SlideUpInView initialY={30} duration={0.9} delay={0.6}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      color: 'text.secondary',
                      lineHeight: 1.7,
                      fontWeight: 400,
                      fontSize: '16px',
                    }}
                  >
                    To become the leading name in event logistics and VIP transportation in the Kingdom, known for our reliability, excellence in service, and commitment to supporting Saudi Arabia's growing entertainment and hospitality sectors.
                  </Typography>
                </SlideUpInView>
              </Box>
            </Box>
          </Box>
        </Fade>
      {/* </Container> */}
    </Box>
  );
};

export default MissionVision;
